import express from 'express';
import { execute } from './services/sql.js';
import {
  authenticateUser,
  changeUserPassword,
  createOrGetGuestUser,
  findUserById,
  registerUser,
  updateUserAccessStatus,
} from './services/users-service.js';
import {
  cancelMembership,
  changeMembershipPlan,
  createMembership,
  createMembershipCheckout,
  getUserMembership,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
  listPlans,
  previewMembershipPlanChange,
  syncMembershipCheckoutSession,
} from './services/memberships-service.js';
import {
  cancelPendingBooking,
  cancelGuestMeetingRoomBookingPayment,
  createBooking,
  confirmGuestMeetingRoomBookingPayment,
  confirmBookingPayment,
  initiateBookingCheckout,
  initiateGuestMeetingRoomBookingPayment,
  initiateBookingPayment,
  listAvailableResources,
  listUserBookings,
  syncBookingCheckoutSession,
  updateBooking,
} from './services/bookings-service.js';
import { listUserInvoices } from './services/invoices-service.js';
import { constructStripeWebhookEvent, getStripePublishableKey } from './services/stripe-service.js';

function parseUserId(value) {
  const parsed = Number.parseInt(String(value || ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatCurrencyAmount(amountMinor, currency = 'gbp') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format((Number(amountMinor || 0)) / 100);
}

function toDashboardStats(bookings, membership) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.startAt);
    return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
  });

  const meetingRoomBookings = bookings.filter((booking) => booking.resourceType === 'meeting_room' && booking.status === 'confirmed');

  return {
    daysCheckedIn: monthlyBookings.length,
    meetingRoomBookings: meetingRoomBookings.length,
    currentMembership: membership ? formatCurrencyAmount(membership.monthlyPriceMinor, membership.currency) : '£0.00',
  };
}

async function buildDashboardResponse(userId) {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error('User not found.');
  }

  const [membership, plans, bookings, invoices, resources] = await Promise.all([
    getUserMembership(userId),
    listPlans(),
    listUserBookings(userId),
    listUserInvoices(userId),
    listAvailableResources({}),
  ]);

  return {
    user,
    membership,
    plans,
    bookings,
    invoices,
    resources,
    stats: toDashboardStats(bookings, membership),
    stripe: {
      publishableKey: getStripePublishableKey(),
      mode: 'test',
    },
  };
}

async function recordWebhookEvent(event) {
  await execute(
    `INSERT IGNORE INTO stripe_webhook_events
      (stripe_event_id, event_type, payload, processed_at, created_at)
     VALUES
      (:stripeEventId, :eventType, :payload, :processedAt, :createdAt)`,
    {
      stripeEventId: event.id,
      eventType: event.type,
      payload: JSON.stringify(event),
      processedAt: new Date(),
      createdAt: new Date(),
    },
  );
}

async function handleStripeEvent(event) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const userId = Number(event.data.object?.metadata?.app_user_id || 0);
      const bookingId = Number(event.data.object?.metadata?.booking_id || 0);
      if (userId && bookingId) {
        await syncBookingCheckoutSession({
          userId,
          sessionId: event.data.object.id,
        });
      } else if (userId) {
        await syncMembershipCheckoutSession({
          userId,
          sessionId: event.data.object.id,
        });
      }
      return;
    }
    case 'invoice.paid':
      await handleInvoicePaid(event.data.object);
      return;
    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event.data.object);
      return;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      return;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      return;
    default:
      return;
  }
}

export function registerStripeWebhook(app) {
  app.post('/api/stripe/webhooks', express.raw({ type: 'application/json' }), async (request, response) => {
    try {
      const signature = request.headers['stripe-signature'];

      if (!signature || Array.isArray(signature)) {
        response.status(400).json({ error: 'Missing Stripe signature.' });
        return;
      }

      const event = constructStripeWebhookEvent(request.body, signature);
      await recordWebhookEvent(event);
      await handleStripeEvent(event);
      response.json({ ok: true, received: event.type });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });
}

export function registerMemberPortalApi(app) {
  app.post('/api/member-auth/register', async (request, response) => {
    try {
      const user = await registerUser(request.body || {});
      response.status(201).json({ data: user });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-auth/login', async (request, response) => {
    try {
      const user = await authenticateUser(request.body || {});
      response.json({ data: user });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-auth/change-password', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);

      if (!userId) {
        response.status(400).json({ error: 'User ID is required.' });
        return;
      }

      await changeUserPassword({
        userId,
        currentPassword: String(request.body?.currentPassword || ''),
        newPassword: String(request.body?.newPassword || ''),
      });

      response.json({ ok: true });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.get('/api/public/meeting-rooms/resources', async (request, response) => {
    try {
      const resources = await listAvailableResources({
        type: 'meeting_room',
        startAt: String(request.query.startAt || ''),
        endAt: String(request.query.endAt || ''),
      });

      response.json({
        data: {
          resources,
          stripe: {
            publishableKey: getStripePublishableKey(),
            mode: 'test',
          },
        },
      });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/public/meeting-rooms/bookings/payment-intent', async (request, response) => {
    try {
      const guestName = String(request.body?.guestName || '').trim();
      const guestEmail = String(request.body?.guestEmail || '').trim();

      if (!guestName || !guestEmail) {
        response.status(400).json({ error: 'Guest name and email are required.' });
        return;
      }

      const draft = await initiateGuestMeetingRoomBookingPayment({
        guestName,
        guestEmail,
        resourceId: Number(request.body?.resourceId),
        startAt: String(request.body?.startAt || ''),
        endAt: String(request.body?.endAt || ''),
        purpose: String(request.body?.purpose || ''),
        notes: String(request.body?.notes || ''),
      });

      response.status(201).json({ data: draft });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/public/meeting-rooms/bookings/:bookingId/confirm', async (request, response) => {
    try {
      const bookingId = parseUserId(request.params.bookingId);
      const guestEmail = String(request.body?.guestEmail || '').trim();
      const paymentIntentId = String(request.body?.paymentIntentId || '').trim();

      if (!bookingId || !guestEmail || !paymentIntentId) {
        response.status(400).json({ error: 'Booking ID, guest email, and payment intent are required.' });
        return;
      }

      const booking = await confirmGuestMeetingRoomBookingPayment({
        guestEmail,
        bookingId,
        paymentIntentId,
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/public/meeting-rooms/bookings/:bookingId/cancel', async (request, response) => {
    try {
      const bookingId = parseUserId(request.params.bookingId);
      const guestEmail = String(request.body?.guestEmail || '').trim();

      if (!bookingId || !guestEmail) {
        response.status(400).json({ error: 'Booking ID and guest email are required.' });
        return;
      }

      const booking = await cancelGuestMeetingRoomBookingPayment({
        guestEmail,
        bookingId,
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.get('/api/member-portal/dashboard', async (request, response) => {
    try {
      const userId = parseUserId(request.query.userId);

      if (!userId) {
        response.status(400).json({ error: 'User ID is required.' });
        return;
      }

      response.json({ data: await buildDashboardResponse(userId) });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.get('/api/member-portal/resources', async (request, response) => {
    try {
      const resources = await listAvailableResources({
        type: String(request.query.type || ''),
        startAt: String(request.query.startAt || ''),
        endAt: String(request.query.endAt || ''),
      });
      response.json({ data: resources });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/memberships', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);
      const planSlug = String(request.body?.planSlug || '').trim();

      if (!userId || !planSlug) {
        response.status(400).json({ error: 'User ID and plan slug are required.' });
        return;
      }

      const membership = await createMembership({ userId, planSlug });
      response.status(201).json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/memberships/checkout-session', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);
      const planSlug = String(request.body?.planSlug || '').trim();
      const successUrl = String(request.body?.successUrl || '').trim();
      const cancelUrl = String(request.body?.cancelUrl || '').trim();

      if (!userId || !planSlug || !successUrl || !cancelUrl) {
        response.status(400).json({ error: 'User ID, plan slug, success URL, and cancel URL are required.' });
        return;
      }

      const session = await createMembershipCheckout({
        userId,
        planSlug,
        successUrl,
        cancelUrl,
      });

      response.status(201).json({
        data: {
          sessionId: session.id,
          url: session.url,
        },
      });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/memberships/sync-checkout-session', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);
      const sessionId = String(request.body?.sessionId || '').trim();

      if (!userId || !sessionId) {
        response.status(400).json({ error: 'User ID and session ID are required.' });
        return;
      }

      const membership = await syncMembershipCheckoutSession({ userId, sessionId });
      response.json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/memberships/change-plan', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);
      const planSlug = String(request.body?.planSlug || '').trim();

      if (!userId || !planSlug) {
        response.status(400).json({ error: 'User ID and plan slug are required.' });
        return;
      }

      const membership = await changeMembershipPlan({ userId, planSlug });
      response.json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/memberships/change-plan/preview', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);
      const planSlug = String(request.body?.planSlug || '').trim();

      if (!userId || !planSlug) {
        response.status(400).json({ error: 'User ID and plan slug are required.' });
        return;
      }

      const preview = await previewMembershipPlanChange({ userId, planSlug });
      response.json({ data: preview });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/memberships/cancel', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);

      if (!userId) {
        response.status(400).json({ error: 'User ID is required.' });
        return;
      }

      const membership = await cancelMembership({ userId });
      response.json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/bookings', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);

      if (!userId) {
        response.status(400).json({ error: 'User ID is required.' });
        return;
      }

      const booking = await createBooking({
        userId,
        resourceId: Number(request.body?.resourceId),
        bookingType: String(request.body?.bookingType || 'meeting_room'),
        startAt: String(request.body?.startAt || ''),
        endAt: String(request.body?.endAt || ''),
        purpose: String(request.body?.purpose || ''),
        notes: String(request.body?.notes || ''),
      });

      response.status(201).json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/bookings/payment-intent', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);

      if (!userId) {
        response.status(400).json({ error: 'User ID is required.' });
        return;
      }

      const result = await initiateBookingPayment({
        userId,
        resourceId: Number(request.body?.resourceId),
        bookingType: String(request.body?.bookingType || 'meeting_room'),
        startAt: String(request.body?.startAt || ''),
        endAt: String(request.body?.endAt || ''),
        purpose: String(request.body?.purpose || ''),
        notes: String(request.body?.notes || ''),
      });

      response.status(201).json({ data: result });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/bookings/checkout-session', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);
      const successUrl = String(request.body?.successUrl || '').trim();
      const cancelUrl = String(request.body?.cancelUrl || '').trim();

      if (!userId || !successUrl || !cancelUrl) {
        response.status(400).json({ error: 'User ID, success URL, and cancel URL are required.' });
        return;
      }

      const result = await initiateBookingCheckout({
        userId,
        resourceId: Number(request.body?.resourceId),
        bookingType: String(request.body?.bookingType || 'meeting_room'),
        startAt: String(request.body?.startAt || ''),
        endAt: String(request.body?.endAt || ''),
        purpose: String(request.body?.purpose || ''),
        notes: String(request.body?.notes || ''),
        successUrl,
        cancelUrl,
      });

      response.status(201).json({ data: result });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/bookings/sync-checkout-session', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);
      const sessionId = String(request.body?.sessionId || '').trim();

      if (!userId || !sessionId) {
        response.status(400).json({ error: 'User ID and session ID are required.' });
        return;
      }

      const booking = await syncBookingCheckoutSession({ userId, sessionId });
      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/bookings/:bookingId/confirm', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);
      const bookingId = parseUserId(request.params.bookingId);
      const paymentIntentId = String(request.body?.paymentIntentId || '').trim();

      if (!userId || !bookingId) {
        response.status(400).json({ error: 'User ID and booking ID are required.' });
        return;
      }

      const booking = await confirmBookingPayment({
        userId,
        bookingId,
        paymentIntentId,
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.post('/api/member-portal/bookings/:bookingId/cancel', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);
      const bookingId = parseUserId(request.params.bookingId);

      if (!userId || !bookingId) {
        response.status(400).json({ error: 'User ID and booking ID are required.' });
        return;
      }

      const booking = await cancelPendingBooking({
        userId,
        bookingId,
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.put('/api/member-portal/bookings/:bookingId', async (request, response) => {
    try {
      const userId = parseUserId(request.body?.userId);
      const bookingId = parseUserId(request.params.bookingId);

      if (!userId || !bookingId) {
        response.status(400).json({ error: 'User ID and booking ID are required.' });
        return;
      }

      const booking = await updateBooking({
        userId,
        bookingId,
        resourceId: Number(request.body?.resourceId),
        startAt: String(request.body?.startAt || ''),
        endAt: String(request.body?.endAt || ''),
        purpose: String(request.body?.purpose || ''),
        notes: String(request.body?.notes || ''),
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.get('/api/member-portal/invoices', async (request, response) => {
    try {
      const userId = parseUserId(request.query.userId);

      if (!userId) {
        response.status(400).json({ error: 'User ID is required.' });
        return;
      }

      response.json({ data: await listUserInvoices(userId) });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });
}
