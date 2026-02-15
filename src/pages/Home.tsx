import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  HeadphonesIcon,
  LayoutGrid,
  Mail,
  MapPin,
  Play,
  Phone,
  Star,
  Users,
  Wifi,
} from 'lucide-react';

const featureChips = [
  { icon: Wifi, text: 'High-speed internet' },
  { icon: Users, text: 'Meeting room access' },
  { icon: Clock, text: 'Flexible membership' },
];

const services = [
  {
    title: 'Coworking',
    description: 'Shared spaces designed for focus, creativity, and collaboration.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    link: '/pricing',
  },
  {
    title: 'Meeting Room',
    description: 'Fully-equipped rooms for presentations, interviews, and team sessions.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    link: '/meeting-rooms',
  },
  {
    title: 'Virtual Office',
    description: 'Build your company presence with a premium city business address.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    link: '/virtual-office',
  },
];

const whyChooseUs = [
  {
    icon: LayoutGrid,
    title: 'Flexible Workstations',
    description: 'Choose hot desks, dedicated desks, or private spaces as you grow.',
  },
  {
    icon: CalendarDays,
    title: 'Private Cabinet Store',
    description: 'Secure personal lockers to keep your day-to-day items protected.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Professional Support',
    description: 'Front desk support, mail handling, and day-to-day assistance.',
  },
];

const testimonials = [
  {
    name: 'John Smith',
    role: 'Product Lead',
    content: 'A calm, professional space that makes it easy to focus and meet clients.',
  },
  {
    name: 'Michael Brown',
    role: 'Startup Founder',
    content: 'The meeting rooms are excellent, and the staff is always helpful and responsive.',
  },
  {
    name: 'Daniel Wilson',
    role: 'Business Consultant',
    content: 'Flexible terms, central location, and a community that feels welcoming.',
  },
];

export default function Home() {
  return (
    <Layout>
      <section
        className="relative min-h-[82vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920)' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container-custom relative z-10 py-16 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-sans font-semibold text-white mb-5 leading-[0.96]">
              Your space to work, connect and focus in the heart of the City.
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-xl mb-7 leading-relaxed">
              CoworkingHub provides flexible workspace solutions tailored for freelancers, remote teams,
              and entrepreneurs. Enjoy a professional address, high-speed WiFi, and a community that helps you grow.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link to="/pricing">
                <Button className="h-9 rounded-full px-5 text-xs bg-white text-black hover:bg-white/90">Get Started</Button>
              </Link>
              <Button variant="outline" className="h-9 rounded-full px-5 text-xs bg-transparent border-white text-white hover:bg-white/10">
                <Play size={14} className="mr-2" />
                Watch Video
              </Button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {featureChips.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5"
                >
                  <Icon size={12} className="text-white" />
                  <span className="text-[11px] text-white/90">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div>
        <section className="py-14 md:py-16 border-t border-black/10 bg-[#efefef]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-7">
              <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-black/20 text-[9px] tracking-[0.18em] uppercase text-black/60">Services</span>
              <span className="text-[11px] text-black/45 uppercase tracking-[0.08em]">Explore our spaces</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {services.map((service) => (
                <Link key={service.title} to={service.link} className="group">
                  <article className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="font-sans text-2xl leading-tight mb-1.5">{service.title}</h3>
                      <p className="text-sm text-black/60 leading-relaxed mb-4">{service.description}</p>
                      <div className="flex items-center justify-between text-xs text-black/60">
                        <span>More View • Details</span>
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-black/20">
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 border-y border-black/10 bg-white">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-black/20 text-[9px] tracking-[0.18em] uppercase text-black/60">About</span>
              <h2 className="font-sans text-4xl md:text-5xl leading-[1.02] mt-3 mb-5 max-w-xl">
                A City business address without the office cost
              </h2>
              <p className="text-sm text-black/60 leading-relaxed mb-6 max-w-lg">
                Get all the benefits of a prestigious business address without the overhead of a physical office.
              </p>
              <ul className="space-y-2.5 mb-7 text-sm text-black/80">
                {[
                  'Premium mailing address',
                  'Business coordinates',
                  'Reception and support',
                  'Member events and perks',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="inline-flex w-4 h-4 rounded-full bg-black items-center justify-center">
                      <Check size={11} className="text-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link to="/virtual-office">
                  <Button className="h-8 rounded-full px-4 text-[11px] bg-black text-white hover:bg-black/90">More Details</Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" className="h-8 rounded-full px-4 text-[11px] border-black/20 text-black hover:bg-black/5">See Plans</Button>
                </Link>
              </div>
            </div>
            <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200"
                alt="Business Address"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 border-b border-black/10 bg-[#efefef]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-black/20 text-[9px] tracking-[0.18em] uppercase text-black/60">Features</span>
              <span className="text-[11px] text-black/45 uppercase tracking-[0.08em]">Built for teams</span>
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-center mb-8">Why Choose CoworkingHub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {whyChooseUs.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-xl border border-black/10 bg-white p-4 md:p-5">
                    <div className="inline-flex w-9 h-9 rounded-xl bg-black items-center justify-center mb-3">
                      <Icon size={16} className="text-white" />
                    </div>
                    <h3 className="font-sans text-xl mb-1.5">{item.title}</h3>
                    <p className="text-sm text-black/60 leading-relaxed">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 border-b border-black/10 bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-black/20 text-[9px] tracking-[0.18em] uppercase text-black/60">Testimonials</span>
              <span className="text-[11px] text-black/45 uppercase tracking-[0.08em]">Member reviews</span>
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-center mb-8">What Our Members Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="rounded-xl border border-black/10 bg-white p-4 md:p-5">
                  <div className="flex gap-1 mb-3 text-black">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className="fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-sm text-black/80 leading-relaxed mb-4">"{testimonial.content}"</p>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-[11px] text-black/55">{testimonial.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 border-b border-black/10 bg-[#efefef]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-black/20 text-[9px] tracking-[0.18em] uppercase text-black/60">Gallery</span>
              <span className="text-[11px] text-black/45 uppercase tracking-[0.08em]">Our Space</span>
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-center mb-8">Our Space</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 md:h-[360px]">
              <div className="rounded-xl overflow-hidden h-[260px] md:h-full md:row-span-2">
                <img
                  src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=1200"
                  alt="Skylight architecture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[170px] md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200"
                  alt="Creative workspace details"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[170px] md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=1200"
                  alt="Keyboard closeup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 bg-white">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-7">
            <div className="rounded-xl border border-black/10 bg-white p-6 md:p-7">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-sans text-3xl">Contact Us / Book a Tour</h3>
                <span className="text-[10px] tracking-[0.15em] uppercase text-black/45">Contact</span>
              </div>
              <p className="text-sm text-black/60 mb-5">We'll get back to you within one business day.</p>
              <form className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input placeholder="Your name" className="h-10 rounded-md border-black/15 text-sm" />
                  <Input type="email" placeholder="you@example.com" className="h-10 rounded-md border-black/15 text-sm" />
                </div>
                <Input placeholder="Tour request" className="h-10 rounded-md border-black/15 text-sm" />
                <Textarea placeholder="Tell us all your needs" className="min-h-[108px] rounded-md border-black/15 text-sm" />
                <Button className="h-9 rounded-full px-6 text-xs bg-black text-white hover:bg-black/90">Send Message</Button>
              </form>
            </div>

            <div className="rounded-xl bg-[#111218] text-white p-6 md:p-7">
              <h3 className="font-sans text-3xl mb-5">Visit Us</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-white/80 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-white/70">123 Business Street, City Center</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-white/80 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-white/70">hello@coworkinghub.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-white/80 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-white/70">+1 (234) 567-890</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                  <Clock size={16} className="text-white/80 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Open Hours</p>
                    <p className="text-white/70">Mon-Fri: 8:00 AM - 8:00 PM</p>
                    <p className="text-white/70">Sat-Sun: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-6 h-8 rounded-full px-4 text-[11px] border-white/20 text-white bg-transparent hover:bg-white/10">
                View on Google Maps
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
