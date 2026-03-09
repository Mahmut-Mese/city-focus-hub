import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, UserRound, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useSiteSettings } from '@/hooks/useCmsContent';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { data: siteSettings } = useSiteSettings();
  const { user, isAuthenticated, logout } = useAuth();

  if (!siteSettings) {
    return null;
  }

  const { navigation } = siteSettings;
  const authButton = isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 bg-[#f7f7f6] px-3 text-sm font-medium text-black transition-colors hover:bg-[#efefec]"
          aria-label="Open user menu"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
            {user?.initials}
          </span>
          <span className="hidden sm:inline">{user?.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-2xl border-black/10 p-2">
        <DropdownMenuLabel className="px-3 py-2">
          <p className="text-sm font-semibold text-black">{user?.name}</p>
          <p className="mt-1 text-xs font-normal text-black/50">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5">
          <Link to="/dashboard">
            <LayoutDashboard className="mr-2" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => logout()}
          className="rounded-xl px-3 py-2.5 text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link
      to="/auth"
      aria-label="Login or register"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#f7f7f6] text-black transition-colors hover:bg-[#efefec]"
    >
      <UserRound size={18} />
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={navigation.logoUrl} alt={siteSettings.siteName} className="h-12 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navigation.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-[16px] transition-colors hover:text-black',
                  location.pathname === link.path ? 'text-black font-medium' : 'text-black/60'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to={navigation.ctaPath}>
              <Button className="h-8 rounded-full px-4 text-[11px] bg-black text-white hover:bg-black/90">{navigation.ctaLabel}</Button>
            </Link>
            {authButton}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {authButton}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-3 border-t border-black/10 bg-white">
            <div className="flex flex-col gap-3">
              {navigation.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-sm py-1.5 transition-colors hover:text-black',
                    location.pathname === link.path ? 'text-black font-medium' : 'text-black/70'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to={navigation.ctaPath} onClick={() => setIsOpen(false)}>
                <Button className="h-9 rounded-full px-4 text-xs bg-black text-white hover:bg-black/90 w-full">{navigation.ctaLabel}</Button>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="secondary" className="h-9 rounded-full px-4 text-xs w-full border border-black/10 bg-[#f3f2ef] text-black hover:bg-[#eceae6]">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="h-9 rounded-full px-4 text-xs w-full text-black"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="secondary" className="h-9 rounded-full px-4 text-xs w-full border border-black/10 bg-[#f3f2ef] text-black hover:bg-[#eceae6]">
                    Login / Register
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
