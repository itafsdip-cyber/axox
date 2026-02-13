import { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navItems = [
  { label: 'Cardio Training', category: 'cardio' },
  { label: 'Strength Training', category: 'strength' },
  { label: 'Weight Training', category: 'weight' },
  { label: 'Fitness Accessories', category: 'accessories' },
];

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, toggleCart } = useStore();
  
  const cartCount = cart.reduce((sum: number, item) => sum + item.quantity, 0);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (category: string) => {
    onNavigate('collection');
    setIsMobileMenuOpen(false);
    sessionStorage.setItem('selectedCategory', category);
  };
  
  const handleLogoClick = () => {
    onNavigate('home');
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled || currentPage !== 'home'
          ? 'bg-[#0F0F10]/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center group"
          >
            <img 
              src="/logo.png" 
              alt="AXOX Fitness" 
              className="h-8 lg:h-10 w-auto object-contain"
            />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.category}
                onClick={() => handleNavClick(item.category)}
                className="text-sm text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D7263D] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#9A9A9A] hover:text-[#F4F4F4] hover:bg-white/5"
              onClick={() => onNavigate('collection')}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-[#9A9A9A] hover:text-[#F4F4F4] hover:bg-white/5 hidden sm:flex"
              onClick={() => onNavigate('account')}
            >
              <User className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-[#9A9A9A] hover:text-[#F4F4F4] hover:bg-white/5 relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D7263D] text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#9A9A9A] hover:text-[#F4F4F4] hover:bg-white/5"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 bg-[#0F0F10] border-l border-white/10 p-0"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <span className="text-xl font-bold text-[#F4F4F4] font-['Sora']">
                      Menu
                    </span>
                  </div>
                  
                  <nav className="flex-1 p-6">
                    <ul className="space-y-4">
                      {navItems.map((item) => (
                        <li key={item.category}>
                          <button
                            onClick={() => handleNavClick(item.category)}
                            className="text-lg text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors duration-300 w-full text-left py-2"
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                      <button
                        onClick={() => {
                          onNavigate('account');
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span>Account</span>
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('quote');
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors"
                      >
                        <span>Request Quote</span>
                      </button>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
