import { Mail, MapPin, Phone } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useCmsContent';
import { socialIconMap } from '@/lib/site-icons';

function resolveFooterLink(path: string, name: string) {
  const normalizedName = name.trim().toLowerCase();

  if (normalizedName.includes('our space')) {
    return '/#our-space';
  }

  return path;
}

export function FooterAstro() {
  const { data: siteSettings } = useSiteSettings();

  if (!siteSettings) {
    return null;
  }

  const { footer, socialLinks } = siteSettings;

  return (
    <footer className="bg-[#15161b] text-white">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="/" className="inline-flex items-center gap-2 mb-4">
              <img src={footer.logoUrl} alt={siteSettings.siteName} className="h-12 w-auto" />
            </a>
            <p className="text-[13px] leading-relaxed text-white/65 mb-4 max-w-[19rem]">
              {footer.description}
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon, href, label }) => {
                const Icon = socialIconMap[icon];
                if (!Icon) {
                  return null;
                }

                return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-7 h-7 rounded-full border border-white/20 items-center justify-center text-white/75 hover:text-white hover:border-white/35"
                  aria-label={label}
                >
                  <Icon size={13} />
                </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footer.serviceLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="text-[13px] text-white/65 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-4">About</h4>
            <ul className="space-y-2.5">
              {footer.aboutLinks.map((link) => (
                <li key={link.name}>
                  <a href={resolveFooterLink(link.path, link.name)} className="text-[13px] text-white/65 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-4">{footer.contactTitle}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-[13px] text-white/65">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>{siteSettings.address}</span>
              </li>
              <li className="flex items-start gap-2.5 text-[13px] text-white/65">
                <Mail size={14} className="mt-0.5 flex-shrink-0" />
                <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-white">{siteSettings.contactEmail}</a>
              </li>
              <li className="flex items-start gap-2.5 text-[13px] text-white/65">
                <Phone size={14} className="mt-0.5 flex-shrink-0" />
                <a href={`tel:${siteSettings.contactPhone}`} className="hover:text-white">{siteSettings.contactPhone}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[13px] text-white/50">{footer.copyright}</p>
          <div className="flex items-center gap-5">
            {footer.legalLinks.map((link) => (
              <a key={link.name} href={link.path} className="text-[13px] text-white/50 hover:text-white">{link.name}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
