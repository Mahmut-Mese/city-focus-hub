/**
 * P1-51: Zod-based request validation schemas and Express middleware.
 *
 * Provides a consistent validation layer for member-portal API endpoints.
 * Use `validate(schema)` as Express middleware to parse and replace `req.body`
 * with the validated result before the route handler runs.
 */
import { z } from 'zod';

// ──────────────────────────────────────────────
// Middleware factory
// ──────────────────────────────────────────────

/**
 * Express middleware that validates `req.body` against a Zod schema.
 * On success, replaces `req.body` with the parsed (coerced/trimmed) data.
 * On failure, responds with 400 and a structured error object.
 */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const issues = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));

      return res.status(400).json({
        error: issues.map((i) => i.message).join('; '),
        validationErrors: issues,
      });
    }

    req.body = result.data;
    next();
  };
}

/**
 * Validates `req.query` against a Zod schema (for GET endpoints).
 */
export function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const issues = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));

      return res.status(400).json({
        error: issues.map((i) => i.message).join('; '),
        validationErrors: issues,
      });
    }

    req.query = result.data;
    next();
  };
}

// ──────────────────────────────────────────────
// Shared field helpers
// ──────────────────────────────────────────────

const trimmedString = z.string().trim();
const requiredTrimmedString = trimmedString.min(1);
const positiveInt = z.coerce.number().int().positive();
const isoDateString = trimmedString.min(1, 'Date is required');
const emailField = trimmedString.email('Valid email is required');
const urlField = trimmedString.url('Must be a valid URL');

// ──────────────────────────────────────────────
// Auth schemas
// ──────────────────────────────────────────────

export const registerSchema = z.object({
  name: requiredTrimmedString.min(1, 'Name is required').max(255),
  email: emailField.max(255),
  password: requiredTrimmedString.min(6, 'Password must be at least 6 characters').max(128),
});

export const loginSchema = z.object({
  email: emailField.max(255),
  password: requiredTrimmedString.min(1, 'Password is required'),
});

export const changePasswordSchema = z.object({
  currentPassword: requiredTrimmedString.min(1, 'Current password is required'),
  newPassword: requiredTrimmedString.min(6, 'New password must be at least 6 characters').max(128),
});

// #148: Password reset flow schemas
export const forgotPasswordSchema = z.object({
  email: emailField.max(255),
});

export const resetPasswordSchema = z.object({
  token: requiredTrimmedString.min(1, 'Reset token is required'),
  newPassword: requiredTrimmedString.min(6, 'Password must be at least 6 characters').max(128),
});

export const updateProfileSchema = z.object({
  name: requiredTrimmedString.min(1, 'Name is required').max(255),
  email: emailField.max(255),
  phone: trimmedString.max(32).default(''),
});

// ──────────────────────────────────────────────
// Guest booking schemas
// ──────────────────────────────────────────────

const guestBookingBase = z.object({
  guestName: requiredTrimmedString.min(1, 'Guest name is required').max(255),
  guestEmail: emailField.max(255),
  resourceId: positiveInt,
  startAt: isoDateString,
  endAt: isoDateString,
  purpose: trimmedString.max(500).default(''),
  notes: trimmedString.max(2000).default(''),
});

export const guestBookingPaymentIntentSchema = guestBookingBase;

export const guestBookingCheckoutSessionSchema = guestBookingBase.extend({
  successUrl: urlField,
  cancelUrl: urlField,
});

export const guestBookingSyncCheckoutSchema = z.object({
  guestEmail: emailField,
  sessionId: requiredTrimmedString.min(1, 'Session ID is required'),
});

export const guestBookingConfirmSchema = z.object({
  guestEmail: emailField,
  paymentIntentId: requiredTrimmedString.min(1, 'Payment intent ID is required'),
});

export const guestBookingCancelSchema = z.object({
  guestEmail: emailField,
  paymentIntentId: trimmedString.default(''),
});

// ──────────────────────────────────────────────
// Member booking schemas
// ──────────────────────────────────────────────

export const createBookingSchema = z.object({
  resourceId: positiveInt,
  bookingType: trimmedString.default('meeting_room'),
  startAt: isoDateString,
  endAt: isoDateString,
  purpose: trimmedString.max(500).default(''),
  notes: trimmedString.max(2000).default(''),
});

export const bookingPaymentIntentSchema = createBookingSchema;

export const bookingCheckoutSessionSchema = createBookingSchema.extend({
  successUrl: urlField,
  cancelUrl: urlField,
});

export const updateBookingSchema = z.object({
  resourceId: positiveInt,
  startAt: isoDateString,
  endAt: isoDateString,
  purpose: trimmedString.max(500).default(''),
  notes: trimmedString.max(2000).default(''),
  successUrl: trimmedString.default(''),
  cancelUrl: trimmedString.default(''),
});

// ──────────────────────────────────────────────
// Membership schemas
// ──────────────────────────────────────────────

export const planSlugSchema = z.object({
  planSlug: requiredTrimmedString.min(1, 'Plan slug is required').max(64),
});

export const membershipSubscriptionSchema = planSlugSchema.extend({
  setupIntentId: requiredTrimmedString.min(1, 'SetupIntent ID is required').max(255),
});

export const membershipCheckoutSessionSchema = z.object({
  planSlug: requiredTrimmedString.min(1, 'Plan slug is required').max(64),
  successUrl: urlField,
  cancelUrl: urlField,
});

export const changePlanSchema = z.object({
  planSlug: requiredTrimmedString.min(1, 'Plan slug is required').max(64),
  successUrl: trimmedString.default(''),
  cancelUrl: trimmedString.default(''),
});

export const confirmPaymentSchema = z.object({
  paymentIntentId: requiredTrimmedString.min(1, 'Payment intent ID is required'),
});

export const confirmUpgradePaymentSchema = z.object({
  paymentIntentId: requiredTrimmedString.min(1, 'Payment intent ID is required'),
  adjustmentId: positiveInt,
});

export const syncSessionSchema = z.object({
  sessionId: requiredTrimmedString.min(1, 'Session ID is required'),
});

export const confirmBookingAdjustmentPaymentSchema = z.object({
  paymentIntentId: requiredTrimmedString.min(1, 'Payment intent ID is required'),
  adjustmentId: positiveInt,
});

export const pushTokenSchema = z.object({
  token: requiredTrimmedString.min(1, 'Push token is required').max(512),
  platform: z.enum(['ios', 'android']),
  deviceId: trimmedString.max(255).optional().default(''),
  sessionId: trimmedString.max(64).optional().default(''),
});

export const deletePushTokenSchema = z.object({
  token: trimmedString.max(512).optional().default(''),
  deviceId: trimmedString.max(255).optional().default(''),
  sessionId: trimmedString.max(64).optional().default(''),
}).refine((value) => Boolean(value.token || value.deviceId || value.sessionId), {
  message: 'Token, device ID, or session ID is required',
});

export const notificationPreferencesSchema = z.object({
  booking: z.boolean().default(true),
  payments: z.boolean().default(true),
  membership: z.boolean().default(true),
  access: z.boolean().default(true),
  marketing: z.boolean().default(false),
  quietHoursStart: trimmedString.max(5).nullable().optional().default(null),
  quietHoursEnd: trimmedString.max(5).nullable().optional().default(null),
});

export const accountDeletionRequestSchema = z.object({
  reason: trimmedString.max(1000).optional().default(''),
});

export const accountDeletionCancelSchema = z.object({
  reason: trimmedString.max(255).optional().default(''),
});

// ──────────────────────────────────────────────
// Resource query schema (GET endpoints)
// ──────────────────────────────────────────────

export const resourceQuerySchema = z.object({
  type: trimmedString.optional().default(''),
  startAt: trimmedString.optional().default(''),
  endAt: trimmedString.optional().default(''),
});
