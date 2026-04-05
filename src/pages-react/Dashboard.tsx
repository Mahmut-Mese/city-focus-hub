import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { loadStripe, type Stripe, type StripeElements, type StripeCardNumberElement, type StripeCardExpiryElement, type StripeCardCvcElement } from '@stripe/stripe-js';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CreditCard,
  Download,
  FileText,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Receipt,
  Settings,
  User,
  Users,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { defaultSiteSettingsContent } from '@/data/siteContent';
import {
  cancelMemberMembership,
  cancelMemberMembershipAdjustment,
  cancelMemberBookingAdjustment,
  cancelMemberBookingPayment,
  changeMemberPassword,
  changeMemberPlan,
  confirmMemberBookingPayment,
  createMemberBookingCheckoutSession,
  createMemberMembershipCheckoutSession,
  getMemberDashboard,
  listMemberResources,
  previewMemberPlanChange,
  syncMemberBookingAdjustmentCheckoutSession,
  syncMemberBookingCheckoutSession,
  syncMemberMembershipAdjustmentCheckoutSession,
  syncMemberMembershipCheckoutSession,
  updateMemberBooking,
  type BookingPaymentDraft,
  type MemberBooking,
  type MemberDashboardPayload,
  type MemberMembership,
  type MemberResource,
  type MembershipPlanChangePreview,
  type MembershipPlan,
} from '@/lib/member-api';
import { useSeo } from '@/lib/seo';
import { cn } from '@/lib/utils';

type DashboardSection = 'overview' | 'bookings' | 'billing' | 'invoices' | 'profile' | 'settings';

type DashboardNavItem = {
  icon: LucideIcon;
  label: string;
  path: string;
};

type BookingFormState = {
  bookingId: number | null;
  resourceId: string;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
};

type PasswordFormState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const dashboardNavItems: DashboardNavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: CalendarDays, label: 'My Bookings', path: '/dashboard/bookings' },
  { icon: CreditCard, label: 'Membership', path: '/dashboard/billing' },
  { icon: Receipt, label: 'Invoices', path: '/dashboard/invoices' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
];

function resolveDashboardSection(pathname: string): DashboardSection {
  if (pathname.startsWith('/dashboard/bookings')) {
    return 'bookings';
  }

  if (pathname.startsWith('/dashboard/billing')) {
    return 'billing';
  }

  if (pathname.startsWith('/dashboard/invoices')) {
    return 'invoices';
  }

  if (pathname.startsWith('/dashboard/profile')) {
    return 'profile';
  }

  if (pathname.startsWith('/dashboard/settings')) {
    return 'settings';
  }

  return 'overview';
}

function formatCurrency(amountMinor: number, currency = 'gbp') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format((Number(amountMinor || 0)) / 100);
}

function formatDate(isoDate: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!isoDate) {
    return '-';
  }

  return new Date(isoDate).toLocaleDateString('en-GB', options || {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(isoDate: string | null) {
  if (!isoDate) {
    return '-';
  }

  return new Date(isoDate).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDurationLabel(startAt: string, endAt: string) {
  const durationMs = new Date(endAt).getTime() - new Date(startAt).getTime();
  const totalMinutes = Math.max(0, Math.round(durationMs / (60 * 1000)));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (!hours) {
    return `${minutes} min`;
  }

  if (!minutes) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

function validateBookingFormWindow(startAt: string, endAt: string) {
  if (!startAt || !endAt) {
    throw new Error('Start and end time are required.');
  }

  const startDate = new Date(startAt);
  const endDate = new Date(endAt);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new Error('Start and end time are invalid.');
  }

  if (endDate.getTime() <= startDate.getTime()) {
    throw new Error('End time must be after the start time.');
  }

  if (endDate.getTime() - startDate.getTime() > 24 * 60 * 60 * 1000) {
    throw new Error('Bookings cannot be longer than 24 hours.');
  }
}

function formatDateTimeInputValue(value: string | null) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatBookingDateCard(dateValue: string) {
  const parsedDate = new Date(dateValue);
  return {
    month: parsedDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: parsedDate.toLocaleDateString('en-US', { day: '2-digit' }),
  };
}

function getFirstName(name: string) {
  return String(name || '').trim().split(/\s+/)[0] || 'Member';
}

function DashboardCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('rounded-[30px] border border-black/10 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-7', className)}>
      {children}
    </section>
  );
}

function DashboardFooter() {
  const footer = defaultSiteSettingsContent.footer;

  return (
    <footer className="mt-16 bg-black text-white">
      <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={footer.logoUrl} alt={defaultSiteSettingsContent.siteName} className="h-9 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/65">Space to work, connect, focus.</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Services</h3>
            <div className="mt-5 space-y-3 text-sm text-white/80">
              {footer.serviceLinks.slice(0, 3).map((link) => (
                <Link key={link.name} to={link.path} className="block transition-colors hover:text-white">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Company</h3>
            <div className="mt-5 space-y-3 text-sm text-white/80">
              <Link to="/about" className="block transition-colors hover:text-white">About</Link>
              <Link to="/contact" className="block transition-colors hover:text-white">Contact</Link>
              <Link to="/terms" className="block transition-colors hover:text-white">Terms & Conditions</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Visit</h3>
            <div className="mt-5 space-y-3 text-sm text-white/80">
              <p>EC3V 1PJ, London</p>
              <p>info@coworkinghub.com</p>
              <p>+44 20 1234 5678</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Coworking Hub</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function DashboardHeader({
  name,
  email,
  initials,
  onLogout,
}: {
  name: string;
  email: string;
  initials: string;
  onLogout: () => void;
}) {
  const navigation = defaultSiteSettingsContent.navigation;

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={navigation.logoUrl} alt={defaultSiteSettingsContent.siteName} className="h-9 w-auto" />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navigation.links.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm font-medium text-black/65 transition-colors hover:text-black">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-[#f7f7f6] px-3 py-2 shadow-sm transition-colors hover:bg-[#efefec]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {initials}
              </span>
              <span className="text-sm font-medium text-black">{name}</span>
              <ChevronDown size={16} className="text-black/55" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl border-black/10 p-2">
            <DropdownMenuLabel className="px-3 py-2">
              <p className="text-sm font-semibold text-black">{name}</p>
              <p className="mt-1 text-xs font-normal text-black/50">{email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5">
              <Link to="/dashboard/profile">
                <User className="mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={onLogout}
              className="rounded-xl px-3 py-2.5 text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <nav className="flex w-full items-center gap-4 overflow-x-auto pb-1 md:hidden">
          {navigation.links.map((link) => (
            <Link key={link.path} to={link.path} className="whitespace-nowrap text-sm font-medium text-black/60 transition-colors hover:text-black">
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function DashboardBookingDialog({
  open,
  title,
  description,
  formState,
  resources,
  onOpenChange,
  onChange,
  onSubmit,
  submitLabel,
  isSubmitting,
}: {
  open: boolean;
  title: string;
  description: string;
  formState: BookingFormState;
  resources: MemberResource[];
  onOpenChange: (open: boolean) => void;
  onChange: (field: keyof BookingFormState, value: string) => void;
  onSubmit: () => void;
  submitLabel: string;
  isSubmitting: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-[28px] border-black/10 bg-[#fbfaf8] p-0">
        <div className="p-6 sm:p-7">
          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="text-[2rem] font-semibold tracking-tight text-black">{title}</DialogTitle>
            <DialogDescription className="text-base text-black/50">{description}</DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="booking-resource">Resource</Label>
              <select
                id="booking-resource"
                value={formState.resourceId}
                onChange={(event) => onChange('resourceId', event.target.value)}
                className="flex h-11 w-full rounded-2xl border border-black/10 bg-white px-3 text-sm outline-none"
              >
                <option value="">Select a desk or meeting room</option>
                {resources.map((resource) => (
                  <option key={resource.id} value={String(resource.id)} disabled={resource.available === false}>
                    {resource.name} {resource.available === false ? '(Unavailable)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-start">Start</Label>
              <Input
                id="booking-start"
                type="datetime-local"
                value={formState.startAt}
                onChange={(event) => onChange('startAt', event.target.value)}
                className="h-11 rounded-2xl border-black/10 bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-end">End</Label>
              <Input
                id="booking-end"
                type="datetime-local"
                value={formState.endAt}
                onChange={(event) => onChange('endAt', event.target.value)}
                className="h-11 rounded-2xl border-black/10 bg-white"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="booking-purpose">Purpose</Label>
              <Input
                id="booking-purpose"
                value={formState.purpose}
                onChange={(event) => onChange('purpose', event.target.value)}
                className="h-11 rounded-2xl border-black/10 bg-white"
                placeholder="Quarterly planning workshop"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="booking-notes">Notes</Label>
              <Textarea
                id="booking-notes"
                value={formState.notes}
                onChange={(event) => onChange('notes', event.target.value)}
                className="min-h-[120px] rounded-2xl border-black/10 bg-white"
                placeholder="Any setup or support notes"
              />
            </div>
          </div>

          <DialogFooter className="mt-6 gap-3 sm:justify-end">
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-[#f3f2ef]"
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
            >
              {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
              {submitLabel}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BookingDetailsDialog({
  booking,
  open,
  onOpenChange,
  onEdit,
}: {
  booking: MemberBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (booking: MemberBooking) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-[28px] border-black/10 bg-[#fbfaf8] p-0">
        {booking ? (
          <div className="p-6 sm:p-7">
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="text-[2rem] font-semibold tracking-tight text-black">{booking.resourceName}</DialogTitle>
              <DialogDescription className="text-base text-black/50">
                Booking details and payment summary for this reservation.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div className="rounded-[24px] border border-black/10 bg-white p-5">
                <p className="text-lg font-semibold tracking-tight text-black">{formatDate(booking.startAt, {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}</p>
                <p className="mt-1 text-sm text-black/50">
                  {new Date(booking.startAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-black/10 bg-white p-5">
                  <p className="text-sm text-black/45">Type</p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-black">{booking.resourceType.replace('_', ' ')}</p>
                </div>
                <div className="rounded-[24px] border border-black/10 bg-white p-5">
                  <p className="text-sm text-black/45">Location</p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-black">{booking.location}</p>
                </div>
                <div className="rounded-[24px] border border-black/10 bg-white p-5">
                  <p className="text-sm text-black/45">Amount paid</p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-black">{formatCurrency(booking.totalMinor, booking.currency)}</p>
                </div>
                <div className="rounded-[24px] border border-black/10 bg-white p-5">
                  <p className="text-sm text-black/45">Payment status</p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-black">{booking.status}</p>
                </div>
              </div>

              <div className="rounded-[24px] border border-black/10 bg-white p-5">
                <p className="text-sm font-medium text-black/55">Purpose</p>
                <p className="mt-3 text-base leading-7 text-black/75">{booking.purpose || 'No purpose provided.'}</p>
              </div>

              <div className="rounded-[24px] border border-black/10 bg-white p-5">
                <p className="text-sm font-medium text-black/55">Notes</p>
                <p className="mt-3 text-base leading-7 text-black/75">{booking.notes || 'No notes provided.'}</p>
              </div>
            </div>

            <DialogFooter className="mt-6 gap-3 sm:justify-end">
              <Button
                variant="secondary"
                onClick={() => onOpenChange(false)}
                className="h-11 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-[#f3f2ef]"
              >
                Close
              </Button>
              <Button
                onClick={() => onEdit(booking)}
                className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
              >
                Edit booking
              </Button>
            </DialogFooter>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function PlanChangeDialog({
  open,
  preview,
  isSubmitting,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  preview: MembershipPlanChangePreview | null;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  const immediateAmountMinor = Math.max(0, preview?.settlement.paymentDueMinor ?? 0);
  const immediateRefundMinor = Math.max(0, preview?.settlement.refundMinor ?? 0);
  const currency = preview?.settlement.currency || preview?.preview.currency || preview?.nextPlan.currency || 'gbp';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-[28px] border-black/10 bg-[#fbfaf8] p-0">
        {preview ? (
          <div className="p-6 sm:p-7">
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="text-[2rem] font-semibold tracking-tight text-black">Confirm plan change</DialogTitle>
              <DialogDescription className="text-base text-black/50">
                The plan change takes effect immediately. Any extra amount is collected now, and any downgrade difference is sent back as a refund request.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 rounded-[24px] border border-black/10 bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-black/45">Current plan</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-black">{preview.currentPlan.name}</p>
                </div>
                <ArrowRight className="text-black/35" />
                <div className="text-right">
                  <p className="text-sm text-black/45">New plan</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-black">{preview.nextPlan.name}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-black/10 bg-white p-5">
                <p className="text-sm text-black/45">
                  {immediateRefundMinor > 0 && immediateAmountMinor <= 0 ? 'Refund today' : 'Charge today'}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-black">
                  {immediateAmountMinor > 0
                    ? formatCurrency(immediateAmountMinor, currency)
                    : immediateRefundMinor > 0
                      ? formatCurrency(immediateRefundMinor, currency)
                      : '£0.00'}
                </p>
                <p className="mt-2 text-sm text-black/50">
                  {immediateAmountMinor > 0
                    ? 'Prorated amount required before the upgrade is applied.'
                    : immediateRefundMinor > 0
                      ? 'A prorated refund request will be issued after the downgrade is applied.'
                      : 'No extra charge right now. The change still updates recurring billing.'}
                </p>
              </div>

              <div className="rounded-[24px] border border-black/10 bg-white p-5">
                <p className="text-sm text-black/45">Recurring monthly</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-black">
                  {formatCurrency(preview.nextPlan.monthlyPriceMinor, preview.nextPlan.currency)}
                </p>
                <p className="mt-2 text-sm text-black/50">
                  Renewing monthly after the current billing period.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[24px] border border-black/10 bg-white p-5">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">Subtotal</p>
                  <p className="mt-2 text-base font-semibold text-black">{formatCurrency(preview.preview.subtotalMinor, currency)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">VAT</p>
                  <p className="mt-2 text-base font-semibold text-black">{formatCurrency(preview.preview.taxMinor, currency)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">Invoice total</p>
                  <p className="mt-2 text-base font-semibold text-black">{formatCurrency(preview.preview.totalMinor, currency)}</p>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 gap-3 sm:justify-end">
              <Button
                variant="secondary"
                onClick={() => onOpenChange(false)}
                className="h-11 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-[#f3f2ef]"
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                disabled={isSubmitting}
                className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
              >
                {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
                {immediateAmountMinor > 0 ? 'Pay and change plan' : 'Confirm plan change'}
              </Button>
            </DialogFooter>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function BookingPaymentPanel({
  publishableKey,
  paymentDraft,
  isSubmitting,
  onConfirmPayment,
  onCancelPayment,
}: {
  publishableKey: string;
  paymentDraft: BookingPaymentDraft | null;
  isSubmitting: boolean;
  onConfirmPayment: (paymentIntentId: string) => Promise<void>;
  onCancelPayment: () => Promise<void> | void;
}) {
  const cardNumberContainerRef = useRef<HTMLDivElement | null>(null);
  const cardExpiryContainerRef = useRef<HTMLDivElement | null>(null);
  const cardCvcContainerRef = useRef<HTMLDivElement | null>(null);
  const stripeRef = useRef<Stripe | null>(null);
  const elementsRef = useRef<StripeElements | null>(null);
  const [readyCount, setReadyCount] = useState(0);
  const [elementError, setElementError] = useState('');
  const isElementReady = readyCount === 3;

  useEffect(() => {
    if (
      !publishableKey
      || !paymentDraft?.clientSecret
      || !cardNumberContainerRef.current
      || !cardExpiryContainerRef.current
      || !cardCvcContainerRef.current
    ) {
      return;
    }

    let active = true;
    let mountedCardNumber: StripeCardNumberElement | null = null;
    let mountedCardExpiry: StripeCardExpiryElement | null = null;
    let mountedCardCvc: StripeCardCvcElement | null = null;

    setReadyCount(0);
    setElementError('');

    void loadStripe(publishableKey)
      .then((stripe) => {
        if (!active) {
          return;
        }

        if (!stripe) {
          setElementError('Stripe could not be initialized.');
          return;
        }

        if (!cardNumberContainerRef.current || !cardExpiryContainerRef.current || !cardCvcContainerRef.current) {
          return;
        }

        stripeRef.current = stripe;
        const elements = stripe.elements();

        elementsRef.current = elements;
        const elementStyle = {
          style: {
            base: {
              color: '#111111',
              fontFamily: 'inherit',
              fontSize: '16px',
              '::placeholder': {
                color: 'rgba(17, 17, 17, 0.4)',
              },
            },
            invalid: {
              color: '#dc2626',
            },
          },
        };

        const handleReady = () => {
          if (active) {
            setReadyCount((count) => count + 1);
          }
        };

        const handleChange = (event: { error?: { message?: string } }) => {
          if (active && event.error?.message) {
            setElementError(event.error.message);
            return;
          }

          if (active) {
            setElementError('');
          }
        };

        mountedCardNumber = elements.create('cardNumber', elementStyle);
        mountedCardExpiry = elements.create('cardExpiry', elementStyle);
        mountedCardCvc = elements.create('cardCvc', elementStyle);

        mountedCardNumber.on('ready', handleReady);
        mountedCardExpiry.on('ready', handleReady);
        mountedCardCvc.on('ready', handleReady);
        mountedCardNumber.on('change', handleChange);
        mountedCardExpiry.on('change', handleChange);
        mountedCardCvc.on('change', handleChange);

        mountedCardNumber.mount(cardNumberContainerRef.current);
        mountedCardExpiry.mount(cardExpiryContainerRef.current);
        mountedCardCvc.mount(cardCvcContainerRef.current);
      })
      .catch((error: unknown) => {
        if (active) {
          setElementError(error instanceof Error ? error.message : 'Failed to load Stripe payment form.');
        }
      });

    return () => {
      active = false;
      setReadyCount(0);
      mountedCardNumber?.destroy();
      mountedCardExpiry?.destroy();
      mountedCardCvc?.destroy();
      elementsRef.current = null;
      stripeRef.current = null;
    };
  }, [paymentDraft?.clientSecret, publishableKey]);

  const handleConfirmClick = async () => {
    setElementError('');

    if (!stripeRef.current || !elementsRef.current) {
      setElementError('Payment form is still loading.');
      return;
    }

    const cardElement = elementsRef.current.getElement('cardNumber');

    if (!cardElement) {
      setElementError('Card field is not ready yet.');
      return;
    }

    const result = await stripeRef.current.confirmCardPayment(paymentDraft?.clientSecret || '', {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setElementError(result.error.message || 'Payment could not be completed.');
      return;
    }

    if (!result.paymentIntent?.id) {
      setElementError('Stripe did not return a payment result.');
      return;
    }

    await onConfirmPayment(result.paymentIntent.id);
  };

  if (!paymentDraft?.booking) {
    return null;
  }

  return (
    <DashboardCard>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-sm text-black/45">Payment required</p>
          <h2 className="mt-2 text-[2rem] font-semibold tracking-tight">Complete booking payment</h2>
          <p className="mt-3 max-w-2xl text-base text-black/50">
            Enter card details below to confirm this reservation without leaving the dashboard.
          </p>
        </div>
        <div className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
          {formatCurrency(paymentDraft.booking.totalMinor, paymentDraft.booking.currency)}
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xl font-semibold tracking-tight text-black">{paymentDraft.booking.resourceName}</p>
            <p className="mt-2 text-sm text-black/50">
              {formatDate(paymentDraft.booking.startAt, {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="mt-1 text-sm text-black/50">
              {formatTime(paymentDraft.booking.startAt)} - {formatTime(paymentDraft.booking.endAt)} • {formatDurationLabel(paymentDraft.booking.startAt, paymentDraft.booking.endAt)}
            </p>
            <p className="mt-1 text-sm text-black/50">{paymentDraft.booking.location}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">Subtotal</p>
              <p className="mt-2 text-lg font-semibold text-black">{formatCurrency(paymentDraft.booking.subtotalMinor, paymentDraft.booking.currency)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">VAT</p>
              <p className="mt-2 text-lg font-semibold text-black">{formatCurrency(paymentDraft.booking.taxMinor, paymentDraft.booking.currency)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">Total</p>
              <p className="mt-2 text-lg font-semibold text-black">{formatCurrency(paymentDraft.booking.totalMinor, paymentDraft.booking.currency)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-black/10 bg-white p-5">
        <p className="text-sm font-medium text-black/55">Card details</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label className="mb-2 block text-sm text-black/55">Card number</Label>
            <div className="rounded-[20px] border border-black/10 bg-[#fcfcfb] px-4 py-4">
              <div ref={cardNumberContainerRef} />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm text-black/55">Expiry</Label>
            <div className="rounded-[20px] border border-black/10 bg-[#fcfcfb] px-4 py-4">
              <div ref={cardExpiryContainerRef} />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm text-black/55">CVC</Label>
            <div className="rounded-[20px] border border-black/10 bg-[#fcfcfb] px-4 py-4">
              <div ref={cardCvcContainerRef} />
            </div>
          </div>
        </div>

        {!isElementReady && !elementError ? (
          <p className="mt-4 text-sm text-black/45">Loading Stripe card form...</p>
        ) : null}
        {elementError ? (
          <p className="mt-4 text-sm text-red-600">{elementError}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => void onCancelPayment()}
            disabled={isSubmitting}
            className="h-11 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-[#f3f2ef]"
          >
            Cancel payment
          </Button>
          <Button
            onClick={() => void handleConfirmClick()}
            disabled={isSubmitting || !isElementReady}
            className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
          >
            {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
            Pay now
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
}

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const currentSection = resolveDashboardSection(location.pathname);
  const [dashboardData, setDashboardData] = useState<MemberDashboardPayload | null>(null);
  const [availableResources, setAvailableResources] = useState<MemberResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [actionError, setActionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<MemberBooking | null>(null);
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);
  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [bookingPaymentDraft, setBookingPaymentDraft] = useState<BookingPaymentDraft | null>(null);
  const [isPlanChangeOpen, setIsPlanChangeOpen] = useState(false);
  const [pendingPlanSlug, setPendingPlanSlug] = useState('');
  const [planChangePreview, setPlanChangePreview] = useState<MembershipPlanChangePreview | null>(null);
  const [isCheckoutSyncing, setIsCheckoutSyncing] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [bookingForm, setBookingForm] = useState<BookingFormState>({
    bookingId: null,
    resourceId: '',
    startAt: '',
    endAt: '',
    purpose: '',
    notes: '',
  });

  const firstName = getFirstName(user?.name || 'Member');

  useSeo({
    siteName: defaultSiteSettingsContent.siteName,
    title: 'Membership Dashboard',
    description: 'Manage memberships, bookings, invoices, and profile details.',
    noindex: true,
  });

  const refreshDashboard = async () => {
    if (!user) {
      return;
    }

    setIsLoading(true);
    setActionError('');

    try {
      const payload = await getMemberDashboard();
      setDashboardData(payload);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to load dashboard.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAvailableResources = async (startAt: string, endAt: string) => {
    try {
      const resources = await listMemberResources({
        startAt: startAt ? new Date(startAt).toISOString() : '',
        endAt: endAt ? new Date(endAt).toISOString() : '',
      });
      setAvailableResources(resources);
    } catch {
      setAvailableResources(dashboardData?.resources || []);
    }
  };

  useEffect(() => {
    void refreshDashboard();
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const checkoutStatus = searchParams.get('checkout');
    const sessionId = searchParams.get('session_id');

    if (checkoutStatus === 'cancel') {
      setActionError('Stripe checkout was canceled before the membership was created.');
      navigate(location.pathname, { replace: true });
      return;
    }

    if (checkoutStatus !== 'success' || !sessionId) {
      return;
    }

    let active = true;
    setIsCheckoutSyncing(true);
    setActionError('');

    void syncMemberMembershipCheckoutSession(sessionId)
      .then(async () => {
        if (!active) {
          return;
        }

        await refreshDashboard();
        setSuccessMessage('Membership activated successfully.');
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setActionError(error instanceof Error ? error.message : 'Failed to sync checkout session.');
      })
      .finally(() => {
        if (!active) {
          return;
        }

        setIsCheckoutSyncing(false);
        navigate(location.pathname, { replace: true });
      });

    return () => {
      active = false;
    };
  }, [location.pathname, location.search, navigate, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const checkoutStatus = searchParams.get('membership_adjustment');
    const sessionId = searchParams.get('session_id');
    const adjustmentId = Number(searchParams.get('adjustment_id') || 0);

    if (checkoutStatus === 'cancel') {
      setActionError('Stripe checkout was canceled before the membership change was completed.');

      if (adjustmentId) {
        void cancelMemberMembershipAdjustment({ adjustmentId }).catch(() => {});
      }

      navigate(location.pathname, { replace: true });
      return;
    }

    if (checkoutStatus !== 'success' || !sessionId) {
      return;
    }

    let active = true;
    setIsCheckoutSyncing(true);
    setActionError('');

    void syncMemberMembershipAdjustmentCheckoutSession({ sessionId })
      .then(async () => {
        if (!active) {
          return;
        }

        await refreshDashboard();
        setSuccessMessage('Membership upgraded and additional payment captured successfully.');
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setActionError(error instanceof Error ? error.message : 'Failed to sync membership adjustment checkout session.');
      })
      .finally(() => {
        if (!active) {
          return;
        }

        setIsCheckoutSyncing(false);
        navigate(location.pathname, { replace: true });
      });

    return () => {
      active = false;
    };
  }, [location.pathname, location.search, navigate, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const checkoutStatus = searchParams.get('booking_adjustment');
    const sessionId = searchParams.get('session_id');
    const adjustmentId = Number(searchParams.get('adjustment_id') || 0);

    if (checkoutStatus === 'cancel') {
      setActionError('Stripe checkout was canceled before the booking update was completed.');

      if (adjustmentId) {
        void cancelMemberBookingAdjustment({ adjustmentId }).catch(() => {});
      }

      navigate(location.pathname, { replace: true });
      return;
    }

    if (checkoutStatus !== 'success' || !sessionId) {
      return;
    }

    let active = true;
    setIsCheckoutSyncing(true);
    setActionError('');

    void syncMemberBookingAdjustmentCheckoutSession({ sessionId })
      .then(async () => {
        if (!active) {
          return;
        }

        await refreshDashboard();
        setSuccessMessage('Booking updated and additional payment captured successfully.');
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setActionError(error instanceof Error ? error.message : 'Failed to sync booking adjustment checkout session.');
      })
      .finally(() => {
        if (!active) {
          return;
        }

        setIsCheckoutSyncing(false);
        navigate(location.pathname, { replace: true });
      });

    return () => {
      active = false;
    };
  }, [location.pathname, location.search, navigate, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const checkoutStatus = searchParams.get('booking_checkout');
    const sessionId = searchParams.get('session_id');
    const bookingId = Number(searchParams.get('booking_id') || 0);

    if (checkoutStatus === 'cancel') {
      setActionError('Stripe checkout was canceled before the booking was completed.');

      if (bookingId) {
        void cancelMemberBookingPayment({ bookingId }).catch(() => {});
      }

      navigate(location.pathname, { replace: true });
      return;
    }

    if (checkoutStatus !== 'success' || !sessionId) {
      return;
    }

    let active = true;
    setIsCheckoutSyncing(true);
    setActionError('');

    void syncMemberBookingCheckoutSession({ sessionId })
      .then(async () => {
        if (!active) {
          return;
        }

        await refreshDashboard();
        setSuccessMessage('Booking created and paid successfully.');
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setActionError(error instanceof Error ? error.message : 'Failed to sync booking checkout session.');
      })
      .finally(() => {
        if (!active) {
          return;
        }

        setIsCheckoutSyncing(false);
        navigate(location.pathname, { replace: true });
      });

    return () => {
      active = false;
    };
  }, [location.pathname, location.search, navigate, user]);

  useEffect(() => {
    if (isCreateBookingOpen || isEditBookingOpen) {
      void refreshAvailableResources(bookingForm.startAt, bookingForm.endAt);
    }
  }, [bookingForm.startAt, bookingForm.endAt, isCreateBookingOpen, isEditBookingOpen]);

  useEffect(() => {
    if (dashboardData?.resources) {
      setAvailableResources(dashboardData.resources);
    }
  }, [dashboardData?.resources]);

  useEffect(() => {
    if (!actionError) {
      return;
    }

    setIsCreateBookingOpen(false);
    setIsEditBookingOpen(false);
    setIsDetailsOpen(false);
    setIsPlanChangeOpen(false);
  }, [actionError]);

  const membership = dashboardData?.membership || null;
  const plans = dashboardData?.plans || [];
  const bookings = dashboardData?.bookings || [];
  const invoices = dashboardData?.invoices || [];
  const stats = dashboardData?.stats || {
    daysCheckedIn: 0,
    meetingRoomBookings: 0,
    currentMembership: '£0.00',
  };

  const summaryCards = [
    {
      icon: Users,
      value: String(stats.daysCheckedIn),
      label: 'Days checked in',
      meta: 'This month',
    },
    {
      icon: FileText,
      value: String(stats.meetingRoomBookings),
      label: 'Meeting room bookings',
      meta: 'Confirmed',
    },
    {
      icon: Wallet,
      value: stats.currentMembership,
      label: 'Current membership',
      meta: membership?.status || 'No plan',
    },
  ];

  const bookingDraftResource = useMemo(
    () => availableResources.find((resource) => String(resource.id) === bookingForm.resourceId),
    [availableResources, bookingForm.resourceId],
  );

  const logoutAndLeave = () => {
    logout();
    navigate('/');
  };

  const openCreateBookingDialog = () => {
    setSuccessMessage('');
    setActionError('');
    setBookingForm({
      bookingId: null,
      resourceId: '',
      startAt: '',
      endAt: '',
      purpose: '',
      notes: '',
    });
    setIsCreateBookingOpen(true);
  };

  const openEditBookingDialog = (booking: MemberBooking) => {
    setSuccessMessage('');
    setActionError('');
    setSelectedBooking(booking);
    setBookingForm({
      bookingId: booking.id,
      resourceId: String(booking.resourceId),
      startAt: formatDateTimeInputValue(booking.startAt),
      endAt: formatDateTimeInputValue(booking.endAt),
      purpose: booking.purpose,
      notes: booking.notes,
    });
    setIsDetailsOpen(false);
    setIsEditBookingOpen(true);
  };

  const handleBookingFormChange = (field: keyof BookingFormState, value: string) => {
    setBookingForm((current) => ({ ...current, [field]: value }));
  };

  const handlePasswordFormChange = (field: keyof PasswordFormState, value: string) => {
    setPasswordForm((current) => ({ ...current, [field]: value }));
  };

  const handleCreateBooking = async () => {
    if (!user) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      validateBookingFormWindow(bookingForm.startAt, bookingForm.endAt);

      const session = await createMemberBookingCheckoutSession({
        resourceId: Number(bookingForm.resourceId),
        bookingType: bookingDraftResource?.type || 'meeting_room',
        startAt: new Date(bookingForm.startAt).toISOString(),
        endAt: new Date(bookingForm.endAt).toISOString(),
        purpose: bookingForm.purpose,
        notes: bookingForm.notes,
        successUrl: `${window.location.origin}/dashboard/bookings?booking_checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/dashboard/bookings?booking_checkout=cancel`,
      });

      if (!session.url) {
        await refreshDashboard();
        setIsCreateBookingOpen(false);
        setSuccessMessage('Booking created and paid successfully.');
        return;
      }

      window.location.assign(session.url);
      return;
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to create booking.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmBookingPayment = async (paymentIntentId: string) => {
    if (!user || !bookingPaymentDraft?.booking?.id) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      await confirmMemberBookingPayment({
        bookingId: bookingPaymentDraft.booking.id,
        paymentIntentId,
      });
      setBookingPaymentDraft(null);
      await refreshDashboard();
      setSuccessMessage('Booking created and paid successfully.');
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to finalize booking payment.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelBookingPayment = async () => {
    if (!user || !bookingPaymentDraft?.booking?.id) {
      setBookingPaymentDraft(null);
      return;
    }

    try {
      await cancelMemberBookingPayment({
        bookingId: bookingPaymentDraft.booking.id,
      });
    } catch {
      // Ignore cancellation failures to avoid trapping the user in the modal.
    }

    setBookingPaymentDraft(null);
    await refreshDashboard();
  };

  const handleEditBooking = async () => {
    if (!user || !bookingForm.bookingId) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      validateBookingFormWindow(bookingForm.startAt, bookingForm.endAt);

      const result = await updateMemberBooking({
        bookingId: bookingForm.bookingId,
        resourceId: Number(bookingForm.resourceId),
        startAt: new Date(bookingForm.startAt).toISOString(),
        endAt: new Date(bookingForm.endAt).toISOString(),
        purpose: bookingForm.purpose,
        notes: bookingForm.notes,
        successUrl: `${window.location.origin}/dashboard/bookings?booking_adjustment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/dashboard/bookings?booking_adjustment=cancel`,
      });

      if (result.url) {
        window.location.assign(result.url);
        return;
      }

      await refreshDashboard();
      setIsEditBookingOpen(false);

      if (result.refundMinor > 0) {
        setSuccessMessage(`Booking updated. A refund of ${formatCurrency(result.refundMinor, result.booking?.currency || 'gbp')} has been requested.`);
      } else if (result.paymentDueMinor > 0) {
        setSuccessMessage(`Booking updated after collecting ${formatCurrency(result.paymentDueMinor, result.booking?.currency || 'gbp')}.`);
      } else {
        setSuccessMessage('Booking updated successfully.');
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to update booking.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMembershipAction = async (plan: MembershipPlan) => {
    if (!user) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      if (!membership) {
        const successUrl = `${window.location.origin}/dashboard/billing?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${window.location.origin}/dashboard/billing?checkout=cancel`;
        const session = await createMemberMembershipCheckoutSession(plan.slug, successUrl, cancelUrl);

        if (!session.url) {
          throw new Error('Stripe checkout URL was not returned.');
        }

        window.location.assign(session.url);
        return;
      } else {
        const preview = await previewMemberPlanChange(plan.slug);
        setPendingPlanSlug(plan.slug);
        setPlanChangePreview(preview);
        setIsPlanChangeOpen(true);
        return;
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Membership action failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmMembershipPlanChange = async () => {
    if (!user || !pendingPlanSlug || !planChangePreview) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      const successUrl = `${window.location.origin}/dashboard/billing?membership_adjustment=success&session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/dashboard/billing?membership_adjustment=cancel`;
      const result = await changeMemberPlan(pendingPlanSlug, { successUrl, cancelUrl });

      if (result.url) {
        window.location.assign(result.url);
        return;
      }

      await refreshDashboard();
      setIsPlanChangeOpen(false);
      setPlanChangePreview(null);
      setPendingPlanSlug('');

      const todayAmount = result.paymentDueMinor;
      const refundAmount = result.refundMinor;
      const settlementCurrency = planChangePreview.settlement.currency || planChangePreview.preview.currency;
      setSuccessMessage(
        todayAmount > 0
          ? `Plan changed. Stripe charged ${formatCurrency(todayAmount, settlementCurrency)} today and recurring billing stays active.`
          : refundAmount > 0
            ? `Plan changed. A refund of ${formatCurrency(refundAmount, settlementCurrency)} has been requested.`
            : `Plan changed. Recurring billing is now set to ${formatCurrency(planChangePreview.nextPlan.monthlyPriceMinor, planChangePreview.nextPlan.currency)} per month.`,
      );
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to change membership plan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelMembership = async () => {
    if (!user) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      await cancelMemberMembership();
      await refreshDashboard();
      setSuccessMessage('Membership will cancel at the end of the current billing period.');
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to cancel membership.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
        throw new Error('All password fields are required.');
      }

      if (passwordForm.newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long.');
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error('New password and confirmation do not match.');
      }

      await changeMemberPassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setSuccessMessage('Password changed successfully.');
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to change password.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <DashboardCard>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm text-black/45">Member dashboard</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-[3rem]">Welcome back, {firstName}</h1>
            <p className="mt-3 text-lg text-black/50">Your membership, bookings, invoices, and Stripe status are synced from the backend.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate('/dashboard/bookings')} className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90">
              Book a room
            </Button>
            <Button
              onClick={() => navigate('/dashboard/billing')}
              variant="secondary"
              className="h-11 rounded-full border border-black/10 bg-[#f3f2ef] px-5 text-sm font-medium text-black hover:bg-[#eceae6]"
            >
              View membership
            </Button>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {summaryCards.map(({ icon: Icon, value, label, meta }) => (
            <div key={label} className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <Icon size={20} />
                </div>
                <span className="text-sm capitalize text-black/40">{meta}</span>
              </div>
              <div className="mt-8">
                <p className="text-[2.1rem] font-semibold leading-none tracking-tight">{value}</p>
                <p className="mt-3 text-lg text-black/50">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <DashboardCard>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[2rem] font-semibold tracking-tight">Upcoming bookings</h2>
            <Link to="/dashboard/bookings" className="text-sm font-medium text-black/50 transition-colors hover:text-black">View all</Link>
          </div>
          <div className="mt-5 space-y-4">
            {bookings.slice(0, 3).map((booking) => {
              const dateCard = formatBookingDateCard(booking.startAt);
              return (
                <div key={booking.id} className="flex flex-col gap-4 rounded-[24px] border border-black/10 bg-[#fcfcfb] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-black/10 bg-[#f7f7f6] text-center">
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-black/45">{dateCard.month}</span>
                      <span className="mt-1 text-2xl font-semibold leading-none text-black">{dateCard.day}</span>
                    </div>
                    <div>
                      <p className="text-xl font-semibold tracking-tight">{booking.resourceName}</p>
                      <p className="mt-1 text-sm text-black/45">
                        {new Date(booking.startAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="mt-1 text-sm text-black/45">{booking.location}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setIsDetailsOpen(true);
                    }}
                    variant="secondary"
                    className="h-10 rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-black hover:bg-[#f3f2ef]"
                  >
                    Manage
                  </Button>
                </div>
              );
            })}
            {bookings.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-black/10 bg-[#fcfcfb] p-6 text-sm text-black/50">
                No bookings yet. Use the booking page to reserve a desk or meeting room.
              </div>
            ) : null}
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[2rem] font-semibold tracking-tight">Membership details</h2>
            <span className="inline-flex rounded-full bg-black px-3 py-1.5 text-xs font-semibold capitalize text-white">
              {membership?.status || 'inactive'}
            </span>
          </div>

          <div className="mt-5 rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
            <h3 className="text-xl font-semibold tracking-tight">{membership?.planName || 'No active membership'}</h3>
            <p className="mt-2 text-sm text-black/45">
              {membership
                ? `Current period ends ${formatDate(membership.currentPeriodEnd)}`
                : 'Choose a plan from the billing page to start recurring billing.'}
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-black/45">Monthly fee</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  {membership ? formatCurrency(membership.monthlyPriceMinor, membership.currency) : '£0.00'}
                </p>
              </div>
              <div>
                <p className="text-sm text-black/45">Next billing date</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{formatDate(membership?.currentPeriodEnd || null)}</p>
              </div>
              <div>
                <p className="text-sm text-black/45">Stripe mode</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight capitalize">{dashboardData?.stripe.mode || 'test'}</p>
              </div>
              <div>
                <p className="text-sm text-black/45">Publishable key</p>
                <p className="mt-1 text-sm font-semibold tracking-tight text-black">
                  {dashboardData?.stripe.publishableKey ? 'Configured' : 'Missing'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
            <h3 className="text-xl font-semibold tracking-tight">Benefits</h3>
            <div className="mt-5 space-y-4">
              {(plans.find((plan) => plan.slug === membership?.planSlug)?.features || []).map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 text-base text-black/75">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                    <Check size={14} />
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
              {!membership ? <p className="text-sm text-black/50">Activate a plan to see included benefits.</p> : null}
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <DashboardCard>
        <p className="text-sm text-black/45">My bookings</p>
        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-[3rem]">Booking engine</h1>
            <p className="mt-3 max-w-2xl text-lg text-black/50">
              Availability is validated before a draft is reserved, then payment is collected directly inside the dashboard before the booking is confirmed.
            </p>
          </div>
          <Button onClick={openCreateBookingDialog} className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90">
            New booking
          </Button>
        </div>
      </DashboardCard>

      {bookingPaymentDraft ? (
        <BookingPaymentPanel
          publishableKey={dashboardData?.stripe.publishableKey || ''}
          paymentDraft={bookingPaymentDraft}
          isSubmitting={isSaving}
          onConfirmPayment={handleConfirmBookingPayment}
          onCancelPayment={handleCancelBookingPayment}
        />
      ) : null}

      <DashboardCard>
        <div className="grid gap-4 md:grid-cols-3">
          {summaryCards.map(({ icon: Icon, value, label, meta }) => (
            <div key={label} className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <Icon size={20} />
                </div>
                <span className="text-sm text-black/40 capitalize">{meta}</span>
              </div>
              <p className="mt-6 text-[2rem] font-semibold leading-none tracking-tight">{value}</p>
              <p className="mt-3 text-base text-black/50">{label}</p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[2rem] font-semibold tracking-tight">Confirmed reservations</h2>
          <p className="text-sm text-black/45">{bookings.length} bookings</p>
        </div>

        <div className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{booking.resourceName}</h3>
                  <p className="mt-1 text-sm text-black/45">{formatDate(booking.startAt, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}</p>
                  <p className="mt-1 text-sm text-black/45">
                    {new Date(booking.startAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="mt-1 text-sm text-black/45">{booking.location}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {booking.status !== 'canceled' ? (
                    <Button
                      onClick={() => openEditBookingDialog(booking)}
                      variant="secondary"
                      className="h-10 rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-black hover:bg-[#f3f2ef]"
                    >
                      Edit
                    </Button>
                  ) : null}
                  <Button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setIsDetailsOpen(true);
                    }}
                    className="h-10 rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-black/90"
                  >
                    View details
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {bookings.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-black/10 bg-[#fcfcfb] p-6 text-sm text-black/50">
              No bookings yet. Use the new booking modal to reserve a desk or meeting room.
            </div>
          ) : null}
        </div>
      </DashboardCard>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <DashboardCard>
        <p className="text-sm text-black/45">Billing</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-[3rem]">Membership lifecycle</h1>
        <p className="mt-3 max-w-2xl text-lg text-black/50">
          New memberships launch Stripe Checkout for card entry. Later plan changes can collect extra payment or issue refunds, while recurring billing and invoice sync continue through Stripe subscriptions and webhooks.
        </p>
      </DashboardCard>

      <DashboardCard>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => {
            const isCurrentPlan = membership?.planSlug === plan.slug;
            return (
              <div key={plan.slug} className={cn('rounded-[24px] border p-5', isCurrentPlan ? 'border-black bg-[#f7f7f6]' : 'border-black/10 bg-white')}>
                <p className="text-sm text-black/45">{plan.slug.replace('-', ' ')}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{plan.name}</h2>
                <p className="mt-2 text-sm text-black/55">{plan.description}</p>
                <p className="mt-5 text-3xl font-semibold tracking-tight">{formatCurrency(plan.monthlyPriceMinor, plan.currency)}</p>
                <div className="mt-5 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-black/70">
                      <Check size={14} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button
                    disabled={isSaving || isCurrentPlan}
                    onClick={() => handleMembershipAction(plan)}
                    className="h-11 flex-1 rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
                  >
                    {isCurrentPlan ? 'Current plan' : membership ? 'Change plan' : 'Checkout with Stripe'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[2rem] font-semibold tracking-tight">Active subscription</h2>
            <p className="mt-2 text-sm text-black/50">
              {membership
                ? `${membership.planName} • ${membership.status} • renews ${formatDate(membership.currentPeriodEnd)}`
                : 'No active subscription yet.'}
            </p>
          </div>
          {membership ? (
            <Button
              disabled={isSaving}
              onClick={handleCancelMembership}
              variant="secondary"
              className="h-11 rounded-full border border-black/10 bg-[#f3f2ef] px-5 text-sm font-medium text-black hover:bg-[#eceae6]"
            >
              Cancel subscription
            </Button>
          ) : null}
        </div>
      </DashboardCard>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <DashboardCard>
        <p className="text-sm text-black/45">Invoices</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-[3rem]">Invoice center</h1>
        <p className="mt-3 max-w-2xl text-lg text-black/50">
          Subscription invoices and booking charges are listed here after backend sync.
        </p>
      </DashboardCard>

      <DashboardCard>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-[24px] border border-black/10">
            <thead className="bg-[#f7f7f6]">
              <tr className="text-left text-xs font-semibold uppercase tracking-[0.12em] text-black/45">
                <th className="px-4 py-4">Invoice</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4">Description</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices.map((invoice, index) => (
                <tr key={invoice.id} className={cn(index !== invoices.length - 1 && 'border-b border-black/10')}>
                  <td className="px-4 py-5 text-sm font-semibold text-black">{invoice.invoiceNumber || `INV-${invoice.id}`}</td>
                  <td className="px-4 py-5 text-sm text-black/55">{formatDate(invoice.paidAt || invoice.createdAt)}</td>
                  <td className="px-4 py-5 text-sm text-black/75">{invoice.description}</td>
                  <td className="px-4 py-5 text-sm font-medium text-black">{formatCurrency(invoice.totalMinor, invoice.currency)}</td>
                  <td className="px-4 py-5 text-sm font-medium capitalize text-black">{invoice.status}</td>
                  <td className="px-4 py-5 text-right">
                    {invoice.hostedInvoiceUrl || invoice.invoicePdf ? (
                      <a
                        href={invoice.invoicePdf || invoice.hostedInvoiceUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-black hover:bg-[#f3f2ef]"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    ) : (
                      <span className="text-sm text-black/35">Local record</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <DashboardCard>
        <p className="text-sm text-black/45">Profile</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-[3rem]">Member profile</h1>
        <p className="mt-3 max-w-2xl text-lg text-black/50">
          This account is backed by the member user service and controls dashboard access.
        </p>
      </DashboardCard>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <DashboardCard>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f2f1ee] text-xl font-semibold">
              {user?.initials}
            </div>
            <div>
              <h2 className="text-[2rem] font-semibold tracking-tight">{user?.name}</h2>
              <p className="text-base capitalize text-black/45">{dashboardData?.user.accessStatus || user?.accessStatus || 'active'}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 rounded-[20px] border border-black/10 bg-[#fcfcfb] p-4">
              <Mail size={18} className="text-black/55" />
              <div>
                <p className="text-sm text-black/45">Email</p>
                <p className="text-base font-medium text-black">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[20px] border border-black/10 bg-[#fcfcfb] p-4">
              <Phone size={18} className="text-black/55" />
              <div>
                <p className="text-sm text-black/45">Phone</p>
                <p className="text-base font-medium text-black">+44 20 1234 5678</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[20px] border border-black/10 bg-[#fcfcfb] p-4">
              <MapPin size={18} className="text-black/55" />
              <div>
                <p className="text-sm text-black/45">Primary location</p>
                <p className="text-base font-medium text-black">City Focus Hub, London</p>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <h2 className="text-[2rem] font-semibold tracking-tight">Account state</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <p className="text-sm text-black/45">Member access</p>
              <p className="mt-2 text-xl font-semibold tracking-tight capitalize">{dashboardData?.user.accessStatus || user?.accessStatus || 'active'}</p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <p className="text-sm text-black/45">Stripe publishable key</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">{dashboardData?.stripe.publishableKey ? 'Configured' : 'Missing'}</p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <p className="text-sm text-black/45">Subscription status</p>
              <p className="mt-2 text-xl font-semibold tracking-tight capitalize">{membership?.status || 'inactive'}</p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <p className="text-sm text-black/45">Current plan</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">{membership?.planName || 'No active plan'}</p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <DashboardCard>
        <p className="text-sm text-black/45">Settings</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-[3rem]">Account settings</h1>
        <p className="mt-3 max-w-2xl text-lg text-black/50">
          Update your password for this customer account.
        </p>
      </DashboardCard>

      <DashboardCard className="max-w-3xl">
        <h2 className="text-[2rem] font-semibold tracking-tight">Change password</h2>
        <div className="mt-6 grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="settings-current-password">Current password</Label>
            <Input
              id="settings-current-password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(event) => handlePasswordFormChange('currentPassword', event.target.value)}
              className="h-11 rounded-2xl border-black/10 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="settings-new-password">New password</Label>
            <Input
              id="settings-new-password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(event) => handlePasswordFormChange('newPassword', event.target.value)}
              className="h-11 rounded-2xl border-black/10 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="settings-confirm-password">Confirm new password</Label>
            <Input
              id="settings-confirm-password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(event) => handlePasswordFormChange('confirmPassword', event.target.value)}
              className="h-11 rounded-2xl border-black/10 bg-white"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleChangePassword}
            disabled={isSaving}
            className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
          >
            {isSaving ? <LoaderCircle className="animate-spin" /> : null}
            Update password
          </Button>
        </div>
      </DashboardCard>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'bookings':
        return renderBookings();
      case 'billing':
        return renderBilling();
      case 'invoices':
        return renderInvoices();
      case 'profile':
        return renderProfile();
      case 'settings':
        return renderSettings();
      case 'overview':
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-black">
      <DashboardHeader
        name={user?.name || 'Member'}
        email={user?.email || ''}
        initials={user?.initials || 'CF'}
        onLogout={logoutAndLeave}
      />

      <main className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
        {actionError ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {actionError}
          </div>
        ) : null}

        {successMessage ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        ) : null}

        {isLoading || isCheckoutSyncing ? (
          <DashboardCard className="flex min-h-[420px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-black/50">
              <LoaderCircle className="animate-spin" />
              {isCheckoutSyncing ? 'Syncing Stripe checkout...' : 'Loading dashboard...'}
            </div>
          </DashboardCard>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="rounded-[30px] border border-black/10 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:sticky lg:top-24 lg:h-fit">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2f1ee] text-lg font-semibold">
                  {user?.initials}
                </div>
                <div>
                  <h2 className="text-[1.75rem] font-semibold leading-none tracking-tight">{firstName}&apos;s Workspace</h2>
                  <p className="mt-1 text-base text-black/45">{membership?.planName || 'No active membership'}</p>
                </div>
              </div>

              <div className="my-6 border-t border-black/10" />

              <nav className="space-y-2">
                {dashboardNavItems.map(({ icon: Icon, label, path }) => {
                  const isActive = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));

                  return (
                    <Link
                      key={path}
                      to={path}
                      className={cn(
                        'flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-colors',
                        isActive ? 'bg-black text-white' : 'text-black/70 hover:bg-[#f3f2ef] hover:text-black',
                      )}
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45">Quick Actions</p>
                <div className="mt-4 space-y-3">
                  <Button
                    onClick={openCreateBookingDialog}
                    variant="secondary"
                    className="h-11 w-full justify-start rounded-2xl border border-black/10 bg-[#f3f2ef] px-4 text-sm font-medium text-black hover:bg-[#eceae6]"
                  >
                    <CalendarDays className="mr-2" />
                    Book meeting room
                  </Button>
                </div>
              </div>

              <div className="my-6 border-t border-black/10" />

              <div className="space-y-2">
                <Button
                  onClick={() => navigate('/dashboard/settings')}
                  variant="ghost"
                  className="h-11 w-full justify-start rounded-2xl px-4 text-sm text-black/70 hover:bg-[#f3f2ef] hover:text-black"
                >
                  <Settings className="mr-2" />
                  Settings
                </Button>
                <Button
                  onClick={logoutAndLeave}
                  variant="ghost"
                  className="h-11 w-full justify-start rounded-2xl px-4 text-sm text-black/70 hover:bg-[#f3f2ef] hover:text-black"
                >
                  <LogOut className="mr-2" />
                  Logout
                </Button>
              </div>
            </aside>

            {renderCurrentSection()}
          </div>
        )}
      </main>

      <DashboardFooter />

      <DashboardBookingDialog
        open={isCreateBookingOpen}
        title="Create new booking"
        description="Reserve an available desk or meeting room. The backend validates conflicts before saving."
        formState={bookingForm}
        resources={availableResources}
        onOpenChange={setIsCreateBookingOpen}
        onChange={handleBookingFormChange}
        onSubmit={handleCreateBooking}
        submitLabel="Create booking"
        isSubmitting={isSaving}
      />

      <DashboardBookingDialog
        open={isEditBookingOpen}
        title="Edit booking"
        description="Update the reservation details, re-run availability validation, and settle any price difference through Stripe if the booking cost changes."
        formState={bookingForm}
        resources={availableResources}
        onOpenChange={setIsEditBookingOpen}
        onChange={handleBookingFormChange}
        onSubmit={handleEditBooking}
        submitLabel="Save changes"
        isSubmitting={isSaving}
      />

      <BookingDetailsDialog
        booking={selectedBooking}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onEdit={openEditBookingDialog}
      />

      <PlanChangeDialog
        open={isPlanChangeOpen}
        preview={planChangePreview}
        isSubmitting={isSaving}
        onOpenChange={(open) => {
          setIsPlanChangeOpen(open);
          if (!open) {
            setPlanChangePreview(null);
            setPendingPlanSlug('');
          }
        }}
        onConfirm={handleConfirmMembershipPlanChange}
      />
    </div>
  );
}
