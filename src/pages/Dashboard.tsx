import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  CreditCard, 
  FileText, 
  User, 
  Plus,
  ArrowRight,
  Download,
  Calendar,
  Briefcase,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSeo } from '@/lib/seo';
import { defaultSiteSettingsContent } from '@/data/siteContent';
import { 
  dashboardUser, 
  dashboardStats, 
  upcomingBookings, 
  recentInvoices 
} from '@/data/mockData';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: CalendarDays, label: 'My Bookings', path: '/dashboard/bookings' },
  { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: FileText, label: 'Invoices', path: '/dashboard/invoices' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
];

export default function Dashboard() {
  const location = useLocation();

  useSeo({
    siteName: defaultSiteSettingsContent.siteName,
    title: 'Dashboard',
    description: 'Manage bookings, billing, invoices, and your workspace profile.',
    noindex: true,
  });

  return (
    <div className="min-h-screen bg-secondary">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r border-border p-6 hidden lg:block">
          {/* User Info */}
          <div className="mb-8">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
              <span className="text-2xl font-sans font-bold text-primary-foreground">
                {dashboardUser.initials}
              </span>
            </div>
            <h2 className="font-sans text-lg font-semibold">{dashboardUser.name}'s Workspace</h2>
            <span className="chip text-xs mt-2">{dashboardUser.plan}</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mb-8">
            {navItems.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button className="btn-pill-primary w-full justify-start" size="sm">
                <Plus size={16} className="mr-2" />
                Book a Room
              </Button>
              <Button className="btn-pill-secondary w-full justify-start" size="sm">
                <CreditCard size={16} className="mr-2" />
                Upgrade Plan
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-sans text-2xl md:text-3xl font-bold">
                Welcome back, {dashboardUser.name}
              </h1>
              <p className="text-muted-foreground">Here's what's happening with your workspace</p>
            </div>
            <div className="flex gap-3">
              <Button className="btn-pill-secondary" size="sm">
                <CalendarDays size={16} className="mr-2" />
                Book a room
              </Button>
              <Button className="btn-pill-primary" size="sm">
                View membership
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="card-elevated p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Calendar size={18} className="text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Days checked in</span>
              </div>
              <p className="text-3xl font-bold">{dashboardStats.daysCheckedIn}</p>
            </div>
            <div className="card-elevated p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Briefcase size={18} className="text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Meeting room bookings</span>
              </div>
              <p className="text-3xl font-bold">{dashboardStats.meetingRoomBookings}</p>
            </div>
            <div className="card-elevated p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <CreditCard size={18} className="text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Current membership</span>
              </div>
              <p className="text-3xl font-bold">£{dashboardStats.currentMembership}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Bookings */}
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-sans text-xl font-semibold">Upcoming Bookings</h2>
                <Link to="/dashboard/bookings" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.room}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {booking.time}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Membership Details */}
            <div className="card-elevated p-6">
              <h2 className="font-sans text-xl font-semibold mb-6">Membership Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">{dashboardUser.plan}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Active since</span>
                  <span className="font-medium">
                    {new Date(dashboardUser.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Monthly fee</span>
                  <span className="font-medium">£{dashboardUser.monthlyFee}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Next billing</span>
                  <span className="font-medium">
                    {new Date(dashboardUser.nextBilling).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Payment method</span>
                  <span className="font-medium">{dashboardUser.paymentMethod.type} •••• {dashboardUser.paymentMethod.last4}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {dashboardUser.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="btn-pill-primary flex-1">Upgrade plan</Button>
                <Button className="btn-pill-secondary flex-1">Manage billing</Button>
              </div>
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="card-elevated p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-sans text-xl font-semibold">Recent Invoices</h2>
              <Link to="/dashboard/invoices" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold">Invoice</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 text-sm font-medium">{invoice.id}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-4 text-sm">£{invoice.amount}</td>
                      <td className="py-3 px-4">
                        <span className="chip text-xs bg-green-100 text-green-700">{invoice.status}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          <Download size={16} className="mr-1" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
