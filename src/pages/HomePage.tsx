import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Truck, Wrench, Shield, MapPin } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const categories = [
  { name: 'Cardio', image: '/category_cardio.jpg', cta: 'Shop Cardio' },
  { name: 'Strength', image: '/category_strength.jpg', cta: 'Shop Strength' },
  { name: 'Weight', image: '/category_weight.jpg', cta: 'Shop Weight' },
  { name: 'Accessories', image: '/category_accessories.jpg', cta: 'Shop Accessories' },
];

const trustFeatures = [
  { icon: Wrench, title: 'Installation', description: 'Professional setup included' },
  { icon: Shield, title: 'Warranty', description: 'Up to 5 years coverage' },
  { icon: Truck, title: 'UAE Delivery', description: '3-5 business days' },
  { icon: MapPin, title: 'Support', description: 'Local service team' },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const handleCategoryClick = (category: string) => {
    sessionStorage.setItem('selectedCategory', category.toLowerCase());
    onNavigate('collection');
  };
  
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 hero-bg-animate">
          <img
            src="/hero_gym.jpg"
            alt="Premium gym interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 xl:px-24">
          <div className="max-w-4xl">
            <p className="hero-animate-1 text-[#D7263D] text-sm uppercase tracking-[0.2em] mb-4">
              Axox Fitness
            </p>
            <h1 className="hero-animate-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#F4F4F4] leading-[1.05] mb-6 font-['Sora']">
              Engineered Without<br />
              Compromise.
            </h1>
            <p className="hero-animate-3 text-[#9A9A9A] text-lg md:text-xl max-w-xl mb-8">
              Premium fitness equipment designed for those who refuse to settle. Built for performance, crafted for longevity.
            </p>
            
            <div className="hero-animate-4 flex flex-wrap gap-4">
              <Button
                onClick={() => onNavigate('collection')}
                className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8 h-12 text-sm font-medium group"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('quote')}
                className="border-white/30 text-[#F4F4F4] hover:bg-white/5 hover:border-white/50 rounded-full px-8 h-12 text-sm font-medium"
              >
                View Commercial Range
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll Hint */}
        <div className="scroll-hint-animate absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[#9A9A9A] text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5 text-[#9A9A9A] animate-float" />
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F4F4] mb-8 leading-tight font-['Sora']">
              Built for those who refuse to settle.
            </h2>
            <div className="space-y-6 text-[#9A9A9A] leading-relaxed">
              <p>
                Axox designs equipment that performs under pressure—at home, in the gym, or under stadium lights. Every frame, weld, and finish is chosen for durability and precision.
              </p>
              <p>
                We don't chase trends. We build tools that outlast them. Our engineering philosophy is simple: eliminate the unnecessary, perfect what remains.
              </p>
              <p>
                From the UAE to the world, Axox represents the pinnacle of fitness equipment craftsmanship.
              </p>
            </div>
            <Button
              variant="link"
              onClick={() => onNavigate('collection')}
              className="text-[#D7263D] hover:text-[#b91d32] p-0 h-auto mt-8 text-sm uppercase tracking-widest group"
            >
              Read our story
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src="/philosophy_runner.jpg"
                alt="Athlete in motion"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#D7263D]/30 rounded-2xl hidden lg:block" />
          </div>
        </div>
      </section>
      
      {/* Category Showcase */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 xl:px-24">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
            Train your way.
          </h2>
          <p className="text-[#9A9A9A] max-w-2xl mx-auto">
            Cardio, strength, weight training, and accessories—built for performance.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10]/90 via-[#0F0F10]/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#F4F4F4] mb-2 font-['Sora']">
                  {category.name}
                </h3>
                <span className="text-[#D7263D] text-sm opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {category.cta}
                </span>
              </div>
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D7263D]/50 rounded-2xl transition-colors duration-300" />
            </button>
          ))}
        </div>
      </section>
      
      {/* Featured Product Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
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
