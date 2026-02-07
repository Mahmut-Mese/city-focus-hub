import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const serviceLinks = [
  { name: 'Coworking Space', path: '/pricing' },
  { name: 'Meeting Rooms', path: '/meeting-rooms' },
  { name: 'Virtual Office', path: '/virtual-office' },
  { name: 'Private Office', path: '/virtual-office' },
];

const companyLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-charcoal font-serif font-bold text-xl">C</span>
              </div>
              <span className="font-serif font-semibold text-lg">CoworkingHub</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium coworking spaces designed for productivity, collaboration, and growth. 
              Join our community of innovators and entrepreneurs.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Business District<br />
                  City Center, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400 flex-shrink-0" />
                <a href="mailto:hello@coworkinghub.com" className="text-gray-400 text-sm hover:text-white transition-colors">
                  hello@coworkinghub.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gray-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 text-sm hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 CoworkingHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
