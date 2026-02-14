import { Button } from '@/components/ui/button';
import { Truck, Wrench, Shield, MapPin, Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const trustFeatures = [
  { icon: Wrench, title: 'Installation', description: 'Professional setup included' },
  { icon: Shield, title: 'Warranty', description: 'Up to 5 years coverage' },
  { icon: Truck, title: 'UAE Delivery', description: '3-5 business days' },
  { icon: MapPin, title: 'Support', description: 'Local service team' },
];

const trustedBy = [
  'Gyms & Studios',
  'Hotels & Resorts',
  'Corporate Wellness',
  'Sports Academies',
];

const testimonial = {
  quote: 'AXOX equipment has transformed our facility. The build quality is unmatched, and our members notice the difference from day one.',
  name: 'Omar Al-Maktoum',
  role: 'Head of Fitness, Premium Dubai Gym',
};

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredRef = useScrollReveal(0.08);
  const trustedRef = useScrollReveal(0.08);

  return (
    <div className="min-h-screen bg-[#0F0F10]">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center pt-32 pb-20">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_premium_treadmill.png"
            alt="Axox Premium Treadmill"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F0F10_100%)] opacity-80" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto flex flex-col items-center">
          <p className="hero-animate-1 text-[#D7263D] text-xs font-bold tracking-[0.3em] uppercase mb-6">
            Axox Fitness
          </p>

          <h1 className="hero-animate-2 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#F4F4F4] mb-10 tracking-tight leading-tight md:leading-none">
            Engineered Without Compromise.
          </h1>

          {/* Search Bar - Floating Interaction */}
          <div className="hero-animate-3 w-full max-w-2xl mb-10 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D7263D] to-[#FF4D4D] rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500" />
            <div className="relative flex items-center bg-[#0F0F10]/90 backdrop-blur-md border border-white/10 rounded-full p-2 pr-2 shadow-2xl transition-all duration-300 group-hover:border-[#D7263D]/50 group-hover:scale-[1.02]">
              <div className="pl-4 md:pl-6 pr-2 md:pr-4 text-[#D7263D]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>

              {/* Mobile Input */}
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent border-none text-[#F4F4F4] placeholder:text-[#9A9A9A]/60 focus:outline-none text-sm py-3 md:hidden"
                onClick={() => onNavigate('search')}
                readOnly
              />

              {/* Desktop Input */}
              <input
                type="text"
                placeholder="What are you looking for? (e.g. 'Treadmill for marathon training')"
                className="flex-1 bg-transparent border-none text-[#F4F4F4] placeholder:text-[#9A9A9A]/60 focus:outline-none text-base py-3 hidden md:block"
                onClick={() => onNavigate('search')}
                readOnly
              />

              <button
                onClick={() => onNavigate('search')}
                className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full p-2 md:p-3 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <p className="hero-animate-4 text-[#9A9A9A] text-base md:text-xl max-w-2xl leading-relaxed font-light">
            Premium fitness equipment designed for those who refuse to settle. <br className="hidden md:block" />Built for performance, crafted for longevity.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hero-animate-4">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">Scroll</span>
        </div>
      </section>

      {/* Our Story / Philosophy Section */}
      <section className="relative z-10 py-20 px-6 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#D7263D] uppercase mb-6">Our Philosophy</h2>
          <p className="text-2xl md:text-3xl lg:text-4xl text-[#F4F4F4] leading-relaxed font-['Sora'] font-light">
            "Axox isn't just equipment; it's a commitment to the discipline of self-improvement. We design for the 1% who refuse to compromise on performance, biomechanics, or aesthetics."
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-20 bg-[#D7263D]/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Major Clients Carousel */}
      <section className="py-20 bg-[#0F0F10] border-y border-white/5 overflow-hidden">
        <p className="text-center text-[#9A9A9A] text-xs font-bold tracking-[0.3em] uppercase mb-16">
          Powering World-Class Facilities
        </p>

        <div className="flex overflow-hidden select-none mask-gradient-fade">
          <div className="flex shrink-0 animate-marquee items-center justify-around gap-12 sm:gap-24 min-w-full px-6">
            {['Emirates', 'Etihad', 'Emaar', 'Danube', 'Nakheel', 'Jumeirah', 'Damac'].map((client, i) => (
              <span key={i} className="text-3xl md:text-5xl font-bold text-[#F4F4F4]/20 hover:text-[#D7263D] transition-colors duration-500 font-['Sora'] uppercase tracking-tight cursor-default">
                {client}
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="flex shrink-0 animate-marquee items-center justify-around gap-12 sm:gap-24 min-w-full px-6">
            {['Emirates', 'Etihad', 'Emaar', 'Danube', 'Nakheel', 'Jumeirah', 'Damac'].map((client, i) => (
              <span key={i} className="text-3xl md:text-5xl font-bold text-[#F4F4F4]/20 hover:text-[#D7263D] transition-colors duration-500 font-['Sora'] uppercase tracking-tight cursor-default">
                {client}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .mask-gradient-fade {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
        `}</style>
      </section>

      {/* Featured Product Section */}
      <section ref={featuredRef} className="reveal-on-scroll py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/product_treadmill.jpg"
            alt="Treadmill AX-9000"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F10] via-[#0F0F10]/80 to-transparent" />
        </div>

        <div className="relative z-10 px-6 lg:px-16 xl:px-24">
          <div className="max-w-xl">
            <span className="inline-block bg-[#D7263D] text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-6">
              Best Seller
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
              Treadmill AX-9000
            </h2>
            <p className="text-[#9A9A9A] text-lg mb-6">
              Commercial-grade motor, responsive deck, and a console that keeps pace with your data.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: '3.5 HP Motor', value: 'Commercial Grade' },
                { label: '0.8–20 km/h', value: 'Speed Range' },
                { label: '150 kg', value: 'Capacity' },
                { label: '5-Year', value: 'Warranty' },
              ].map((spec) => (
                <div key={spec.label} className="bg-[#17181A]/80 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-[#F4F4F4] font-bold">{spec.label}</p>
                  <p className="text-[#9A9A9A] text-sm">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 mb-8">
              <span className="text-3xl font-bold text-[#F4F4F4]">
                AED 12,999
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => onNavigate('product')}
                className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8 h-12"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('product')}
                className="border-white/30 text-[#F4F4F4] hover:bg-white/5 rounded-full px-8 h-12"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By + Testimonial */}
      <section ref={trustedRef} className="reveal-on-scroll py-20 lg:py-32 px-6 lg:px-16 xl:px-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[#9A9A9A] text-sm uppercase tracking-[0.2em] mb-8">
            Trusted by leading facilities
          </p>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mb-16">
            {trustedBy.map((label) => (
              <span
                key={label}
                className="text-[#F4F4F4]/70 font-medium text-sm lg:text-base"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="bg-[#17181A] rounded-2xl p-8 lg:p-12 border border-white/5">
            <Quote className="h-10 w-10 text-[#D7263D]/50 mb-6" />
            <blockquote className="text-[#F4F4F4] text-lg lg:text-xl leading-relaxed mb-6 font-['Sora']">
              "{testimonial.quote}"
            </blockquote>
            <div>
              <p className="text-[#F4F4F4] font-medium">{testimonial.name}</p>
              <p className="text-[#9A9A9A] text-sm">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 xl:px-24 border-t border-white/5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {trustFeatures.map((feature) => (
            <div key={feature.title} className="text-center flex flex-col items-center">
              <feature.icon className="h-8 w-8 text-[#D7263D] mb-4" strokeWidth={1.5} />
              <h3 className="text-[#F4F4F4] font-bold mb-2">{feature.title}</h3>
              <p className="text-[#9A9A9A] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
