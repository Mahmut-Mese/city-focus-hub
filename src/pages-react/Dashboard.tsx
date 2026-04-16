import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { lazyLoadStripe, type Stripe, type StripeElements, type StripeCardNumberElement, type StripeCardExpiryElement, type StripeCardCvcElement } from '@/lib/stripe-loader';
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
  Phone,
  Receipt,
  Settings,
  User,
  Users,
  Wallet,
  X,
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
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { defaultSiteSettingsContent } from '@/data/siteContent';
import {
  cancelMemberMembership,
  cancelMemberMembershipAdjustment,
  cancelMemberScheduledDowngrade,
  cancelMemberBookingAdjustment,
  cancelMemberBookingPayment,
  cancelMemberBooking,
  changeMemberPassword,
  changeMemberPlan,
  confirmMemberBookingAdjustmentPayment,
  confirmMemberBookingPayment,
  confirmMemberMembershipPayment,
  confirmMemberMembershipUpgradePayment,
  createMemberBookingPaymentIntent,
  createMemberMembershipPaymentDraft,
  getMemberDashboard,
  listMemberResources,
  previewMemberPlanChange,
  syncMemberBookingAdjustmentCheckoutSession,
  syncMemberBookingCheckoutSession,
  syncMemberMembershipAdjustmentCheckoutSession,
  syncMemberMembershipCheckoutSession,
  updateMemberBooking,
  updateMemberProfile,
  type BookingPaymentDraft,
  type MemberBooking,
  type MemberDashboardPayload,
  type MemberMembership,
  type MemberResource,
  type MembershipPaymentDraft,
  type MembershipPlanChangePreview,
  type MembershipPlan,
  type MemberUser,
} from '@/lib/member-api';
import { downloadInvoicePdf } from '@/lib/generate-invoice-pdf';
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

type ProfileFormState = {
  name: string;
  email: string;
  phone: string;
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
            <a href="/" className="inline-flex items-center gap-3">
              <img src={footer.logoUrl} alt={defaultSiteSettingsContent.siteName} className="h-9 w-auto" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/65">Space to work, connect, focus.</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Services</h3>
            <div className="mt-5 space-y-3 text-sm text-white/80">
              {footer.serviceLinks.slice(0, 3).map((link) => (
                <a key={link.name} href={link.path} className="block transition-colors hover:text-white">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Company</h3>
            <div className="mt-5 space-y-3 text-sm text-white/80">
              <a href="/about" className="block transition-colors hover:text-white">About</a>
              <a href="/contact" className="block transition-colors hover:text-white">Contact</a>
              <a href="/terms" className="block transition-colors hover:text-white">Terms & Conditions</a>
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
            <a href="/privacy" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="/terms" className="transition-colors hover:text-white">Cookie Policy</a>
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
          <a href="/" className="flex items-center gap-3">
            <img src={navigation.logoUrl} alt={defaultSiteSettingsContent.siteName} className="h-9 w-auto" />
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navigation.links.map((link) => (
              <a key={link.path} href={link.path} className="text-sm font-medium text-black/65 transition-colors hover:text-black">
                {link.name}
              </a>
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
            <a key={link.path} href={link.path} className="whitespace-nowrap text-sm font-medium text-black/60 transition-colors hover:text-black">
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** Full-hour time options from 07:00 to 21:00 */
const BOOKING_HOUR_OPTIONS: string[] = [];
for (let hour = 7; hour <= 21; hour += 1) {
  BOOKING_HOUR_OPTIONS.push(`${String(hour).padStart(2, '0')}:00`);
}

type BookingHourSlotInfo = {
  time: string;
  label: string;
  available: boolean;
  isPast: boolean;
};

function formatBookingHourLabel(time: string) {
  const [hourStr] = time.split(':');
  const hour = Number(hourStr);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${period}`;
}

function formatBookingTimeRange(startTime: string, endHour: number) {
  const startLabel = formatBookingHourLabel(startTime);
  const endPeriod = endHour >= 12 ? 'PM' : 'AM';
  const endDisplay = endHour === 0 ? 12 : endHour > 12 ? endHour - 12 : endHour;
  return `${startLabel} - ${endDisplay}:00 ${endPeriod}`;
}

function formatBookingDateValue(value: Date) {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatBookingDateTimeValue(value: Date) {
  const date = formatBookingDateValue(value);
  const hours = `${value.getHours()}`.padStart(2, '0');
  const minutes = `${value.getMinutes()}`.padStart(2, '0');
  return `${date}T${hours}:${minutes}`;
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
  cancelLabel = 'Cancel',
  isSubmitting,
  booking,
  onCancelBooking,
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
  cancelLabel?: string;
  isSubmitting: boolean;
  booking?: MemberBooking | null;
  onCancelBooking?: (booking: MemberBooking) => Promise<void>;
}) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRefundLoading, setIsRefundLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [daySlotAvailability, setDaySlotAvailability] = useState<Map<string, boolean>>(new Map());
  const [isDaySlotsLoading, setIsDaySlotsLoading] = useState(false);
  const selectedResource = useMemo(
    () => resources.find((resource) => String(resource.id) === formState.resourceId) || null,
    [resources, formState.resourceId],
  );
  const isSelectedResourceUnavailable = !!formState.resourceId && selectedResource?.available === false;

  // When the dialog opens, derive date + hours from existing formState (for edit mode)
  useEffect(() => {
    if (!open) {
      setSelectedDate('');
      setSelectedHours([]);
      setDaySlotAvailability(new Map());
      setIsConfirming(false);
      return;
    }

    if (formState.startAt && formState.endAt) {
      const start = new Date(formState.startAt);
      const end = new Date(formState.endAt);

      if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) {
        setSelectedDate(formatBookingDateValue(start));

        const hours: string[] = [];
        const startHour = start.getHours();
        const endHour = end.getHours() || 24;
        for (let h = startHour; h < endHour; h++) {
          hours.push(`${String(h).padStart(2, '0')}:00`);
        }
        setSelectedHours(hours);
        return;
      }
    }

    // Default to today for create mode (only if a resource is already selected)
    if (formState.resourceId) {
      setSelectedDate(formatBookingDateValue(new Date()));
    }
    setSelectedHours([]);
  }, [open, formState.startAt, formState.endAt]);

  // Sync selected date + hours back to the parent form as startAt/endAt
  useEffect(() => {
    if (!open || !selectedDate) return;

    if (selectedHours.length === 0) {
      onChange('startAt', '');
      onChange('endAt', '');
      return;
    }

    const sorted = [...selectedHours].sort();
    const startAt = `${selectedDate}T${sorted[0]}`;
    const lastHour = Number(sorted[sorted.length - 1].split(':')[0]);
    const endDate = new Date(`${selectedDate}T${sorted[sorted.length - 1]}`);
    endDate.setHours(lastHour + 1, 0, 0, 0);
    const endAt = formatBookingDateTimeValue(endDate);

    onChange('startAt', startAt);
    onChange('endAt', endAt);
  }, [selectedDate, selectedHours, open]);

  // Fetch day slot availability when date or resource changes
  const fetchDaySlots = useCallback(async (dateStr: string, resourceId: string) => {
    setIsDaySlotsLoading(true);
    const newAvailability = new Map<string, boolean>();

    try {
      const checks = BOOKING_HOUR_OPTIONS.map(async (time) => {
        const slotStart = new Date(`${dateStr}T${time}`);
        const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);

        try {
          const resources = await listMemberResources({
            startAt: slotStart.toISOString(),
            endAt: slotEnd.toISOString(),
          });

          if (resourceId) {
            const match = resources.find((r) => String(r.id) === resourceId);
            newAvailability.set(time, match ? match.available !== false : false);
          } else {
            // No resource selected — check if ANY resource is available for this slot
            const anyAvailable = resources.some((r) => r.available !== false);
            newAvailability.set(time, anyAvailable);
          }
        } catch {
          newAvailability.set(time, false);
        }
      });

      await Promise.all(checks);
    } catch {
      // If all fail, assume all available
    }

    setDaySlotAvailability(newAvailability);
    setIsDaySlotsLoading(false);
  }, []);

  useEffect(() => {
    if (!open || !selectedDate) return;
    void fetchDaySlots(selectedDate, formState.resourceId);
  }, [open, selectedDate, formState.resourceId, fetchDaySlots]);

  useEffect(() => {
    if (!open) return;
    setSelectedHours([]);
    setDaySlotAvailability(new Map());
    // Auto-set date to today when resource is first selected (progressive disclosure)
    if (formState.resourceId && !selectedDate) {
      setSelectedDate(formatBookingDateValue(new Date()));
    }
  }, [formState.resourceId, open]);

  useEffect(() => {
    if (!selectedHours.length) return;

    const hasUnavailableSelection = selectedHours.some((time) => daySlotAvailability.get(time) === false);

    if (hasUnavailableSelection) {
      setSelectedHours([]);
    }
  }, [daySlotAvailability, selectedHours]);

  // Build hour slot list with availability
  const hourSlots = useMemo((): BookingHourSlotInfo[] => {
    const now = new Date();
    const todayStr = formatBookingDateValue(now);
    const isToday = selectedDate === todayStr;

    return BOOKING_HOUR_OPTIONS.map((time) => {
      const hour = Number(time.split(':')[0]);
      const isPast = isToday && hour <= now.getHours();
      const available = daySlotAvailability.get(time) ?? true;

      return {
        time,
        label: formatBookingHourLabel(time),
        available: !isPast && available,
        isPast,
      };
    });
  }, [selectedDate, daySlotAvailability]);

  // Handle clicking an hour slot: toggle, ensure selection stays consecutive
  const handleHourClick = useCallback((clickedTime: string, slotAvailable: boolean) => {
    if (!slotAvailable) return;

    setSelectedHours((prev) => {
      const isAlreadySelected = prev.includes(clickedTime);

      if (isAlreadySelected) {
        const remaining = prev.filter((t) => t !== clickedTime).sort();
        if (remaining.length === 0) return [];

        const contiguous: string[] = [remaining[0]];
        for (let i = 1; i < remaining.length; i++) {
          const prevHour = Number(remaining[i - 1].split(':')[0]);
          const currHour = Number(remaining[i].split(':')[0]);
          if (currHour === prevHour + 1) {
            contiguous.push(remaining[i]);
          } else {
            break;
          }
        }
        return contiguous;
      }

      if (prev.length === 0) {
        return [clickedTime];
      }

      const allHours = [...prev, clickedTime].sort();
      const clickedIndex = allHours.indexOf(clickedTime);

      let start = clickedIndex;
      let end = clickedIndex;

      while (start > 0) {
        const prevHour = Number(allHours[start - 1].split(':')[0]);
        const currHour = Number(allHours[start].split(':')[0]);
        if (currHour === prevHour + 1) {
          start--;
        } else {
          break;
        }
      }

      while (end < allHours.length - 1) {
        const currHour = Number(allHours[end].split(':')[0]);
        const nextHour = Number(allHours[end + 1].split(':')[0]);
        if (nextHour === currHour + 1) {
          end++;
        } else {
          break;
        }
      }

      return allHours.slice(start, end + 1);
    });
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(formatBookingDateValue(date));
    setSelectedHours([]);
  };

  const selectedCalendarDate = useMemo(() => {
    if (!selectedDate) return undefined;
    const [year, month, day] = selectedDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  }, [selectedDate]);

  const hasSelection = selectedHours.length > 0;
  const sortedSelection = [...selectedHours].sort();
  const lastSelectedHour = sortedSelection.length > 0 ? Number(sortedSelection[sortedSelection.length - 1].split(':')[0]) + 1 : 0;
  const durationLabel = hasSelection
    ? selectedHours.length === 1 ? '1 hour' : `${selectedHours.length} hours`
    : 'No hours selected';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[28px] border-black/10 bg-[#fbfaf8] p-0">
        {isConfirming && booking && onCancelBooking ? (
          <div className="p-6 sm:p-7">
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="text-[1.5rem] font-semibold tracking-tight text-black">Request a refund?</DialogTitle>
              <DialogDescription className="text-base text-black/50">
                Your booking for <strong>{booking.resourceName}</strong> on{' '}
                <strong>{formatDate(booking.startAt, { weekday: 'long', day: 'numeric', month: 'long' })}</strong>{' '}
                will be submitted for a full refund of{' '}
                <strong>{formatCurrency(booking.totalMinor, booking.currency)}</strong>.
                Our team will review and approve your request — you'll receive a confirmation email once processed.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="secondary"
                disabled={isRefundLoading}
                onClick={() => setIsConfirming(false)}
                className="h-11 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-[#f3f2ef]"
              >
                Keep booking
              </Button>
              <Button
                disabled={isRefundLoading}
                onClick={async () => {
                  setIsRefundLoading(true);
                  try {
                    await onCancelBooking(booking);
                    setIsConfirming(false);
                    onOpenChange(false);
                  } finally {
                    setIsRefundLoading(false);
                  }
                }}
                className="h-11 rounded-full bg-red-600 px-5 text-sm font-medium text-white hover:bg-red-700"
              >
                {isRefundLoading ? 'Submitting…' : 'Yes, request refund'}
              </Button>
            </div>
          </div>
        ) : (
        <div className="p-6 sm:p-7">
          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="text-[1.5rem] font-semibold tracking-tight text-black">{title}</DialogTitle>
            <DialogDescription className="text-base text-black/50">{description}</DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-5">
            {/* Resource selector */}
            <div className="space-y-2">
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
              {!formState.resourceId && (
                <p className="text-xs text-black/40">Select a room to see available dates and times.</p>
              )}
            </div>

            {/* Inline Calendar — only visible after resource is selected */}
            {formState.resourceId ? (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select a date</Label>
                <div className="rounded-2xl border border-black/10 bg-white p-2 sm:p-3">
                  <Calendar
                    mode="single"
                    size="large"
                    selected={selectedCalendarDate}
                    onSelect={handleDateSelect}
                    disabled={{ before: today }}
                    fromMonth={today}
                    className="w-full"
                  />
                </div>
              </div>
            ) : null}

            {/* Time Slots — only visible after resource AND date are selected */}
            {formState.resourceId && selectedDate ? (
              <>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Select your hours</Label>
                {isDaySlotsLoading ? (
                  <span className="flex items-center gap-2 text-xs text-black/50">
                    <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                    Checking...
                  </span>
                ) : (
                  <div className="flex items-center gap-3 text-xs text-black/60">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-100 border border-emerald-300" />
                      Available
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-100 border border-red-300" />
                      Booked
                    </span>
                  </div>
                )}
              </div>

              <p className="text-xs text-black/50">
                {formState.resourceId
                  ? 'Click hours to select them. You can pick multiple consecutive hours.'
                  : 'Showing general availability. Select a room to see exact room availability.'}
              </p>

              <div className="flex flex-col gap-1 rounded-2xl border border-black/10 bg-white p-2.5 sm:p-3 max-h-[280px] overflow-y-auto">
                {hourSlots.map((slot) => {
                  const isSelected = selectedHours.includes(slot.time);
                  const isUnavailable = !slot.available;

                  const sortedSel = [...selectedHours].sort();
                  const selIndex = sortedSel.indexOf(slot.time);
                  const isFirst = selIndex === 0;
                  const isLast = selIndex === sortedSel.length - 1;
                  const isOnly = sortedSel.length === 1 && isSelected;

                  let roundedClass = 'rounded-xl';
                  if (isSelected && !isOnly) {
                    if (isFirst) roundedClass = 'rounded-t-xl rounded-b-none';
                    else if (isLast) roundedClass = 'rounded-b-xl rounded-t-none';
                    else roundedClass = 'rounded-none';
                  }

                  const slotHour = Number(slot.time.split(':')[0]);
                  const endHour = slotHour + 1;
                  const endPeriod = endHour >= 12 ? 'PM' : 'AM';
                  const endDisplay = endHour === 0 ? 12 : endHour > 12 ? endHour - 12 : endHour;

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => handleHourClick(slot.time, slot.available)}
                      disabled={isUnavailable}
                      className={[
                        'group flex items-center justify-between px-3.5 py-3 text-left transition-all',
                        roundedClass,
                        isSelected
                          ? 'bg-black text-white shadow-sm'
                          : isUnavailable
                            ? 'cursor-not-allowed bg-red-50/60 text-red-300'
                            : 'bg-[#f6f5f2] text-black hover:bg-black/[0.06]',
                        isSelected && !isOnly && !isLast ? '-mb-1' : '',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={[
                            'flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all',
                            isSelected
                              ? 'border-white bg-white/20'
                              : isUnavailable
                                ? 'border-red-200 bg-red-50'
                                : 'border-black/15 group-hover:border-black/30',
                          ].join(' ')}
                        >
                          {isSelected ? (
                            <Check className="h-3.5 w-3.5 text-white" />
                          ) : isUnavailable ? (
                            <X className="h-3 w-3 text-red-300" />
                          ) : null}
                        </div>

                        <div>
                          <span className="text-sm font-semibold">
                            {slot.label}
                          </span>
                          <span className={[
                            'ml-1.5 text-xs',
                            isSelected ? 'text-white/60' : isUnavailable ? 'text-red-200' : 'text-black/40',
                          ].join(' ')}>
                            - {endDisplay}:00 {endPeriod}
                          </span>
                        </div>
                      </div>

                      <div>
                        {isUnavailable && !slot.isPast ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-medium text-red-500">
                            Booked
                          </span>
                        ) : isUnavailable && slot.isPast ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-300">
                            Past
                          </span>
                        ) : isSelected ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium text-white/80">
                            Selected
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                            Available
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {hasSelection ? (
                <div className="flex items-center justify-between rounded-xl bg-black/[0.04] px-3.5 py-2.5">
                  <span className="text-sm font-medium text-black/80">
                    {formatBookingTimeRange(sortedSelection[0], lastSelectedHour)} ({durationLabel})
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedHours([])}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Clear selection
                  </button>
                </div>
              ) : null}
              </>
            ) : null}

            {/* Purpose & Notes */}
            <div className="grid gap-4 sm:grid-cols-2">
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
                  className="min-h-[100px] rounded-2xl border-black/10 bg-white"
                  placeholder="Any setup or support notes"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 gap-3 sm:justify-end">
            {booking && onCancelBooking && booking.status === 'confirmed' && !booking.refundRequestStatus && (
              <Button
                variant="secondary"
                type="button"
                onClick={() => setIsConfirming(true)}
                className="h-11 rounded-full border border-red-200 bg-white px-5 text-sm font-medium text-red-600 hover:bg-red-50 sm:mr-auto"
              >
                Cancel &amp; request refund
              </Button>
            )}
            {booking?.refundRequestStatus === 'pending' && (
              <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 sm:mr-auto">
                ⏳ Refund pending admin approval
              </span>
            )}
            {booking?.refundRequestStatus === 'approved' && (
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 sm:mr-auto">
                ✓ Refund approved
              </span>
            )}
            {booking?.refundRequestStatus === 'rejected' && (
              <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 sm:mr-auto">
                ✕ Refund request declined
              </span>
            )}
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-[#f3f2ef]"
            >
              {cancelLabel}
            </Button>
            <Button
              onClick={onSubmit}
              disabled={isSubmitting || isDaySlotsLoading || !formState.resourceId || !hasSelection || isSelectedResourceUnavailable}
              className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
            >
              {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
              {submitLabel}
            </Button>
          </DialogFooter>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function BookingDetailsDialog({
  booking,
  open,
  onOpenChange,
  onEdit,
  onCancelBooking,
}: {
  booking: MemberBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (booking: MemberBooking) => void;
  onCancelBooking: (booking: MemberBooking) => Promise<void>;
}) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRefundLoading, setIsRefundLoading] = useState(false);

  // Reset confirmation view when dialog closes
  useEffect(() => {
    if (!open) setIsConfirming(false);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-[28px] border-black/10 bg-[#fbfaf8] p-0">
        {booking ? (
          isConfirming ? (
            <div className="p-6 sm:p-7">
              <DialogHeader className="space-y-3 text-left">
                <DialogTitle className="text-[1.5rem] font-semibold tracking-tight text-black">Request a refund?</DialogTitle>
                <DialogDescription className="text-base text-black/50">
                  Your booking for <strong>{booking.resourceName}</strong> on{' '}
                  <strong>{formatDate(booking.startAt, { weekday: 'long', day: 'numeric', month: 'long' })}</strong>{' '}
                  will be submitted for a full refund of{' '}
                  <strong>{formatCurrency(booking.totalMinor, booking.currency)}</strong>.
                  Our team will review and approve your request — you'll receive a confirmation email once processed.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="secondary"
                  disabled={isRefundLoading}
                  onClick={() => setIsConfirming(false)}
                  className="h-11 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-[#f3f2ef]"
                >
                  Keep booking
                </Button>
                <Button
                  disabled={isRefundLoading}
                  onClick={async () => {
                    setIsRefundLoading(true);
                    try {
                      await onCancelBooking(booking);
                      setIsConfirming(false);
                      onOpenChange(false);
                    } finally {
                      setIsRefundLoading(false);
                    }
                  }}
                  className="h-11 rounded-full bg-red-600 px-5 text-sm font-medium text-white hover:bg-red-700"
                >
                  {isRefundLoading ? 'Submitting…' : 'Yes, request refund'}
                </Button>
              </div>
            </div>
          ) : (
          <div className="p-6 sm:p-7">
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="text-[1.5rem] font-semibold tracking-tight text-black">{booking.resourceName}</DialogTitle>
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
                  {booking.refundRequestStatus && (
                    <p className="mt-1 text-sm text-black/50">
                      Refund: {booking.refundRequestStatus === 'pending' ? '⏳ Pending admin approval' : booking.refundRequestStatus === 'approved' ? '✓ Approved' : booking.refundRequestStatus === 'rejected' ? '✕ Declined' : booking.refundRequestStatus}
                    </p>
                  )}
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

            <DialogFooter className="mt-6 gap-3 sm:justify-start sm:flex-row-reverse">
              <Button
                onClick={() => onEdit(booking)}
                disabled={booking.status === 'canceled'}
                className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
              >
                Edit booking
              </Button>
              <Button
                variant="secondary"
                onClick={() => onOpenChange(false)}
                className="h-11 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-[#f3f2ef]"
              >
                Close
              </Button>
              {booking.status === 'confirmed' && !booking.refundRequestStatus && (
                <Button
                  variant="secondary"
                  onClick={() => setIsConfirming(true)}
                  className="h-11 rounded-full border border-red-200 bg-white px-5 text-sm font-medium text-red-600 hover:bg-red-50 sm:mr-auto"
                >
                  Cancel &amp; request refund
                </Button>
              )}
              {booking.refundRequestStatus === 'pending' && (
                <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 sm:mr-auto">
                  ⏳ Refund pending admin approval
                </span>
              )}
              {booking.refundRequestStatus === 'approved' && (
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 sm:mr-auto">
                  ✓ Refund approved
                </span>
              )}
              {booking.refundRequestStatus === 'rejected' && (
                <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 sm:mr-auto">
                  ✕ Refund request declined
                </span>
              )}
            </DialogFooter>
          </div>
          )
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
  const isDowngrade = preview ? preview.nextPlan.monthlyPriceMinor < preview.currentPlan.monthlyPriceMinor : false;
  const currency = preview?.settlement.currency || preview?.preview.currency || preview?.nextPlan.currency || 'gbp';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-[28px] border-black/10 bg-[#fbfaf8] p-0">
        {preview ? (
          <div className="p-6 sm:p-7">
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="text-[1.5rem] font-semibold tracking-tight text-black">
                {isDowngrade ? 'Confirm downgrade' : 'Confirm plan change'}
              </DialogTitle>
              <DialogDescription className="text-base text-black/50">
                {isDowngrade
                  ? `You'll keep your current plan benefits until the end of this billing period. Your plan then switches to ${preview.nextPlan.name} and you'll be billed the new rate.`
                  : 'The plan change takes effect immediately. Any extra amount is collected now.'}
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
                  {isDowngrade ? 'Charge today' : 'Charge today'}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-black">
                  {isDowngrade
                    ? '£0.00'
                    : immediateAmountMinor > 0
                      ? formatCurrency(immediateAmountMinor, currency)
                      : '£0.00'}
                </p>
                <p className="mt-2 text-sm text-black/50">
                  {isDowngrade
                    ? 'No charge or refund. You keep your current plan until the period ends.'
                    : immediateAmountMinor > 0
                      ? 'Prorated amount required before the upgrade is applied.'
                      : 'No extra charge right now. The change still updates recurring billing.'}
                </p>
              </div>

              <div className="rounded-[24px] border border-black/10 bg-white p-5">
                <p className="text-sm text-black/45">Recurring monthly</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-black">
                  {formatCurrency(preview.nextPlan.monthlyPriceMinor, preview.nextPlan.currency)}
                </p>
                <p className="mt-2 text-sm text-black/50">
                  {isDowngrade
                    ? `Starting ${formatDate(preview.preview.periodEnd)}.`
                    : 'Renewing monthly after the current billing period.'}
                </p>
              </div>
            </div>

            {!isDowngrade ? (
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
            ) : null}

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
                {isDowngrade
                  ? 'Schedule downgrade'
                  : immediateAmountMinor > 0 ? 'Pay and change plan' : 'Confirm plan change'}
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

    void lazyLoadStripe(publishableKey)
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

    // #114: Wrap confirmCardPayment in try/catch — network failures or unexpected
    // Stripe SDK errors can throw JS exceptions that the result.error path does not catch.
    let result: Awaited<ReturnType<typeof stripeRef.current.confirmCardPayment>>;
    try {
      result = await stripeRef.current.confirmCardPayment(paymentDraft?.clientSecret || '', {
        payment_method: {
          card: cardElement,
        },
      });
    } catch (err) {
      setElementError(err instanceof Error ? err.message : 'Payment could not be completed.');
      return;
    }

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
          <h2 className="mt-2 text-[1.5rem] font-semibold tracking-tight">Complete booking payment</h2>
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

function MembershipPaymentPanel({
  publishableKey,
  paymentDraft,
  isSubmitting,
  onConfirmPayment,
  onCancelPayment,
}: {
  publishableKey: string;
  paymentDraft: MembershipPaymentDraft | null;
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

    void lazyLoadStripe(publishableKey)
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

    // #114: Wrap confirmCardPayment in try/catch — network failures or unexpected
    // Stripe SDK errors can throw JS exceptions that the result.error path does not catch.
    let result: Awaited<ReturnType<typeof stripeRef.current.confirmCardPayment>>;
    try {
      result = await stripeRef.current.confirmCardPayment(paymentDraft?.clientSecret || '', {
        payment_method: {
          card: cardElement,
        },
      });
    } catch (err) {
      setElementError(err instanceof Error ? err.message : 'Payment could not be completed.');
      return;
    }

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

  if (!paymentDraft) {
    return null;
  }

  return (
    <DashboardCard>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-sm text-black/45">Payment required</p>
          <h2 className="mt-2 text-[1.5rem] font-semibold tracking-tight">Complete membership payment</h2>
          <p className="mt-3 max-w-2xl text-base text-black/50">
            Enter card details below to activate your membership without leaving the dashboard.
          </p>
        </div>
        <div className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
          {formatCurrency(paymentDraft.totalMinor, paymentDraft.currency)}
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xl font-semibold tracking-tight text-black">{paymentDraft.plan.name}</p>
            <p className="mt-2 text-sm text-black/50">
              {formatCurrency(paymentDraft.plan.monthlyPriceMinor, paymentDraft.plan.currency)} / month
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">Subtotal</p>
              <p className="mt-2 text-lg font-semibold text-black">{formatCurrency(paymentDraft.subtotalMinor, paymentDraft.currency)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">VAT</p>
              <p className="mt-2 text-lg font-semibold text-black">{formatCurrency(paymentDraft.taxMinor, paymentDraft.currency)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">Total</p>
              <p className="mt-2 text-lg font-semibold text-black">{formatCurrency(paymentDraft.totalMinor, paymentDraft.currency)}</p>
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

// #118: Shared hook to handle Stripe checkout return URLs — replaces 4 identical useEffect blocks.
// Each checkout flow has a different URL param, sync function, cancel handler, and success message.
function useCheckoutSync({
  user,
  location,
  navigate,
  paramName,
  syncFn,
  cancelMessage,
  onCancel,
  onSuccess,
  onSyncStart,
  onSyncEnd,
  onError,
}: {
  user: ReturnType<typeof useAuth>['user'];
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
  paramName: string;
  syncFn: (sessionId: string) => Promise<unknown>;
  cancelMessage: string;
  onCancel?: () => void;
  onSuccess: () => Promise<void>;
  onSyncStart: () => void;
  onSyncEnd: () => void;
  onError: (message: string) => void;
}) {
  useEffect(() => {
    if (!user) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const checkoutStatus = searchParams.get(paramName);
    const sessionId = searchParams.get('session_id');

    if (checkoutStatus === 'cancel') {
      onError(cancelMessage);
      onCancel?.();
      navigate(location.pathname, { replace: true });
      return;
    }

    if (checkoutStatus !== 'success' || !sessionId) {
      return;
    }

    let active = true;
    onSyncStart();
    onError('');

    void syncFn(sessionId)
      .then(async () => {
        if (!active) return;
        await onSuccess();
      })
      .catch((error) => {
        if (!active) return;
        onError(error instanceof Error ? error.message : `Failed to sync ${paramName} checkout session.`);
      })
      .finally(() => {
        if (!active) return;
        onSyncEnd();
        navigate(location.pathname, { replace: true });
      });

    return () => {
      active = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, navigate, user?.id]);
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
  const successRef = useRef<HTMLDivElement>(null);
  const paymentPanelRef = useRef<HTMLDivElement>(null);
  const skipNextSectionClear = useRef(false);
  const [selectedBooking, setSelectedBooking] = useState<MemberBooking | null>(null);
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);
  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [bookingPaymentDraft, setBookingPaymentDraft] = useState<BookingPaymentDraft | null>(null);
  const [membershipPaymentDraft, setMembershipPaymentDraft] = useState<MembershipPaymentDraft | null>(null);
  const [pendingUpgradeAdjustmentId, setPendingUpgradeAdjustmentId] = useState<number | null>(null);
  const [pendingBookingAdjustmentId, setPendingBookingAdjustmentId] = useState<number | null>(null);
  const [isPlanChangeOpen, setIsPlanChangeOpen] = useState(false);
  const [pendingPlanSlug, setPendingPlanSlug] = useState('');
  const [planChangePreview, setPlanChangePreview] = useState<MembershipPlanChangePreview | null>(null);
  const [isCheckoutSyncing, setIsCheckoutSyncing] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    name: '',
    email: '',
    phone: '',
  });
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
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

  // #81/#119: Scoped dashboard refresh — only replaces the domains that changed,
  // keeping stable object references for unchanged domains to avoid full re-render cascades.
  type DashboardScope = 'all' | 'bookings' | 'membership' | 'invoices' | 'profile';

  const refreshDashboard = async (scope: DashboardScope = 'all') => {
    if (!user) {
      return;
    }

    setIsLoading(true);
    setActionError('');

    try {
      const payload = await getMemberDashboard();

      setDashboardData((prev) => {
        if (!prev || scope === 'all') {
          return payload;
        }

        // Shallow-merge: only replace the domains indicated by `scope`,
        // preserving previous object references for unchanged data.
        switch (scope) {
          case 'bookings':
            return { ...prev, bookings: payload.bookings, resources: payload.resources, stats: payload.stats, invoices: payload.invoices };
          case 'membership':
            return { ...prev, membership: payload.membership, plans: payload.plans, stats: payload.stats, invoices: payload.invoices };
          case 'invoices':
            return { ...prev, invoices: payload.invoices };
          case 'profile':
            return { ...prev, user: payload.user };
          default:
            return payload;
        }
      });

      // Only reset profile form when profile data was refreshed
      if (scope === 'all' || scope === 'profile') {
        setProfileForm({
          name: payload.user.name || '',
          email: payload.user.email || '',
          phone: payload.user.phone || '',
        });
      }
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

  // #120: Depend on user.id (stable primitive) instead of the user object reference
  // to avoid spurious dashboard re-fetches on every render.
  useEffect(() => {
    void refreshDashboard();
  }, [user?.id]);

  // #118: Membership checkout return handler
  useCheckoutSync({
    user,
    location,
    navigate,
    paramName: 'checkout',
    syncFn: (sessionId) => syncMemberMembershipCheckoutSession(sessionId),
    cancelMessage: 'Stripe checkout was canceled before the membership was created.',
    onSuccess: async () => {
      await refreshDashboard('membership');
      skipNextSectionClear.current = true;
      navigate('/dashboard/billing');
      setSuccessMessage('Membership activated successfully.');
    },
    onSyncStart: () => setIsCheckoutSyncing(true),
    onSyncEnd: () => setIsCheckoutSyncing(false),
    onError: setActionError,
  });

  // #118: Membership upgrade checkout return handler
  useCheckoutSync({
    user,
    location,
    navigate,
    paramName: 'membership_adjustment',
    syncFn: (sessionId) => syncMemberMembershipAdjustmentCheckoutSession({ sessionId }),
    cancelMessage: 'Stripe checkout was canceled before the membership change was completed.',
    onCancel: () => {
      const adjustmentId = Number(new URLSearchParams(location.search).get('adjustment_id') || 0);
      if (adjustmentId) {
        void cancelMemberMembershipAdjustment({ adjustmentId }).catch(() => {});
      }
    },
    onSuccess: async () => {
      await refreshDashboard('membership');
      skipNextSectionClear.current = true;
      navigate('/dashboard/billing');
      setSuccessMessage('Membership upgraded and additional payment captured successfully.');
    },
    onSyncStart: () => setIsCheckoutSyncing(true),
    onSyncEnd: () => setIsCheckoutSyncing(false),
    onError: setActionError,
  });

  // #118: Booking adjustment checkout return handler
  useCheckoutSync({
    user,
    location,
    navigate,
    paramName: 'booking_adjustment',
    syncFn: (sessionId) => syncMemberBookingAdjustmentCheckoutSession({ sessionId }),
    cancelMessage: 'Stripe checkout was canceled before the booking update was completed.',
    onCancel: () => {
      const adjustmentId = Number(new URLSearchParams(location.search).get('adjustment_id') || 0);
      if (adjustmentId) {
        void cancelMemberBookingAdjustment({ adjustmentId }).catch(() => {});
      }
    },
    onSuccess: async () => {
      await refreshDashboard('bookings');
      skipNextSectionClear.current = true;
      navigate('/dashboard/bookings');
      setSuccessMessage('Booking updated and additional payment captured successfully.');
    },
    onSyncStart: () => setIsCheckoutSyncing(true),
    onSyncEnd: () => setIsCheckoutSyncing(false),
    onError: setActionError,
  });

  // #118: Booking checkout return handler
  useCheckoutSync({
    user,
    location,
    navigate,
    paramName: 'booking_checkout',
    syncFn: (sessionId) => syncMemberBookingCheckoutSession({ sessionId }),
    cancelMessage: 'Stripe checkout was canceled before the booking was completed.',
    onCancel: () => {
      const bookingId = Number(new URLSearchParams(location.search).get('booking_id') || 0);
      if (bookingId) {
        void cancelMemberBookingPayment({ bookingId }).catch(() => {});
      }
    },
    onSuccess: async () => {
      await refreshDashboard('bookings');
      skipNextSectionClear.current = true;
      navigate('/dashboard/bookings');
      setSuccessMessage('Booking created and paid successfully.');
    },
    onSyncStart: () => setIsCheckoutSyncing(true),
    onSyncEnd: () => setIsCheckoutSyncing(false),
    onError: setActionError,
  });

  useEffect(() => {
    if (isCreateBookingOpen || isEditBookingOpen) {
      void refreshAvailableResources(bookingForm.startAt, bookingForm.endAt);
    }
  }, [bookingForm.startAt, bookingForm.endAt, isCreateBookingOpen, isEditBookingOpen]);

  // #116: Only seed availableResources from dashboardData when no booking dialog is open
  // to avoid overwriting a fresh time-window-specific fetch with stale data.
  useEffect(() => {
    if (!isCreateBookingOpen && !isEditBookingOpen && dashboardData?.resources) {
      setAvailableResources(dashboardData.resources);
    }
  }, [dashboardData?.resources, isCreateBookingOpen, isEditBookingOpen]);

  // #117: Only close membership and details dialogs on error — do NOT close booking
  // create/edit dialogs since the user's form input would be lost. Booking errors
  // are shown inline in the dialog via the actionError banner.
  useEffect(() => {
    if (!actionError) {
      return;
    }

    setIsDetailsOpen(false);
    setIsPlanChangeOpen(false);
  }, [actionError]);

  // #115: Clear stale action messages when the user navigates between dashboard sections
  // (skip if we just navigated programmatically after a success action)
  useEffect(() => {
    if (skipNextSectionClear.current) {
      skipNextSectionClear.current = false;
      return;
    }
    setActionError('');
    setSuccessMessage('');
  }, [currentSection]);

  // Auto-scroll to top when success notification appears
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  }, [successMessage]);

  // Auto-scroll to payment panel when card form appears
  useEffect(() => {
    if ((membershipPaymentDraft || bookingPaymentDraft) && paymentPanelRef.current) {
      setTimeout(() => {
        paymentPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [membershipPaymentDraft, bookingPaymentDraft]);

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
    window.location.href = '/';
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

  const handleProfileFormChange = (field: keyof ProfileFormState, value: string) => {
    setProfileForm((current) => ({ ...current, [field]: value }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    if (!profileForm.name.trim()) {
      setActionError('Name is required.');
      return;
    }

    setIsProfileSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      await updateMemberProfile({
        name: profileForm.name.trim(),
        email: profileForm.email.trim(),
        phone: profileForm.phone.trim(),
      });
      await refreshDashboard('profile');
      setIsProfileEditing(false);
      setSuccessMessage('Profile updated successfully.');
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to update profile.');
    } finally {
      setIsProfileSaving(false);
    }
  };

  const handleCancelProfileEdit = () => {
    setProfileForm({
      name: dashboardData?.user.name || user?.name || '',
      email: dashboardData?.user.email || user?.email || '',
      phone: dashboardData?.user.phone || '',
    });
    setIsProfileEditing(false);
    setActionError('');
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

      const paymentDraft = await createMemberBookingPaymentIntent({
        resourceId: Number(bookingForm.resourceId),
        bookingType: bookingDraftResource?.type || 'meeting_room',
        startAt: new Date(bookingForm.startAt).toISOString(),
        endAt: new Date(bookingForm.endAt).toISOString(),
        purpose: bookingForm.purpose,
        notes: bookingForm.notes,
      });

      if (!paymentDraft.booking || !paymentDraft.clientSecret) {
        await refreshDashboard('bookings');
        setIsCreateBookingOpen(false);
        skipNextSectionClear.current = true;
        navigate('/dashboard/bookings');
        setSuccessMessage('Booking created and paid successfully.');
        return;
      }

      setBookingPaymentDraft(paymentDraft);
      setIsCreateBookingOpen(false);
      navigate('/dashboard/bookings');
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
      if (pendingBookingAdjustmentId) {
        // Booking adjustment (edit) payment confirmation
        await confirmMemberBookingAdjustmentPayment(paymentIntentId, pendingBookingAdjustmentId);
        setBookingPaymentDraft(null);
        setPendingBookingAdjustmentId(null);
        await refreshDashboard('bookings');
        skipNextSectionClear.current = true;
        navigate('/dashboard/bookings');
        setSuccessMessage('Booking updated and payment completed successfully.');
      } else {
        // New booking payment confirmation
        await confirmMemberBookingPayment({
          bookingId: bookingPaymentDraft.booking.id,
          paymentIntentId,
        });
        setBookingPaymentDraft(null);
        await refreshDashboard('bookings');
        skipNextSectionClear.current = true;
        navigate('/dashboard/bookings');
        setSuccessMessage('Booking created and paid successfully.');
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to finalize booking payment.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelBookingPayment = async () => {
    if (!user || !bookingPaymentDraft?.booking?.id) {
      setBookingPaymentDraft(null);
      setPendingBookingAdjustmentId(null);
      return;
    }

    try {
      if (pendingBookingAdjustmentId) {
        // Cancel the booking adjustment (which also cancels the PaymentIntent on the backend)
        await cancelMemberBookingAdjustment({ adjustmentId: pendingBookingAdjustmentId });
      } else {
        // Cancel a new booking payment
        await cancelMemberBookingPayment({
          bookingId: bookingPaymentDraft.booking.id,
        });
      }
    } catch {
      // Ignore cancellation failures to avoid trapping the user in the modal.
    }

    setBookingPaymentDraft(null);
    setPendingBookingAdjustmentId(null);
    await refreshDashboard('bookings');
  };

  const handleConfirmMembershipPayment = async (paymentIntentId: string) => {
    if (!user) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      if (pendingUpgradeAdjustmentId) {
        // Upgrade payment confirmation
        await confirmMemberMembershipUpgradePayment(paymentIntentId, pendingUpgradeAdjustmentId);
        setMembershipPaymentDraft(null);
        setPendingUpgradeAdjustmentId(null);
        setPlanChangePreview(null);
        setPendingPlanSlug('');
        await refreshDashboard('membership');
        skipNextSectionClear.current = true;
        navigate('/dashboard/billing');
        setSuccessMessage('Plan upgraded and payment completed successfully.');
      } else {
        // New membership payment confirmation
        await confirmMemberMembershipPayment(paymentIntentId);
        setMembershipPaymentDraft(null);
        await refreshDashboard('membership');
        skipNextSectionClear.current = true;
        navigate('/dashboard/billing');
        setSuccessMessage('Membership activated successfully.');
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to finalize membership payment.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelMembershipPayment = () => {
    setMembershipPaymentDraft(null);
    setPendingUpgradeAdjustmentId(null);
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
      });

      if (result.action === 'payment_required' && result.clientSecret && result.paymentIntentId) {
        // Show in-page payment panel for the booking adjustment
        setIsEditBookingOpen(false);
        setBookingPaymentDraft({
          booking: result.booking,
          clientSecret: result.clientSecret,
          paymentIntentId: result.paymentIntentId,
        });
        setPendingBookingAdjustmentId(result.adjustmentId);
        navigate('/dashboard/bookings');
        return;
      }

      await refreshDashboard('bookings');
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
        // NEW MEMBERSHIP: create payment draft and show in-page card form
        const draft = await createMemberMembershipPaymentDraft(plan.slug);
        setMembershipPaymentDraft(draft);
        setPendingUpgradeAdjustmentId(null);
        return;
      } else {
        // PLAN CHANGE: preview, then open confirmation dialog
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
      const result = await changeMemberPlan(pendingPlanSlug);

      if (result.action === 'payment_required' && result.clientSecret && result.paymentIntentId) {
        // Upgrade requires payment: show in-page card form
        setIsPlanChangeOpen(false);
        setMembershipPaymentDraft({
          clientSecret: result.clientSecret,
          paymentIntentId: result.paymentIntentId,
          subscriptionId: '',
          membershipId: result.membership?.id || 0,
          plan: planChangePreview.nextPlan,
          subtotalMinor: result.subtotalMinor || planChangePreview.settlement.subtotalMinor,
          taxMinor: result.taxMinor || planChangePreview.settlement.taxMinor,
          totalMinor: result.paymentDueMinor,
          currency: result.currency || planChangePreview.settlement.currency,
        });
        setPendingUpgradeAdjustmentId(result.adjustmentId);
        return;
      }

      // No payment needed (downgrade scheduled / no-cost switch)
      await refreshDashboard('membership');
      setIsPlanChangeOpen(false);
      setPlanChangePreview(null);
      setPendingPlanSlug('');
      skipNextSectionClear.current = true;
      navigate('/dashboard/billing');

      if (result.action === 'scheduled') {
        const effectiveDate = result.effectiveDate ? formatDate(result.effectiveDate) : 'the end of your billing period';
        setSuccessMessage(
          `Your plan will change to ${result.scheduledPlanName || planChangePreview.nextPlan.name} on ${effectiveDate}. You keep your current plan benefits until then.`,
        );
      } else {
        const todayAmount = result.paymentDueMinor;
        const settlementCurrency = planChangePreview.settlement.currency || planChangePreview.preview.currency;
        setSuccessMessage(
          todayAmount > 0
            ? `Plan changed. Stripe charged ${formatCurrency(todayAmount, settlementCurrency)} today and recurring billing stays active.`
            : `Plan changed. Recurring billing is now set to ${formatCurrency(planChangePreview.nextPlan.monthlyPriceMinor, planChangePreview.nextPlan.currency)} per month.`,
        );
      }
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

    if (!window.confirm('Are you sure you want to cancel your membership at the end of the current billing period?')) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      await cancelMemberMembership();
      await refreshDashboard('membership');
      setSuccessMessage('Membership will cancel at the end of the current billing period.');
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to cancel membership.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelScheduledDowngrade = async () => {
    if (!user) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      await cancelMemberScheduledDowngrade();
      await refreshDashboard('membership');
      setSuccessMessage('Scheduled plan change has been cancelled. You will stay on your current plan.');
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to cancel scheduled downgrade.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelBooking = async (booking: MemberBooking) => {
    setActionError('');
    setSuccessMessage('');
    try {
      await cancelMemberBooking({ bookingId: booking.id });
      await refreshDashboard('bookings');
      setSuccessMessage('Your refund request has been submitted. Our team will review it and process your refund shortly — you\'ll receive a confirmation email once approved.');
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to submit refund request.');
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
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[2rem]">Welcome back, {firstName}</h1>
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
            <h2 className="text-[1.5rem] font-semibold tracking-tight">Upcoming bookings</h2>
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
            <h2 className="text-[1.5rem] font-semibold tracking-tight">Membership details</h2>
            <span className="inline-flex rounded-full bg-black px-3 py-1.5 text-xs font-semibold capitalize text-white">
              {membership?.status || 'inactive'}
            </span>
          </div>

          {membership ? (
            <>
              <div className="mt-5 rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
                <h3 className="text-xl font-semibold tracking-tight">{membership.planName}</h3>
                <p className="mt-2 text-sm text-black/45">
                  Current period ends {formatDate(membership.currentPeriodEnd)}
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-black/45">Monthly fee</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">
                      {formatCurrency(membership.monthlyPriceMinor, membership.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-black/45">Next billing date</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">{formatDate(membership.currentPeriodEnd)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
                <h3 className="text-xl font-semibold tracking-tight">Benefits</h3>
                <div className="mt-5 space-y-4">
                  {(plans.find((plan) => plan.slug === membership.planSlug)?.features || []).map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3 text-base text-black/75">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                        <Check size={14} />
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="mt-5 rounded-[24px] border border-dashed border-black/15 bg-[#fcfcfb] p-6 text-center">
              <p className="text-lg font-semibold text-black/80">No active membership</p>
              <p className="mt-2 text-sm text-black/50">
                Choose a plan from the billing page to unlock meeting room credits, dedicated desks, and more.
              </p>
              <Button
                onClick={() => navigate('/dashboard/billing')}
                className="mt-4 h-10 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
              >
                View plans
              </Button>
            </div>
          )}
        </DashboardCard>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <DashboardCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-black/45">My bookings</p>
            <span className="text-sm text-black/20">/</span>
            <h1 className="text-sm font-semibold">Booking engine</h1>
          </div>
          <Button onClick={openCreateBookingDialog} className="h-8 rounded-full bg-black px-4 text-xs font-medium text-white hover:bg-black/90">
            New booking
          </Button>
        </div>
      </DashboardCard>

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
              <p className="mt-6 text-[1.5rem] font-semibold leading-none tracking-tight">{value}</p>
              <p className="mt-3 text-base text-black/50">{label}</p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[1.5rem] font-semibold tracking-tight">Confirmed reservations</h2>
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
                  {booking.refundRequestStatus === 'pending' && (
                    <span className="mt-2 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                      Refund pending approval
                    </span>
                  )}
                  {booking.refundRequestStatus === 'approved' && (
                    <span className="mt-2 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      Refund approved
                    </span>
                  )}
                  {booking.refundRequestStatus === 'rejected' && (
                    <span className="mt-2 inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
                      Refund request declined
                    </span>
                  )}
                  {booking.status === 'canceled' && !booking.refundRequestStatus && (
                    <span className="mt-2 inline-flex items-center rounded-full border border-black/10 bg-[#f3f2ef] px-2.5 py-0.5 text-xs font-medium text-black/50">
                      Canceled
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {booking.status !== 'canceled' && !booking.refundRequestStatus ? (
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
        <div className="flex items-center gap-2">
          <p className="text-sm text-black/45">Billing</p>
          <span className="text-sm text-black/20">/</span>
          <h1 className="text-sm font-semibold">Membership lifecycle</h1>
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => {
            const isCurrentPlan = membership?.planSlug === plan.slug;
            const isScheduledPlan = membership?.scheduledPlanSlug === plan.slug;
            return (
              <div key={plan.slug} className={cn('rounded-[24px] border p-5', isCurrentPlan ? 'border-black bg-[#f7f7f6]' : isScheduledPlan ? 'border-blue-400 bg-blue-50/50' : 'border-black/10 bg-white')}>
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
                    disabled={isSaving || isCurrentPlan || isScheduledPlan}
                    onClick={() => handleMembershipAction(plan)}
                    className="h-11 flex-1 rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
                  >
                    {isCurrentPlan ? 'Current plan' : isScheduledPlan ? 'Switching soon' : membership ? 'Change plan' : 'Get started'}
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
            <h2 className="text-[1.5rem] font-semibold tracking-tight">Active subscription</h2>
            <p className="mt-2 text-sm text-black/50">
              {membership
                ? `${membership.planName} • ${membership.status} • renews ${formatDate(membership.currentPeriodEnd)}`
                : 'No active subscription yet.'}
            </p>
          </div>
          {membership ? (
            membership.cancelAtPeriodEnd ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Membership cancelled — your access remains active until {formatDate(membership.currentPeriodEnd)}.
              </div>
            ) : (
              <Button
                disabled={isSaving}
                onClick={handleCancelMembership}
                variant="secondary"
                className="h-11 rounded-full border border-black/10 bg-[#f3f2ef] px-5 text-sm font-medium text-black hover:bg-[#eceae6]"
              >
                Cancel subscription
              </Button>
            )
          ) : null}
        </div>
      </DashboardCard>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <DashboardCard>
        <div className="flex items-center gap-2">
          <p className="text-sm text-black/45">Invoices</p>
          <span className="text-sm text-black/20">/</span>
          <h1 className="text-sm font-semibold">Invoice center</h1>
        </div>
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
                    <button
                      type="button"
                      onClick={() => downloadInvoicePdf(invoice, user?.name || '')}
                      className="inline-flex h-10 items-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-black hover:bg-[#f3f2ef]"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </button>
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
        <div className="flex items-center gap-2">
          <p className="text-sm text-black/45">Profile</p>
          <span className="text-sm text-black/20">/</span>
          <h1 className="text-sm font-semibold">Member profile</h1>
        </div>
      </DashboardCard>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <DashboardCard>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f2f1ee] text-xl font-semibold">
                {user?.initials}
              </div>
              <div>
                <h2 className="text-[1.5rem] font-semibold tracking-tight">{dashboardData?.user.name || user?.name}</h2>
                <p className="text-base capitalize text-black/45">{dashboardData?.user.accessStatus || user?.accessStatus || 'active'}</p>
              </div>
            </div>
            {!isProfileEditing && (
              <Button
                onClick={() => setIsProfileEditing(true)}
                variant="outline"
                className="h-10 rounded-full border-black/10 px-4 text-sm font-medium"
              >
                Edit
              </Button>
            )}
          </div>

          {isProfileEditing ? (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Name</Label>
                <Input
                  id="profile-name"
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => handleProfileFormChange('name', e.target.value)}
                  className="h-11 rounded-2xl border-black/10 bg-white"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => handleProfileFormChange('email', e.target.value)}
                  className="h-11 rounded-2xl border-black/10 bg-white"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-phone">Phone</Label>
                <Input
                  id="profile-phone"
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => handleProfileFormChange('phone', e.target.value)}
                  className="h-11 rounded-2xl border-black/10 bg-white"
                  placeholder="+44 20 1234 5678"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  onClick={handleCancelProfileEdit}
                  variant="outline"
                  disabled={isProfileSaving}
                  className="h-10 rounded-full border-black/10 px-5 text-sm font-medium"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveProfile}
                  disabled={isProfileSaving}
                  className="h-10 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
                >
                  {isProfileSaving ? <LoaderCircle className="mr-2 animate-spin" size={16} /> : null}
                  Save changes
                </Button>
              </div>
            </div>
          ) : (
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
                  <p className="text-base font-medium text-black">{dashboardData?.user.phone || 'Not set'}</p>
                </div>
              </div>
            </div>
          )}
        </DashboardCard>

        <DashboardCard>
          <h2 className="text-[1.5rem] font-semibold tracking-tight">Account state</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <p className="text-sm text-black/45">Member access</p>
              <p className="mt-2 text-xl font-semibold tracking-tight capitalize">{dashboardData?.user.accessStatus || user?.accessStatus || 'active'}</p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <p className="text-sm text-black/45">Subscription status</p>
              <p className="mt-2 text-xl font-semibold tracking-tight capitalize">{membership?.status || 'inactive'}</p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <p className="text-sm text-black/45">Current plan</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">{membership?.planName || 'No active plan'}</p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-[#fcfcfb] p-5">
              <p className="text-sm text-black/45">Member since</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">{dashboardData?.user ? formatDate(String((dashboardData.user as unknown as Record<string, unknown>).createdAt || '')) : '—'}</p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <DashboardCard>
        <div className="flex items-center gap-2">
          <p className="text-sm text-black/45">Settings</p>
          <span className="text-sm text-black/20">/</span>
          <h1 className="text-sm font-semibold">Account settings</h1>
        </div>
      </DashboardCard>

      <DashboardCard className="max-w-3xl">
        <h2 className="text-[1.5rem] font-semibold tracking-tight">Change password</h2>
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
          <div ref={successRef} className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-700">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">{successMessage}</p>
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
            <aside className="rounded-[30px] border border-black/10 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-7rem)] lg:flex-col lg:overflow-y-auto">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f2f1ee] text-sm font-semibold">
                  {user?.initials}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold leading-tight tracking-tight">{firstName}&apos;s Workspace</h2>
                  <p className="truncate text-xs text-black/45">{membership?.planName || 'No active membership'}</p>
                </div>
              </div>

              <div className="my-4 border-t border-black/10" />

              <nav className="space-y-1">
                {dashboardNavItems.map(({ icon: Icon, label, path }) => {
                  const isActive = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));

                  return (
                    <Link
                      key={path}
                      to={path}
                      className={cn(
                        'flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
                        isActive ? 'bg-black text-white' : 'text-black/70 hover:bg-[#f3f2ef] hover:text-black',
                      )}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45">Quick Actions</p>
                <div className="mt-2 space-y-2">
                  <Button
                    onClick={openCreateBookingDialog}
                    variant="secondary"
                    className="h-9 w-full justify-start rounded-2xl border border-black/10 bg-[#f3f2ef] px-4 text-sm font-medium text-black hover:bg-[#eceae6]"
                  >
                    <CalendarDays className="mr-2" size={15} />
                    Book meeting room
                  </Button>
                </div>
              </div>

              <div className="mt-auto">
                <div className="my-4 border-t border-black/10" />

                <div className="space-y-1">
                  <Button
                    onClick={() => navigate('/dashboard/settings')}
                    variant="ghost"
                    className="h-9 w-full justify-start rounded-2xl px-4 text-sm text-black/70 hover:bg-[#f3f2ef] hover:text-black"
                  >
                    <Settings className="mr-2" size={15} />
                    Settings
                  </Button>
                  <Button
                    onClick={logoutAndLeave}
                    variant="ghost"
                    className="h-9 w-full justify-start rounded-2xl px-4 text-sm text-black/70 hover:bg-[#f3f2ef] hover:text-black"
                  >
                    <LogOut className="mr-2" size={15} />
                    Logout
                  </Button>
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              {bookingPaymentDraft ? (
                <div ref={paymentPanelRef}>
                  <BookingPaymentPanel
                    publishableKey={dashboardData?.stripe.publishableKey || ''}
                    paymentDraft={bookingPaymentDraft}
                    isSubmitting={isSaving}
                    onConfirmPayment={handleConfirmBookingPayment}
                    onCancelPayment={handleCancelBookingPayment}
                  />
                </div>
              ) : null}
              {membershipPaymentDraft ? (
                <div ref={paymentPanelRef}>
                  <MembershipPaymentPanel
                    publishableKey={dashboardData?.stripe.publishableKey || ''}
                    paymentDraft={membershipPaymentDraft}
                    isSubmitting={isSaving}
                    onConfirmPayment={handleConfirmMembershipPayment}
                    onCancelPayment={handleCancelMembershipPayment}
                  />
                </div>
              ) : null}
              {renderCurrentSection()}
            </div>
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
        cancelLabel="Cancel"
        isSubmitting={isSaving}
        booking={selectedBooking}
        onCancelBooking={handleCancelBooking}
      />

      <BookingDetailsDialog
        booking={selectedBooking}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onEdit={openEditBookingDialog}
        onCancelBooking={handleCancelBooking}
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
