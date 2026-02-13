import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Instagram, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const footerLinks = {
  shop: [
    { label: 'Cardio', category: 'cardio' },
    { label: 'Strength', category: 'strength' },
    { label: 'Weight', category: 'weight' },
    { label: 'Accessories', category: 'accessories' },
  ],
  support: [
    { label: 'Delivery', action: () => {} },
    { label: 'Installation', action: () => {} },
    { label: 'Returns', action: () => {} },
    { label: 'Warranty', action: () => {} },
  ],
  company: [
    { label: 'About', action: () => {} },
    { label: 'Careers', action: () => {} },
    { label: 'Contact', action: () => {} },
    { label: 'Press', action: () => {} },
  ],
};

export function Footer({ onNavigate }: FooterProps) {
  const handleCategoryClick = (category: string) => {
    sessionStorage.setItem('selectedCategory', category);
    onNavigate('collection');
  };
  
  return (
    <footer className="bg-[#0F0F10] border-t border-white/5">
      {/* Newsletter Section */}
      <div className="px-6 lg:px-16 xl:px-24 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
            Stay in the loop.
          </h2>
          <p className="text-[#9A9A9A] mb-8">
            Subscribe for exclusive offers, new product announcements, and fitness tips.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-[#17181A] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-full h-12 px-6 focus:border-[#D7263D]/50"
            />
            <Button
              type="submit"
              className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full h-12 px-8"
            >
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
      
      {/* Links Section */}
      <div className="px-6 lg:px-16 xl:px-24 py-12 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="AXOX Fitness" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-[#9A9A9A] text-sm mb-6">
              Engineered without compromise. Premium fitness equipment for those who refuse to settle.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h4 className="text-[#F4F4F4] font-medium mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleCategoryClick(link.category)}
                    className="text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="text-[#F4F4F4] font-medium mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate('account')}
                    className="text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="text-[#F4F4F4] font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="px-6 lg:px-16 xl:px-24 py-6 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#9A9A9A] text-sm">
            © 2024 Axox Fitness. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-[#9A9A9A] hover:text-[#F4F4F4] text-sm transition-colors">
              Privacy Policy
            </button>
            <button className="text-[#9A9A9A] hover:text-[#F4F4F4] text-sm transition-colors">
              Terms of Service
            </button>
            <button className="text-[#9A9A9A] hover:text-[#F4F4F4] text-sm transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
