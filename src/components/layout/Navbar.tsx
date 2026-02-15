import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Memberships', path: '/pricing' },
  { name: 'Meeting Room', path: '/meeting-rooms' },
  { name: 'Private Office', path: '/virtual-office' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="The Leadenhall Works" className="h-8 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
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

          <div className="hidden md:flex items-center">
            <Link to="/contact">
              <Button className="h-8 rounded-full px-4 text-[11px] bg-black text-white hover:bg-black/90">Book a Tour</Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-3 border-t border-black/10 bg-white">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
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
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button className="h-9 rounded-full px-4 text-xs bg-black text-white hover:bg-black/90 w-full">Book a Tour</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
