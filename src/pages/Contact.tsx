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

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    content: '123 Business District\nCity Center, NY 10001',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'hello@coworkinghub.com',
  },
  {
    icon: Phone,
    title: 'Phone Number',
    content: '+1 (234) 567-890',
  },
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
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left - Title and Social */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Have Any Questions?</h2>
              <p className="text-muted-foreground mb-8">
                We're here to help and answer any question you might have. 
                We look forward to hearing from you.
              </p>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactInfo.map(({ icon: Icon, title, content }) => (
                <div key={title} className="card-elevated p-5 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card-elevated p-6 md:p-8">
              <h3 className="font-serif text-2xl font-semibold mb-6">Get A Free Consultation</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" className="h-12" />
                  <Input type="tel" placeholder="Phone Number" className="h-12" />
                </div>
                <Input type="email" placeholder="Email Address" className="h-12" />
                <Textarea placeholder="Your Message" className="min-h-[150px]" />
                <Button className="btn-pill-primary w-full sm:w-auto">Submit Message</Button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="card-elevated overflow-hidden">
              <div className="w-full h-full min-h-[400px] bg-secondary flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-serif text-xl font-semibold mb-2">Visit Our Space</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    123 Business District<br />
                    City Center, NY 10001
                  </p>
                  <Button className="btn-pill-secondary" asChild>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Get Directions
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
