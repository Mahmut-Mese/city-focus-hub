import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Contact() {
  return (
    <Layout>
      <HeroSection
        title="Contact"
        subtitle="Get in touch with us. We'd love to hear from you."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
        size="sm"
      />

      {/* Contact Info Section */}
      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left - Title and Social */}
            <div>
              <span className="inline-flex items-center h-8 px-4 rounded-full border border-black/15 text-[12px] font-semibold tracking-[0.08em] uppercase mb-6">
                Get In Touch
              </span>
              <h2 className="font-sans text-6xl leading-none mb-6">Have Any Questions?</h2>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-12 h-12 rounded-full border border-black/20 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f1f1f1] flex items-center justify-center">
                    <MapPin size={20} className="text-black/70" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xl leading-none mb-2">Our Address</h3>
                    <p className="text-black/60 text-lg">42 Market Street, Suite 200,<br />City Center</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f1f1f1] flex items-center justify-center">
                    <Mail size={20} className="text-black/70" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xl leading-none mb-2">Email Us</h3>
                    <p className="text-black/60 text-lg">hello@coworking.com</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-6 sm:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f1f1f1] flex items-center justify-center">
                    <Phone size={20} className="text-black/70" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xl leading-none mb-2">Phone Number</h3>
                    <p className="text-black/60 text-lg">+1 (555) 013-0249</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10">
              <h3 className="font-sans text-5xl leading-none mb-6">Get A Free Consultation</h3>
              <form className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Input placeholder="Name*" className="h-12 border-black/15 text-base" />
                  <Input type="tel" placeholder="Phone Number" className="h-12 border-black/15 text-base" />
                </div>
                <Input type="email" placeholder="Email*" className="h-12 border-black/15 text-base" />
                <Textarea placeholder="Messages" className="min-h-[170px] border-black/15 text-base" />
                <Button className="h-12 rounded-xl px-6 text-lg w-full bg-black text-white hover:bg-black/90">
                  REQUEST SUBMIT
                </Button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-3xl border border-black/10 bg-white overflow-hidden">
              <div className="w-full h-full min-h-[420px] bg-[#f4f4f4] flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin size={46} className="mx-auto mb-4 text-black/45" />
                  <h3 className="font-semibold text-3xl mb-2">Interactive Map Location</h3>
                  <p className="text-black/45 text-lg">London Eye, Riverside Building, County Hall</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
