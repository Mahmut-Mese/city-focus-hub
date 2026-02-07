import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { 
  Wifi, 
  Users, 
  Clock, 
  LayoutGrid, 
  Lock, 
  HeadphonesIcon,
  Play,
  MapPin,
  Mail,
  Phone,
  Check
} from 'lucide-react';
import { services, testimonials, whyChooseUs } from '@/data/mockData';

const featureChips = [
  { icon: Wifi, text: 'High-speed internet' },
  { icon: Users, text: 'Meeting room access' },
  { icon: Clock, text: 'Flexible membership' },
];

const iconMap = {
  LayoutGrid,
  Lock,
  HeadphonesIcon,
};

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920)' }}
      >
        <div className="hero-overlay" />
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Your space to work, connect and focus in the heart of the City.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              Premium coworking spaces designed for productivity, collaboration, and growth. Join our community of innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/pricing">
                <Button className="btn-pill-white">Get Started</Button>
              </Link>
              <Button variant="outline" className="btn-pill border-white text-white hover:bg-white hover:text-foreground">
                <Play size={18} className="mr-2" />
                Watch Video
              </Button>
            </div>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-3 mt-12">
              {featureChips.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Icon size={16} className="text-white" />
                  <span className="text-sm text-white">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionTitle 
            title="Our Services" 
            subtitle="Discover the perfect workspace solution for your needs"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                link={service.id === 'meeting-room' ? '/meeting-rooms' : service.id === 'virtual-office' ? '/virtual-office' : '/pricing'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Split Section - Virtual Office */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                A City business address without the office cost
              </h2>
              <p className="text-muted-foreground mb-6">
                Get all the benefits of a prestigious business address without the overhead of a physical office.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Professional business address',
                  'Mail handling and forwarding',
                  'Meeting room access on demand',
                  'Dedicated phone answering',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check size={12} className="text-primary-foreground" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/virtual-office">
                <Button className="btn-pill-primary">Learn More</Button>
              </Link>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"
                alt="Virtual Office"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionTitle 
            title="Why Choose CoworkingHub?" 
            subtitle="Everything you need to work smarter and grow faster"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whyChooseUs.map((item) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
              return (
                <FeatureCard
                  key={item.title}
                  icon={IconComponent}
                  title={item.title}
                  description={item.description}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle 
            title="What Our Members Say" 
            subtitle="Join hundreds of satisfied professionals"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Space Gallery */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionTitle title="Our Space" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden md:row-span-2">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                alt="Workspace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600"
                alt="Meeting area"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600"
                alt="Lounge"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Book a Tour
              </h2>
              <p className="text-muted-foreground mb-8">
                Schedule a visit to experience our space firsthand.
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" className="h-12" />
                  <Input type="email" placeholder="Email Address" className="h-12" />
                </div>
                <Input type="tel" placeholder="Phone Number" className="h-12" />
                <Textarea placeholder="Message (optional)" className="min-h-[120px]" />
                <Button className="btn-pill-primary w-full sm:w-auto">Submit Request</Button>
              </form>
            </div>

            {/* Visit Us Card */}
            <div className="card-elevated p-6 md:p-8">
              <h3 className="font-serif text-2xl font-semibold mb-6">Visit Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground text-sm">123 Business District, City Center, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground text-sm">hello@coworkinghub.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground text-sm">+1 (234) 567-890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-muted-foreground text-sm">Mon - Fri: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
