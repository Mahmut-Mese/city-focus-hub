import express from 'express';
import { execute, queryOne } from './services/sql.js';
import { config } from './config.js';
import {
  authenticateUser,
  changeUserPassword,
  createOrGetGuestUser,
  createPasswordResetToken,
  findUserById,
  registerUser,
  resetPasswordWithToken,
  updateUserAccessStatus,
  updateUserProfile,
} from './services/users-service.js';
import {
  cancelMembershipAdjustment,
  cancelMembership,
  cancelScheduledDowngrade,
  changeMembershipPlan,
  confirmMembershipPayment,
  confirmMembershipUpgradePayment,
  createMembership,
  createMembershipCheckout,
  createMembershipPaymentDraft,
  getUserMembership,
  handleMembershipAdjustmentCheckoutExpired,
  handleMembershipAdjustmentInvoicePaid,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
  listPlans,
  previewMembershipPlanChange,
  syncMembershipAdjustmentCheckoutSession,
  syncMembershipCheckoutSession,
} from './services/memberships-service.js';
import {
  cancelPendingBooking,
  cancelConfirmedBooking,
  cancelBookingAdjustment,
  cancelGuestMeetingRoomBookingPayment,
  createBooking,
  confirmBookingAdjustmentPayment,
  confirmGuestMeetingRoomBookingPayment,
  confirmBookingPayment,
  handleBookingAdjustmentCheckoutExpired,
  handleBookingAdjustmentInvoicePaid,
  handleBookingCheckoutExpired,
  handleBookingInvoicePaid,
  handleBookingInvoicePaymentFailed,
  handleBookingPaymentIntentFailed,
  handleBookingPaymentIntentSucceeded,
  initiateBookingCheckout,
  initiateGuestMeetingRoomBookingCheckout,
  initiateGuestMeetingRoomBookingPayment,
  initiateBookingPayment,
  listAvailableResources,
  listUserBookings,
  syncBookingAdjustmentCheckoutSession,
  syncBookingCheckoutSession,
  syncGuestMeetingRoomBookingCheckout,
  updateBooking,
} from './services/bookings-service.js';
import { listUserInvoices } from './services/invoices-service.js';
import { handleChargeRefunded, handleStripeRefundUpdated } from './services/refunds-service.js';
import {
  constructStripeWebhookEvent,
  getStripeMode,
  getStripePublishableKey,
  isMockStripePaymentsEnabled,
  isStripeEnabled,
} from './services/stripe-service.js';
import { createRateLimitMiddleware } from './security.js';
import { sendPasswordResetEmail } from './mailer.js';
import { randomUUID } from 'node:crypto';
import {
  validate,
  validateQuery,
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  guestBookingPaymentIntentSchema,
  guestBookingCheckoutSessionSchema,
  guestBookingSyncCheckoutSchema,
  guestBookingConfirmSchema,
  guestBookingCancelSchema,
  createBookingSchema,
  bookingPaymentIntentSchema,
  bookingCheckoutSessionSchema,
  updateBookingSchema,
  planSlugSchema,
  membershipCheckoutSessionSchema,
  changePlanSchema,
  confirmPaymentSchema,
  confirmUpgradePaymentSchema,
  syncSessionSchema,
  confirmBookingAdjustmentPaymentSchema,
  resourceQuerySchema,
  updateProfileSchema,
} from './services/validation.js';

// Returns a positive integer ID or 0 (falsy) for missing/invalid input.
// Used for userId, bookingId, adjustmentId, etc.
// All callers MUST guard: if (!id) { return 400; }
// Never passes 0 to DB queries — service layer uses WHERE id = :id which would match nothing for 0.
function parseEntityId(value) {
  const parsed = Number.parseInt(String(value || ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

// P1-52: Safe numeric parser to prevent NaN propagation from request body fields.
// Returns 0 for undefined, null, empty strings, or non-numeric values instead of NaN.
function safeParseNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

const authRateLimiter = createRateLimitMiddleware({
  keyPrefix: 'member-auth',
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  message: 'Too many authentication requests. Please try again later.',
});

const guestBookingRateLimiter = createRateLimitMiddleware({
  keyPrefix: 'guest-booking',
  windowMs: 10 * 60 * 1000,
  maxRequests: 12,
  message: 'Too many booking attempts. Please try again later.',
});

function buildMemberSessionCookieOptions(includeLifetime = true) {
  const cookieOptions = {
    httpOnly: true,
    sameSite: config.memberSession.sameSite,
    secure: config.publicOrigin.startsWith('https://') || config.memberSession.sameSite === 'none',
    path: '/',
  };

  if (includeLifetime) {
    cookieOptions.maxAge = config.memberSession.cookieMaxAgeMs;
  }

  return cookieOptions;
}

function regenerateSession(request) {
  return new Promise((resolve, reject) => {
    if (!request.session) {
      resolve();
      return;
    }

    request.session.regenerate((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

function destroySession(request) {
  return new Promise((resolve, reject) => {
    if (!request.session) {
      resolve();
      return;
    }

    request.session.destroy((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function establishMemberSession(request, userId) {
  await regenerateSession(request);

  if (!request.session) {
    throw new Error('Member session is unavailable.');
  }

  request.session.memberUserId = Number(userId);
  // P0-3: Generate CSRF token on session creation
  request.session.csrfToken = randomUUID();
}

async function clearMemberSession(request, response) {
  await destroySession(request);
  response.clearCookie(config.memberSession.cookieName, buildMemberSessionCookieOptions(false));
}

// P1-49: Express middleware version of authentication check.
// Populates req.authenticatedUser so route handlers don't need to call the function manually.
// Legacy function version is kept below for backward compatibility with existing handlers.
function memberAuthMiddleware(request, response, next) {
  requireAuthenticatedMember(request, response).then((user) => {
    if (user) {
      request.authenticatedUser = user;
      next();
    }
    // If user is null, requireAuthenticatedMember already sent the 401 response
  }).catch((error) => {
    response.status(500).json({ error: String(error?.message ?? error) });
  });
}

async function requireAuthenticatedMember(request, response) {
  const userId = parseEntityId(request.session?.memberUserId);

  if (!userId) {
    response.status(401).json({ error: 'Authentication required.' });
    return null;
  }

  const user = await findUserById(userId);

  if (!user) {
    await clearMemberSession(request, response);
    response.status(401).json({ error: 'Authentication required.' });
    return null;
  }

  if (user.accessStatus === 'suspended') {
    await clearMemberSession(request, response);
    response.status(401).json({ error: 'Your account is suspended. Please contact support.' });
    return null;
  }

  return user;
}

function validateReturnUrl(value, label) {
  let url;

  try {
    url = new URL(String(value || ''));
  } catch {
    throw new Error(`${label} must be a valid absolute URL.`);
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`${label} must use http or https.`);
  }

  // P2-140: In production, enforce HTTPS-only return URLs
  if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') {
    throw new Error(`${label} must use https in production.`);
  }

  const allowedOrigins = new Set([...config.cors.allowedOrigins, new URL(config.publicOrigin).origin]);

  if (!allowedOrigins.has(url.origin)) {
    throw new Error(`${label} origin is not allowed.`);
  }

  return url.toString();
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
        mode: getStripeMode(),
      },
    };
}

async function recordWebhookEvent(event) {
  const existing = await queryOne(
    'SELECT stripe_event_id, processed_at AS processedAt FROM stripe_webhook_events WHERE stripe_event_id = :stripeEventId LIMIT 1',
    { stripeEventId: event.id },
  );

  if (existing) {
    return {
      stripeEventId: existing.stripe_event_id,
      processedAt: existing.processedAt || null,
    };
  }

  await execute(
    `INSERT IGNORE INTO stripe_webhook_events
      (stripe_event_id, event_type, payload, processed_at, created_at)
     VALUES
      (:stripeEventId, :eventType, :payload, NULL, :createdAt)`,
    {
      stripeEventId: event.id,
      eventType: event.type,
      payload: JSON.stringify(event),
      createdAt: new Date(),
    },
  );

  return {
    stripeEventId: event.id,
    processedAt: null,
  };
}

async function markWebhookEventProcessed(eventId) {
  await execute(
    `UPDATE stripe_webhook_events
        SET processed_at = :processedAt
      WHERE stripe_event_id = :stripeEventId`,
    {
      stripeEventId: eventId,
      processedAt: new Date(),
    },
  );
}

async function handleStripeEvent(event) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const userId = Number(event.data.object?.metadata?.app_user_id || 0);
      const membershipAdjustmentId = Number(event.data.object?.metadata?.membership_adjustment_id || 0);
      const bookingId = Number(event.data.object?.metadata?.booking_id || 0);
      const bookingAdjustmentId = Number(event.data.object?.metadata?.booking_adjustment_id || 0);
      if (userId && membershipAdjustmentId) {
        await syncMembershipAdjustmentCheckoutSession({
          userId,
          sessionId: event.data.object.id,
        });
      } else if (userId && bookingAdjustmentId) {
        await syncBookingAdjustmentCheckoutSession({
          userId,
          sessionId: event.data.object.id,
        });
      } else if (userId && bookingId) {
        await syncBookingCheckoutSession({
          userId,
          sessionId: event.data.object.id,
        });
      } else if (userId) {
        await syncMembershipCheckoutSession({
          userId,
          sessionId: event.data.object.id,
        });
      } else {
        // P1-40: Log when checkout.session.completed doesn't match any handler due to missing metadata
        console.warn(`[webhook] checkout.session.completed with unrecognized metadata — no handler matched. session=${event.data.object.id} metadata=${JSON.stringify(event.data.object?.metadata)}`);
      }
      return;
    }
    case 'checkout.session.expired':
      if (Number(event.data.object?.metadata?.membership_adjustment_id || 0)) {
        await handleMembershipAdjustmentCheckoutExpired(event.data.object);
      } else if (Number(event.data.object?.metadata?.booking_adjustment_id || 0)) {
        await handleBookingAdjustmentCheckoutExpired(event.data.object);
      } else {
        await handleBookingCheckoutExpired(event.data.object);
      }
      return;
    case 'invoice.paid':
      if (Number(event.data.object?.metadata?.membership_adjustment_id || 0)) {
        await handleMembershipAdjustmentInvoicePaid(event.data.object);
      } else if (Number(event.data.object?.metadata?.booking_adjustment_id || 0)) {
        await handleBookingAdjustmentInvoicePaid(event.data.object);
      } else if (Number(event.data.object?.metadata?.booking_id || 0)) {
        await handleBookingInvoicePaid(event.data.object);
      } else {
        await handleInvoicePaid(event.data.object);
      }
      return;
    case 'invoice.payment_failed':
      if (Number(event.data.object?.metadata?.booking_id || 0)) {
        await handleBookingInvoicePaymentFailed(event.data.object);
      } else {
        await handleInvoicePaymentFailed(event.data.object);
      }
      return;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      return;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      return;
    case 'payment_intent.succeeded':
      await handleBookingPaymentIntentSucceeded(event.data.object);
      return;
    case 'payment_intent.payment_failed':
    case 'payment_intent.canceled':
      await handleBookingPaymentIntentFailed(event.data.object);
      return;
    case 'charge.refunded':
      await handleChargeRefunded(event.data.object);
      return;
    case 'refund.created':
    case 'refund.updated':
    case 'refund.failed':
      await handleStripeRefundUpdated(event.data.object);
      return;
    case 'charge.dispute.created':
    case 'charge.dispute.closed': {
      // P0-19: Log disputes instead of silently ignoring them
      const dispute = event.data.object;
      console.error(`[DISPUTE] ${event.type}: dispute=${dispute.id} charge=${dispute.charge} amount=${dispute.amount} status=${dispute.status} reason=${dispute.reason}`);
      // Suspend user access if dispute is open (protective measure)
      if (event.type === 'charge.dispute.created') {
        const disputeMetadata = dispute.evidence_details?.enhanced_eligibility_types || [];
        console.error(`[DISPUTE] Payment disputed — manual review required. Dispute ID: ${dispute.id}`);
      }
      return;
    }
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
      const recordedEvent = await recordWebhookEvent(event);

      if (recordedEvent.processedAt) {
        response.json({ ok: true, received: event.type, duplicate: true });
        return;
      }

      await handleStripeEvent(event);
      await markWebhookEventProcessed(event.id);
      response.json({ ok: true, received: event.type });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });
}

export function registerMemberPortalApi(app) {
  // --- Auth Router: /api/member-auth/* ---
  const authRouter = express.Router();

  // P0-3: CSRF token endpoint — frontend fetches this token and sends it in X-CSRF-Token header
  authRouter.get('/csrf-token', (request, response) => {
    if (!request.session) {
      return response.status(401).json({ error: 'No active session.' });
    }

    if (!request.session.csrfToken) {
      request.session.csrfToken = randomUUID();
    }

    response.json({ csrfToken: request.session.csrfToken });
  });

  authRouter.get('/session', async (request, response) => {
    try {
      const user = await requireAuthenticatedMember(request, response);

      if (!user) {
        return;
      }

      response.json({ data: user });
    } catch (error) {
      response.status(401).json({ error: String(error?.message ?? error) });
    }
  });

  authRouter.post('/register', authRateLimiter, validate(registerSchema), async (request, response) => {
    try {
      const user = await registerUser(request.body);
      await establishMemberSession(request, user.id);
      response.status(201).json({ data: user });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  authRouter.post('/login', authRateLimiter, validate(loginSchema), async (request, response) => {
    try {
      const user = await authenticateUser(request.body);
      await establishMemberSession(request, user.id);
      response.json({ data: user });
    } catch (error) {
      response.status(401).json({ error: String(error?.message ?? error) });
    }
  });

  authRouter.post('/logout', async (request, response) => {
    try {
      await clearMemberSession(request, response);
      response.json({ ok: true });
    } catch (error) {
      response.status(500).json({ error: String(error?.message ?? error) });
    }
  });

  authRouter.post('/change-password', memberAuthMiddleware, validate(changePasswordSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      await changeUserPassword({
        userId: user.id,
        currentPassword: request.body.currentPassword,
        newPassword: request.body.newPassword,
      });

      response.json({ ok: true });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  // #148: Forgot password — accepts email, generates reset token, sends email.
  // Always returns 200 regardless of whether the email exists (prevents user enumeration).
  authRouter.post('/forgot-password', authRateLimiter, validate(forgotPasswordSchema), async (request, response) => {
    try {
      const result = await createPasswordResetToken(request.body.email);

      if (result) {
        // Build the frontend reset URL with the raw token
        const frontendOrigin = config.cors.allowedOrigins[0] || config.publicOrigin;
        const resetUrl = `${frontendOrigin}/reset-password?token=${encodeURIComponent(result.token)}`;

        // Fire-and-forget — don't let email failure affect the response
        void sendPasswordResetEmail({
          recipientName: result.user.name,
          recipientEmail: result.user.email,
          resetUrl,
        });
      }

      // Always return success to prevent user enumeration
      response.json({ ok: true });
    } catch (error) {
      // Even on error, return 200 to prevent information leakage
      console.error('[auth] forgot-password error:', error?.message || error);
      response.json({ ok: true });
    }
  });

  // #148: Reset password — validates token and sets new password.
  authRouter.post('/reset-password', authRateLimiter, validate(resetPasswordSchema), async (request, response) => {
    try {
      await resetPasswordWithToken(request.body.token, request.body.newPassword);
      response.json({ ok: true });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.use('/api/member-auth', authRouter);

  // --- Guest Booking Router: /api/public/meeting-rooms/* ---
  const guestBookingRouter = express.Router();

  guestBookingRouter.get('/resources', validateQuery(resourceQuerySchema), async (request, response) => {
    try {
      const resources = await listAvailableResources({
        type: request.query.type,
        startAt: request.query.startAt,
        endAt: request.query.endAt,
      });

      response.json({
        data: {
          resources,
          stripe: {
            publishableKey: getStripePublishableKey(),
            mode: getStripeMode(),
          },
        },
      });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  guestBookingRouter.post('/bookings/payment-intent', guestBookingRateLimiter, validate(guestBookingPaymentIntentSchema), async (request, response) => {
    try {
      const draft = await initiateGuestMeetingRoomBookingPayment({
        guestName: request.body.guestName,
        guestEmail: request.body.guestEmail,
        resourceId: request.body.resourceId,
        startAt: request.body.startAt,
        endAt: request.body.endAt,
        purpose: request.body.purpose,
        notes: request.body.notes,
      });

      response.status(201).json({ data: draft });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  guestBookingRouter.post('/bookings/checkout-session', guestBookingRateLimiter, validate(guestBookingCheckoutSessionSchema), async (request, response) => {
    try {
      const successUrl = validateReturnUrl(request.body.successUrl, 'Success URL');
      const cancelUrl = validateReturnUrl(request.body.cancelUrl, 'Cancel URL');

      const result = await initiateGuestMeetingRoomBookingCheckout({
        guestName: request.body.guestName,
        guestEmail: request.body.guestEmail,
        resourceId: request.body.resourceId,
        startAt: request.body.startAt,
        endAt: request.body.endAt,
        purpose: request.body.purpose,
        notes: request.body.notes,
        successUrl,
        cancelUrl,
      });

      response.status(201).json({ data: result });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  guestBookingRouter.post('/bookings/sync-checkout-session', guestBookingRateLimiter, validate(guestBookingSyncCheckoutSchema), async (request, response) => {
    try {
      const booking = await syncGuestMeetingRoomBookingCheckout({
        guestEmail: request.body.guestEmail,
        sessionId: request.body.sessionId,
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  guestBookingRouter.post('/bookings/:bookingId/confirm', guestBookingRateLimiter, validate(guestBookingConfirmSchema), async (request, response) => {
    try {
      const bookingId = parseEntityId(request.params.bookingId);

      if (!bookingId) {
        response.status(400).json({ error: 'Booking ID is required.' });
        return;
      }

      const booking = await confirmGuestMeetingRoomBookingPayment({
        guestEmail: request.body.guestEmail,
        bookingId,
        paymentIntentId: request.body.paymentIntentId,
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  guestBookingRouter.post('/bookings/:bookingId/cancel', guestBookingRateLimiter, validate(guestBookingCancelSchema), async (request, response) => {
    try {
      const bookingId = parseEntityId(request.params.bookingId);

      if (!bookingId) {
        response.status(400).json({ error: 'Booking ID is required.' });
        return;
      }

      const booking = await cancelGuestMeetingRoomBookingPayment({
        guestEmail: request.body.guestEmail,
        bookingId,
        paymentIntentId: request.body.paymentIntentId,
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.use('/api/public/meeting-rooms', guestBookingRouter);

  // --- Member Portal Router: /api/member-portal/* ---
  const portalRouter = express.Router();

  portalRouter.get('/dashboard', async (request, response) => {
    try {
      const user = await requireAuthenticatedMember(request, response);

      if (!user) {
        return;
      }

      response.json({ data: await buildDashboardResponse(user.id) });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  // P1-50: This endpoint is intentionally unauthenticated.
  // Resource listing (types, names, pricing, availability) is semi-public data needed by both
  // guest booking pages and authenticated member dashboards. No sensitive user data is exposed.
  portalRouter.get('/resources', validateQuery(resourceQuerySchema), async (request, response) => {
    try {
      const resources = await listAvailableResources({
        type: request.query.type,
        startAt: request.query.startAt,
        endAt: request.query.endAt,
      });
      response.json({ data: resources });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.put('/profile', memberAuthMiddleware, validate(updateProfileSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const updatedUser = await updateUserProfile(user.id, {
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
      });

      response.json({ data: updatedUser });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships', memberAuthMiddleware, validate(planSlugSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const membership = await createMembership({ userId: user.id, planSlug: request.body.planSlug });
      response.status(201).json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships/payment-draft', memberAuthMiddleware, validate(planSlugSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const draft = await createMembershipPaymentDraft({ userId: user.id, planSlug: request.body.planSlug });
      response.status(201).json({ data: draft });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships/confirm-payment', memberAuthMiddleware, validate(confirmPaymentSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const membership = await confirmMembershipPayment({ userId: user.id, paymentIntentId: request.body.paymentIntentId });
      response.json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships/confirm-upgrade-payment', memberAuthMiddleware, validate(confirmUpgradePaymentSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const membership = await confirmMembershipUpgradePayment({ userId: user.id, paymentIntentId: request.body.paymentIntentId, adjustmentId: request.body.adjustmentId });
      response.json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships/checkout-session', memberAuthMiddleware, validate(membershipCheckoutSessionSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const successUrl = validateReturnUrl(request.body.successUrl, 'Success URL');
      const cancelUrl = validateReturnUrl(request.body.cancelUrl, 'Cancel URL');

      const session = await createMembershipCheckout({
        userId: user.id,
        planSlug: request.body.planSlug,
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

  portalRouter.post('/memberships/sync-checkout-session', memberAuthMiddleware, validate(syncSessionSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const membership = await syncMembershipCheckoutSession({ userId: user.id, sessionId: request.body.sessionId });
      response.json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships/change-plan', memberAuthMiddleware, validate(changePlanSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const successUrl = request.body.successUrl ? validateReturnUrl(request.body.successUrl, 'Success URL') : '';
      const cancelUrl = request.body.cancelUrl ? validateReturnUrl(request.body.cancelUrl, 'Cancel URL') : '';

      const result = await changeMembershipPlan({
        userId: user.id,
        planSlug: request.body.planSlug,
        successUrl,
        cancelUrl,
      });
      response.json({ data: result });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships/adjustments/sync-checkout-session', memberAuthMiddleware, validate(syncSessionSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const membership = await syncMembershipAdjustmentCheckoutSession({ userId: user.id, sessionId: request.body.sessionId });
      response.json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships/adjustments/:adjustmentId/cancel', async (request, response) => {
    try {
      const user = await requireAuthenticatedMember(request, response);

      if (!user) {
        return;
      }

      const adjustmentId = parseEntityId(request.params.adjustmentId);

      if (!adjustmentId) {
        response.status(400).json({ error: 'Adjustment ID is required.' });
        return;
      }

      await cancelMembershipAdjustment({ userId: user.id, adjustmentId });
      response.json({ ok: true });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships/change-plan/preview', memberAuthMiddleware, validate(planSlugSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const preview = await previewMembershipPlanChange({ userId: user.id, planSlug: request.body.planSlug });
      response.json({ data: preview });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships/cancel', async (request, response) => {
    try {
      const user = await requireAuthenticatedMember(request, response);

      if (!user) {
        return;
      }

      const membership = await cancelMembership({ userId: user.id });
      response.json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/memberships/cancel-scheduled-downgrade', async (request, response) => {
    try {
      const user = await requireAuthenticatedMember(request, response);

      if (!user) {
        return;
      }

      const membership = await cancelScheduledDowngrade({ userId: user.id });
      response.json({ data: membership });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/bookings', memberAuthMiddleware, validate(createBookingSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const booking = await createBooking({
        userId: user.id,
        resourceId: request.body.resourceId,
        bookingType: request.body.bookingType,
        startAt: request.body.startAt,
        endAt: request.body.endAt,
        purpose: request.body.purpose,
        notes: request.body.notes,
      });

      response.status(201).json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/bookings/payment-intent', memberAuthMiddleware, validate(bookingPaymentIntentSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const result = await initiateBookingPayment({
        userId: user.id,
        resourceId: request.body.resourceId,
        bookingType: request.body.bookingType,
        startAt: request.body.startAt,
        endAt: request.body.endAt,
        purpose: request.body.purpose,
        notes: request.body.notes,
      });

      response.status(201).json({ data: result });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/bookings/checkout-session', memberAuthMiddleware, validate(bookingCheckoutSessionSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const successUrl = validateReturnUrl(request.body.successUrl, 'Success URL');
      const cancelUrl = validateReturnUrl(request.body.cancelUrl, 'Cancel URL');

      const result = await initiateBookingCheckout({
        userId: user.id,
        resourceId: request.body.resourceId,
        bookingType: request.body.bookingType,
        startAt: request.body.startAt,
        endAt: request.body.endAt,
        purpose: request.body.purpose,
        notes: request.body.notes,
        successUrl,
        cancelUrl,
      });

      response.status(201).json({ data: result });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/bookings/sync-checkout-session', memberAuthMiddleware, validate(syncSessionSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const booking = await syncBookingCheckoutSession({ userId: user.id, sessionId: request.body.sessionId });
      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/bookings/adjustments/sync-checkout-session', memberAuthMiddleware, validate(syncSessionSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const booking = await syncBookingAdjustmentCheckoutSession({ userId: user.id, sessionId: request.body.sessionId });
      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/bookings/adjustments/:adjustmentId/cancel', async (request, response) => {
    try {
      const user = await requireAuthenticatedMember(request, response);

      if (!user) {
        return;
      }

      const adjustmentId = parseEntityId(request.params.adjustmentId);

      if (!adjustmentId) {
        response.status(400).json({ error: 'Adjustment ID is required.' });
        return;
      }

      await cancelBookingAdjustment({
        userId: user.id,
        adjustmentId,
      });

      response.json({ ok: true });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/bookings/adjustments/confirm-payment', memberAuthMiddleware, validate(confirmBookingAdjustmentPaymentSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const booking = await confirmBookingAdjustmentPayment({ userId: user.id, paymentIntentId: request.body.paymentIntentId, adjustmentId: request.body.adjustmentId });
      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/bookings/:bookingId/confirm', async (request, response) => {
    try {
      const user = await requireAuthenticatedMember(request, response);

      if (!user) {
        return;
      }

      const bookingId = parseEntityId(request.params.bookingId);
      const paymentIntentId = String(request.body?.paymentIntentId || '').trim();

      if (!bookingId) {
        response.status(400).json({ error: 'Booking ID is required.' });
        return;
      }

      const booking = await confirmBookingPayment({
        userId: user.id,
        bookingId,
        paymentIntentId,
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/bookings/:bookingId/cancel', async (request, response) => {
    try {
      const user = await requireAuthenticatedMember(request, response);

      if (!user) {
        return;
      }

      const bookingId = parseEntityId(request.params.bookingId);

      if (!bookingId) {
        response.status(400).json({ error: 'Booking ID is required.' });
        return;
      }

      const booking = await cancelPendingBooking({
        userId: user.id,
        bookingId,
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.post('/bookings/:bookingId/cancel-and-refund', async (request, response) => {
    try {
      const user = await requireAuthenticatedMember(request, response);

      if (!user) {
        return;
      }

      const bookingId = parseEntityId(request.params.bookingId);

      if (!bookingId) {
        response.status(400).json({ error: 'Booking ID is required.' });
        return;
      }

      const booking = await cancelConfirmedBooking({
        userId: user.id,
        bookingId,
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.put('/bookings/:bookingId', memberAuthMiddleware, validate(updateBookingSchema), async (request, response) => {
    try {
      const user = request.authenticatedUser;

      const bookingId = parseEntityId(request.params.bookingId);

      if (!bookingId) {
        response.status(400).json({ error: 'Booking ID is required.' });
        return;
      }

      const booking = await updateBooking({
        userId: user.id,
        bookingId,
        resourceId: request.body.resourceId,
        startAt: request.body.startAt,
        endAt: request.body.endAt,
        purpose: request.body.purpose,
        notes: request.body.notes,
        successUrl: request.body.successUrl ? validateReturnUrl(request.body.successUrl, 'Success URL') : '',
        cancelUrl: request.body.cancelUrl ? validateReturnUrl(request.body.cancelUrl, 'Cancel URL') : '',
      });

      response.json({ data: booking });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  portalRouter.get('/invoices', async (request, response) => {
    try {
      const user = await requireAuthenticatedMember(request, response);

      if (!user) {
        return;
      }

      response.json({ data: await listUserInvoices(user.id) });
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  app.use('/api/member-portal', portalRouter);
}
