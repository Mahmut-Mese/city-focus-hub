import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Calendar, Tag, Globe, Phone, Check } from 'lucide-react';

export default function VirtualOffice() {
  return (
    <Layout>
      <HeroSection
        title="Office Space"
        subtitle="Premium private offices and virtual office solutions"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
        size="sm"
      />

      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Featured Image */}
              <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200"
                  alt="Private Office"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Overview */}
              <div>
                <h2 className="font-sans text-5xl leading-none mb-4">Project Overview</h2>
                <p className="text-black/60 leading-relaxed text-lg">
                  Our private office spaces are designed for teams who need a dedicated, professional environment. 
                  Each office comes fully furnished with ergonomic furniture, high-speed internet, and access to all 
                  common amenities. Whether you're a growing startup or an established company looking for a satellite 
                  office, we have solutions that scale with your needs.
                </p>
              </div>

              {/* Challenge Section */}
              <div>
                <h2 className="font-sans text-5xl leading-none mb-4">Challenge of This Project</h2>
                <p className="text-black/60 mb-4 text-lg">
                  Many businesses face challenges when it comes to workspace decisions:
                </p>
                <ul className="space-y-2">
                  {[
                    'High upfront costs for traditional office leases',
                    'Long-term commitments that don\'t fit scaling needs',
                    'Managing office maintenance and utilities',
                    'Finding the right location for clients and team',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-black/65 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Final Result */}
              <div>
                <h2 className="font-sans text-5xl leading-none mb-4">Final Result</h2>
                <p className="text-black/60 leading-relaxed text-lg">
                  Our flexible office solutions eliminate these pain points. You get a premium workspace without 
                  the traditional overhead, with month-to-month flexibility and all-inclusive pricing. Our spaces 
                  have helped hundreds of businesses establish a professional presence while maintaining the agility 
                  they need to grow.
                </p>
              </div>

              {/* Image Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"
                    alt="Office interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600"
                    alt="Workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info Card */}
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="font-sans text-4xl leading-none mb-5">Project Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-black/45" />
                    <div>
                      <p className="text-sm text-black/45">Date</p>
                      <p className="font-medium text-lg">January 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag size={18} className="text-black/45" />
                    <div>
                      <p className="text-sm text-black/45">Categories</p>
                      <p className="font-medium text-lg">Private Office, Virtual Office</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-black/45" />
                    <div>
                      <p className="text-sm text-black/45">Website</p>
                      <p className="font-medium text-lg">coworkinghub.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-[#0f1015] text-white p-6 rounded-2xl">
                <h3 className="font-sans text-4xl leading-tight mb-2">
                  Get Any Coworking Services From us Now
                </h3>
                <p className="text-white/75 text-base mb-4">
                  Contact us today to find your perfect workspace solution.
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Call us</p>
                    <p className="font-semibold text-xl">+1 (234) 567-890</p>
                  </div>
                </div>
                <Link to="/contact">
                  <Button className="h-10 rounded-lg px-5 text-sm w-full bg-white text-black hover:bg-white/90">Contact Us</Button>
                </Link>
              </div>

              {/* Contact Form */}
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="font-sans text-4xl leading-none mb-4">Contact Us</h3>
                <form className="space-y-4">
                  <Input placeholder="Your Name" className="h-11 border-black/15" />
                  <Input type="email" placeholder="Email" className="h-11 border-black/15" />
                  <Textarea placeholder="Message" className="min-h-[100px] border-black/15" />
                  <Button className="h-10 rounded-lg px-5 text-sm w-full bg-black text-white hover:bg-black/90">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
