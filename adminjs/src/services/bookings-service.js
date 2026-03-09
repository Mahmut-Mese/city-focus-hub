import { randomUUID } from 'node:crypto';
import { calculateVat, chargeBooking } from './payments-service.js';
import { createLocalInvoice } from './invoices-service.js';
import { execute, queryAll, queryOne } from './sql.js';
import { getResourceById, listResources } from './resources-service.js';
import { getUserMembership } from './memberships-service.js';
import {
  createBookingCheckoutSession,
  createBookingPaymentIntentDraft,
  ensureStripeCustomer,
  isStripeEnabled,
  retrieveStripeCheckoutSession,
  retrieveStripePaymentIntent,
} from './stripe-service.js';
import { createOrGetGuestUser, findUserByEmail, findUserById } from './users-service.js';

function toBooking(row) {
  const metadata = row.resource_metadata && typeof row.resource_metadata === 'string'
    ? JSON.parse(row.resource_metadata)
    : (row.resource_metadata || {});

  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    membershipId: row.membership_id ? Number(row.membership_id) : null,
    resourceId: Number(row.resource_id),
    resourceName: row.resource_name,
    resourceType: row.resource_type,
    location: metadata.zone ? `${metadata.floor}, ${metadata.zone}` : (metadata.floor || 'Workspace'),
    bookingType: row.booking_type,
    status: row.status,
    startAt: row.start_at,
    endAt: row.end_at,
    purpose: row.purpose || '',
    notes: row.notes || '',
    subtotalMinor: Number(row.subtotal_minor || 0),
    taxMinor: Number(row.tax_minor || 0),
    totalMinor: Number(row.total_minor || 0),
    currency: row.currency || 'gbp',
    stripePaymentIntentId: row.stripe_payment_intent_id || null,
    stripePaymentStatus: row.stripe_payment_status || null,
    capacity: row.resource_capacity ? `Capacity: ${row.resource_capacity} people` : 'Capacity: 1 person',
    attendees: row.booking_type === 'desk'
      ? '1 attendee'
      : `${Math.min(Number(row.resource_capacity || 1), Number(row.resource_capacity || 1))} attendees`,
  };
}

export async function listUserBookings(userId) {
  const rows = await queryAll(
    `SELECT bookings.*, resources.name AS resource_name, resources.type AS resource_type, resources.capacity AS resource_capacity, resources.metadata AS resource_metadata
       FROM bookings
       INNER JOIN resources ON resources.id = bookings.resource_id
      WHERE bookings.user_id = :userId
        AND bookings.status != 'canceled'
      ORDER BY bookings.start_at ASC, bookings.id ASC`,
    { userId },
  );

  return rows.map(toBooking);
}

async function getBookingRowForUser(userId, bookingId) {
  return queryOne(
    `SELECT bookings.*, resources.name AS resource_name, resources.type AS resource_type, resources.capacity AS resource_capacity, resources.metadata AS resource_metadata
       FROM bookings
       INNER JOIN resources ON resources.id = bookings.resource_id
      WHERE bookings.id = :bookingId AND bookings.user_id = :userId
      LIMIT 1`,
    {
      bookingId,
      userId,
    },
  );
}

export async function listAvailableResources({ type = '', startAt = '', endAt = '' }) {
  const resources = await listResources(type);

  if (!startAt || !endAt) {
    return resources.map((resource) => ({ ...resource, available: true }));
  }

  const conflictingRows = await queryAll(
    `SELECT resource_id
       FROM bookings
      WHERE status IN ('pending', 'confirmed')
        AND start_at < :endAt
        AND end_at > :startAt`,
    {
      startAt: new Date(startAt),
      endAt: new Date(endAt),
    },
  );

  const conflictingResourceIds = new Set(conflictingRows.map((row) => Number(row.resource_id)));

  return resources.map((resource) => ({
    ...resource,
    available: !conflictingResourceIds.has(resource.id),
  }));
}

export async function validateAvailability({ resourceId, startAt, endAt, excludeBookingId = null }) {
  const resource = await getResourceById(resourceId);
  if (!resource || !resource.active) {
    throw new Error('Selected resource is unavailable.');
  }

  const conflict = await queryOne(
    `SELECT id
       FROM bookings
      WHERE resource_id = :resourceId
        AND status IN ('pending', 'confirmed')
        AND start_at < :endAt
        AND end_at > :startAt
        AND (:excludeBookingId IS NULL OR id != :excludeBookingId)
      LIMIT 1`,
    {
      resourceId,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      excludeBookingId,
    },
  );

  if (conflict) {
    throw new Error('The selected resource is already booked for that time range.');
  }

  return resource;
}

function calculateBookingSubtotalMinor(resource, startAt, endAt) {
  const durationMs = new Date(endAt).getTime() - new Date(startAt).getTime();
  const durationHours = Math.max(1, Math.ceil(durationMs / (60 * 60 * 1000)));
  return durationHours * Number(resource.hourlyRateMinor || 0);
}

function validateBookingWindow(startAt, endAt) {
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new Error('Start and end time are required.');
  }

  if (endDate.getTime() <= startDate.getTime()) {
    throw new Error('End time must be after the start time.');
  }

  const durationMs = endDate.getTime() - startDate.getTime();
  const maxDurationMs = 24 * 60 * 60 * 1000;

  if (durationMs > maxDurationMs) {
    throw new Error('Bookings cannot be longer than 24 hours.');
  }
}

export async function createBooking({
  userId,
  resourceId,
  bookingType,
  startAt,
  endAt,
  purpose = '',
  notes = '',
}) {
  validateBookingWindow(startAt, endAt);
  const membership = await getUserMembership(userId);
  const resource = await validateAvailability({ resourceId, startAt, endAt });
  const subtotalMinor = calculateBookingSubtotalMinor(resource, startAt, endAt);
  const taxMinor = calculateVat(subtotalMinor);
  const totalMinor = subtotalMinor + taxMinor;
  const now = new Date();

  const [insertId, metadata] = await execute(
    `INSERT INTO bookings
      (document_id, user_id, membership_id, resource_id, booking_type, status, start_at, end_at, purpose, notes, subtotal_minor, tax_minor, total_minor, currency, created_at, updated_at)
     VALUES
      (:documentId, :userId, :membershipId, :resourceId, :bookingType, 'pending', :startAt, :endAt, :purpose, :notes, :subtotalMinor, :taxMinor, :totalMinor, 'gbp', :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      userId,
      membershipId: membership?.id || null,
      resourceId,
      bookingType,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      purpose,
      notes,
      subtotalMinor,
      taxMinor,
      totalMinor,
      createdAt: now,
      updatedAt: now,
    },
  );

  const bookingId = typeof insertId === 'number' ? insertId : metadata?.insertId;
  const chargeResult = await chargeBooking({
    userId,
    bookingId,
    totalMinor,
    currency: 'gbp',
  });

  await execute(
    `UPDATE bookings
        SET status = 'confirmed',
            stripe_payment_intent_id = :stripePaymentIntentId,
            stripe_payment_status = :stripePaymentStatus,
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      stripePaymentIntentId: chargeResult.stripePaymentIntentId,
      stripePaymentStatus: chargeResult.stripePaymentStatus,
      updatedAt: new Date(),
    },
  );

  await createLocalInvoice({
    userId,
    membershipId: membership?.id || null,
    bookingId,
    stripePaymentIntentId: chargeResult.stripePaymentIntentId,
    invoiceNumber: `BK-${bookingId}`,
    status: chargeResult.stripePaymentStatus === 'succeeded' ? 'paid' : chargeResult.stripePaymentStatus,
    description: `${resource.name} booking`,
    currency: 'gbp',
    subtotalMinor,
    taxMinor,
    totalMinor,
    paidAt: chargeResult.stripePaymentStatus === 'succeeded' ? new Date() : null,
  });

  const bookings = await listUserBookings(userId);
  return bookings.find((booking) => booking.id === Number(bookingId)) || null;
}

export async function initiateBookingPayment({
  userId,
  resourceId,
  bookingType,
  startAt,
  endAt,
  purpose = '',
  notes = '',
}) {
  validateBookingWindow(startAt, endAt);
  const membership = await getUserMembership(userId);
  const resource = await validateAvailability({ resourceId, startAt, endAt });
  const subtotalMinor = calculateBookingSubtotalMinor(resource, startAt, endAt);
  const taxMinor = calculateVat(subtotalMinor);
  const totalMinor = subtotalMinor + taxMinor;
  const now = new Date();

  const [insertId, metadata] = await execute(
    `INSERT INTO bookings
      (document_id, user_id, membership_id, resource_id, booking_type, status, start_at, end_at, purpose, notes, subtotal_minor, tax_minor, total_minor, currency, created_at, updated_at)
     VALUES
      (:documentId, :userId, :membershipId, :resourceId, :bookingType, 'pending', :startAt, :endAt, :purpose, :notes, :subtotalMinor, :taxMinor, :totalMinor, 'gbp', :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      userId,
      membershipId: membership?.id || null,
      resourceId,
      bookingType,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      purpose,
      notes,
      subtotalMinor,
      taxMinor,
      totalMinor,
      createdAt: now,
      updatedAt: now,
    },
  );

  const bookingId = typeof insertId === 'number' ? insertId : metadata?.insertId;

  if (!isStripeEnabled()) {
    await execute(
      `UPDATE bookings
          SET status = 'confirmed',
              stripe_payment_intent_id = :stripePaymentIntentId,
              stripe_payment_status = 'succeeded',
              updated_at = :updatedAt
        WHERE id = :bookingId`,
      {
        bookingId,
        stripePaymentIntentId: `mock_pi_${bookingId}`,
        updatedAt: new Date(),
      },
    );

    await createLocalInvoice({
      userId,
      membershipId: membership?.id || null,
      bookingId,
      stripePaymentIntentId: `mock_pi_${bookingId}`,
      invoiceNumber: `BK-${bookingId}`,
      status: 'paid',
      description: `${resource.name} booking`,
      currency: 'gbp',
      subtotalMinor,
      taxMinor,
      totalMinor,
      paidAt: new Date(),
    });

    return {
      booking: (await listUserBookings(userId)).find((entry) => entry.id === Number(bookingId)) || null,
      clientSecret: null,
      paymentIntentId: `mock_pi_${bookingId}`,
    };
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const customerId = await ensureStripeCustomer(user);
  const paymentIntent = await createBookingPaymentIntentDraft({
    customerId,
    amountMinor: totalMinor,
    currency: 'gbp',
    userId,
    bookingId,
  });

  await execute(
    `UPDATE bookings
        SET stripe_payment_intent_id = :stripePaymentIntentId,
            stripe_payment_status = :stripePaymentStatus,
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      stripePaymentIntentId: paymentIntent.id,
      stripePaymentStatus: paymentIntent.status,
      updatedAt: new Date(),
    },
  );

  return {
    booking: (await listUserBookings(userId)).find((entry) => entry.id === Number(bookingId)) || null,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
}

export async function initiateBookingCheckout({
  userId,
  resourceId,
  bookingType,
  startAt,
  endAt,
  purpose = '',
  notes = '',
  successUrl,
  cancelUrl,
}) {
  validateBookingWindow(startAt, endAt);

  if (!successUrl || !cancelUrl) {
    throw new Error('Checkout success and cancel URLs are required.');
  }

  const membership = await getUserMembership(userId);
  const resource = await validateAvailability({ resourceId, startAt, endAt });
  const subtotalMinor = calculateBookingSubtotalMinor(resource, startAt, endAt);
  const taxMinor = calculateVat(subtotalMinor);
  const totalMinor = subtotalMinor + taxMinor;
  const now = new Date();

  const [insertId, metadata] = await execute(
    `INSERT INTO bookings
      (document_id, user_id, membership_id, resource_id, booking_type, status, start_at, end_at, purpose, notes, subtotal_minor, tax_minor, total_minor, currency, created_at, updated_at)
     VALUES
      (:documentId, :userId, :membershipId, :resourceId, :bookingType, 'pending', :startAt, :endAt, :purpose, :notes, :subtotalMinor, :taxMinor, :totalMinor, 'gbp', :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      userId,
      membershipId: membership?.id || null,
      resourceId,
      bookingType,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      purpose,
      notes,
      subtotalMinor,
      taxMinor,
      totalMinor,
      createdAt: now,
      updatedAt: now,
    },
  );

  const bookingId = typeof insertId === 'number' ? insertId : metadata?.insertId;

  if (!isStripeEnabled()) {
    await execute(
      `UPDATE bookings
          SET status = 'confirmed',
              stripe_payment_intent_id = :stripePaymentIntentId,
              stripe_payment_status = 'succeeded',
              updated_at = :updatedAt
        WHERE id = :bookingId`,
      {
        bookingId,
        stripePaymentIntentId: `mock_pi_${bookingId}`,
        updatedAt: new Date(),
      },
    );

    await createLocalInvoice({
      userId,
      membershipId: membership?.id || null,
      bookingId,
      stripePaymentIntentId: `mock_pi_${bookingId}`,
      invoiceNumber: `BK-${bookingId}`,
      status: 'paid',
      description: `${resource.name} booking`,
      currency: 'gbp',
      subtotalMinor,
      taxMinor,
      totalMinor,
      paidAt: new Date(),
    });

    return {
      booking: (await listUserBookings(userId)).find((entry) => entry.id === Number(bookingId)) || null,
      sessionId: null,
      url: null,
    };
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const customerId = await ensureStripeCustomer(user);
  const session = await createBookingCheckoutSession({
    customerId,
    bookingId,
    userId,
    resourceName: resource.name,
    startAt,
    endAt,
    totalMinor,
    currency: 'gbp',
    successUrl,
    cancelUrl: `${cancelUrl}${cancelUrl.includes('?') ? '&' : '?'}booking_id=${bookingId}`,
  });

  await execute(
    `UPDATE bookings
        SET stripe_payment_status = 'checkout_open',
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      updatedAt: new Date(),
    },
  );

  return {
    booking: (await listUserBookings(userId)).find((entry) => entry.id === Number(bookingId)) || null,
    sessionId: session.id,
    url: session.url,
  };
}

export async function syncBookingCheckoutSession({ userId, sessionId }) {
  const session = await retrieveStripeCheckoutSession(sessionId);
  const sessionUserId = Number(session.metadata?.app_user_id || 0);
  const bookingId = Number(session.metadata?.booking_id || 0);

  if (!sessionUserId || sessionUserId !== userId) {
    throw new Error('Checkout session does not belong to this user.');
  }

  if (!bookingId) {
    throw new Error('Booking checkout session is missing booking metadata.');
  }

  const bookingRow = await getBookingRowForUser(userId, bookingId);

  if (!bookingRow) {
    throw new Error('Booking not found.');
  }

  if (session.payment_status !== 'paid') {
    throw new Error('Stripe checkout payment has not completed yet.');
  }

  await validateAvailability({
    resourceId: Number(bookingRow.resource_id),
    startAt: bookingRow.start_at,
    endAt: bookingRow.end_at,
    excludeBookingId: bookingId,
  });

  const paymentIntentId = typeof session.payment_intent === 'string'
    ? session.payment_intent
    : session.payment_intent?.id || null;

  await execute(
    `UPDATE bookings
        SET status = 'confirmed',
            stripe_payment_intent_id = :stripePaymentIntentId,
            stripe_payment_status = :stripePaymentStatus,
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      stripePaymentIntentId: paymentIntentId,
      stripePaymentStatus: session.payment_status,
      updatedAt: new Date(),
    },
  );

  if (paymentIntentId) {
    const existingInvoice = await queryOne(
      'SELECT id FROM invoices WHERE stripe_payment_intent_id = :stripePaymentIntentId LIMIT 1',
      { stripePaymentIntentId: paymentIntentId },
    );

    if (!existingInvoice) {
      await createLocalInvoice({
        userId,
        membershipId: bookingRow.membership_id ? Number(bookingRow.membership_id) : null,
        bookingId,
        stripePaymentIntentId: paymentIntentId,
        invoiceNumber: `BK-${bookingId}`,
        status: 'paid',
        description: `${bookingRow.resource_name} booking`,
        currency: bookingRow.currency || 'gbp',
        subtotalMinor: Number(bookingRow.subtotal_minor || 0),
        taxMinor: Number(bookingRow.tax_minor || 0),
        totalMinor: Number(bookingRow.total_minor || 0),
        paidAt: new Date(),
      });
    }
  }

  const bookings = await listUserBookings(userId);
  return bookings.find((booking) => booking.id === Number(bookingId)) || null;
}

export async function confirmBookingPayment({ userId, bookingId, paymentIntentId }) {
  const bookingRow = await getBookingRowForUser(userId, bookingId);

  if (!bookingRow) {
    throw new Error('Booking not found.');
  }

  if (paymentIntentId && bookingRow.stripe_payment_intent_id && paymentIntentId !== bookingRow.stripe_payment_intent_id) {
    throw new Error('Payment intent does not match this booking.');
  }

  if (!bookingRow.stripe_payment_intent_id) {
    throw new Error('Payment intent is missing for this booking.');
  }

  let paymentIntentStatus = 'succeeded';
  let resolvedPaymentIntentId = bookingRow.stripe_payment_intent_id;

  if (isStripeEnabled()) {
    const paymentIntent = await retrieveStripePaymentIntent(bookingRow.stripe_payment_intent_id);
    resolvedPaymentIntentId = paymentIntent.id;
    paymentIntentStatus = paymentIntent.status;

    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment has not completed yet. Please try again once Stripe confirms the charge.');
    }
  }

  await validateAvailability({
    resourceId: Number(bookingRow.resource_id),
    startAt: bookingRow.start_at,
    endAt: bookingRow.end_at,
    excludeBookingId: bookingId,
  });

  await execute(
    `UPDATE bookings
        SET status = 'confirmed',
            stripe_payment_status = :stripePaymentStatus,
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      stripePaymentStatus: paymentIntentStatus,
      updatedAt: new Date(),
    },
  );

  const existingInvoice = await queryOne(
    'SELECT id FROM invoices WHERE stripe_payment_intent_id = :stripePaymentIntentId LIMIT 1',
    { stripePaymentIntentId: resolvedPaymentIntentId },
  );

  if (!existingInvoice) {
    await createLocalInvoice({
      userId,
      membershipId: bookingRow.membership_id ? Number(bookingRow.membership_id) : null,
      bookingId,
      stripePaymentIntentId: resolvedPaymentIntentId,
      invoiceNumber: `BK-${bookingId}`,
      status: 'paid',
      description: `${bookingRow.resource_name} booking`,
      currency: bookingRow.currency || 'gbp',
      subtotalMinor: Number(bookingRow.subtotal_minor || 0),
      taxMinor: Number(bookingRow.tax_minor || 0),
      totalMinor: Number(bookingRow.total_minor || 0),
      paidAt: new Date(),
    });
  }

  const bookings = await listUserBookings(userId);
  return bookings.find((booking) => booking.id === Number(bookingId)) || null;
}

export async function cancelPendingBooking({ userId, bookingId }) {
  const bookingRow = await getBookingRowForUser(userId, bookingId);

  if (!bookingRow) {
    throw new Error('Booking not found.');
  }

  if (bookingRow.status !== 'pending') {
    return toBooking(bookingRow);
  }

  await execute(
    `UPDATE bookings
        SET status = 'canceled',
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      updatedAt: new Date(),
    },
  );

  const bookings = await listUserBookings(userId);
  return bookings.find((booking) => booking.id === Number(bookingId)) || null;
}

export async function updateBooking({
  userId,
  bookingId,
  resourceId,
  startAt,
  endAt,
  purpose = '',
  notes = '',
}) {
  validateBookingWindow(startAt, endAt);
  const existingBooking = await queryOne('SELECT * FROM bookings WHERE id = :bookingId AND user_id = :userId LIMIT 1', {
    bookingId,
    userId,
  });

  if (!existingBooking) {
    throw new Error('Booking not found.');
  }

  const resource = await validateAvailability({ resourceId, startAt, endAt, excludeBookingId: bookingId });
  const subtotalMinor = calculateBookingSubtotalMinor(resource, startAt, endAt);
  const taxMinor = calculateVat(subtotalMinor);
  const totalMinor = subtotalMinor + taxMinor;

  await execute(
    `UPDATE bookings
        SET resource_id = :resourceId,
            start_at = :startAt,
            end_at = :endAt,
            purpose = :purpose,
            notes = :notes,
            subtotal_minor = :subtotalMinor,
            tax_minor = :taxMinor,
            total_minor = :totalMinor,
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      resourceId,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      purpose,
      notes,
      subtotalMinor,
      taxMinor,
      totalMinor,
      updatedAt: new Date(),
    },
  );

  const bookings = await listUserBookings(userId);
  return bookings.find((booking) => booking.id === Number(bookingId)) || null;
}

export async function initiateGuestMeetingRoomBookingPayment({
  guestName,
  guestEmail,
  resourceId,
  startAt,
  endAt,
  purpose = '',
  notes = '',
}) {
  const guestUser = await createOrGetGuestUser({
    name: guestName,
    email: guestEmail,
  });

  if (!guestUser?.id) {
    throw new Error('Guest booking user could not be created.');
  }

  return initiateBookingPayment({
    userId: guestUser.id,
    resourceId,
    bookingType: 'meeting_room',
    startAt,
    endAt,
    purpose,
    notes,
  });
}

export async function confirmGuestMeetingRoomBookingPayment({
  guestEmail,
  bookingId,
  paymentIntentId,
}) {
  const guestUser = await findUserByEmail(guestEmail);

  if (!guestUser?.user?.id) {
    throw new Error('Guest booking was not found.');
  }

  return confirmBookingPayment({
    userId: guestUser.user.id,
    bookingId,
    paymentIntentId,
  });
}

export async function cancelGuestMeetingRoomBookingPayment({
  guestEmail,
  bookingId,
}) {
  const guestUser = await findUserByEmail(guestEmail);

  if (!guestUser?.user?.id) {
    throw new Error('Guest booking was not found.');
  }

  return cancelPendingBooking({
    userId: guestUser.user.id,
    bookingId,
  });
}
