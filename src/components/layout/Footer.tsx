import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const serviceLinks = [
  { name: 'Memberships', path: '/pricing' },
  { name: 'Meeting Room', path: '/meeting-rooms' },
  { name: 'Virtual Office', path: '/virtual-office' },
  { name: 'Private Office', path: '/virtual-office' },
];

const aboutLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Our Space', path: '/' },
  { name: 'Testimonials', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Twitter, href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-[#15161b] text-white">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img src="/logo-white.svg" alt="The Leadenhall Works" className="h-12 w-auto" />
            </Link>
            <p className="text-[13px] leading-relaxed text-white/65 mb-4 max-w-[19rem]">
              Flexible coworking spaces in the heart of the city built for focus, meetings, and meaningful connections.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="inline-flex w-7 h-7 rounded-full border border-white/20 items-center justify-center text-white/75 hover:text-white hover:border-white/35"
                  aria-label="Social link"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-[13px] text-white/65 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-4">About</h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-[13px] text-white/65 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-[13px] text-white/65">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>123 Business Street, City Center</span>
              </li>
              <li className="flex items-start gap-2.5 text-[13px] text-white/65">
                <Mail size={14} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:info@coworkinghub.com" className="hover:text-white">info@coworkinghub.com</a>
              </li>
              <li className="flex items-start gap-2.5 text-[13px] text-white/65">
                <Phone size={14} className="mt-0.5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[13px] text-white/50">© 2026 Coworking Hub. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-[13px] text-white/50 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-[13px] text-white/50 hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
