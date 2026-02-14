import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { CollectionPage } from '@/pages/CollectionPage';
import { ProductPage } from '@/pages/ProductPage';
import { ComparePage } from '@/pages/ComparePage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { AccountPage } from '@/pages/AccountPage';
import { QuotePage } from '@/pages/QuotePage';
import { SearchPage } from '@/pages/SearchPage';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import Lenis from 'lenis';

type Page = 'home' | 'collection' | 'product' | 'compare' | 'cart' | 'checkout' | 'account' | 'quote' | 'search';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { isCartOpen } = useStore();

  // Initialize smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, productIdOrCategory?: string) => {
    setCurrentPage(page as Page);
    if (page === 'product') {
      setSelectedProductId(productIdOrCategory);
      setSelectedCategory(undefined);
    } else if (page === 'collection' && productIdOrCategory !== undefined) {
      setSelectedCategory(productIdOrCategory);
      setSelectedProductId(undefined);
    } else if (page !== 'collection') {
      setSelectedCategory(undefined);
    }
    if (page === 'product' && productIdOrCategory === undefined) {
      setSelectedProductId(undefined);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'collection':
        return <CollectionPage onNavigate={handleNavigate} initialCategory={selectedCategory} />;
      case 'product':
        return <ProductPage onNavigate={handleNavigate} productId={selectedProductId} />;
      case 'compare':
        return <ComparePage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'account':
        return <AccountPage onNavigate={handleNavigate} />;
      case 'quote':
        return <QuotePage onNavigate={handleNavigate} />;
      case 'search':
        return <SearchPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] relative">
      {/* Noise Overlay - behind content so text stays crisp */}
      <div className="noise-overlay" />

      <div className="relative z-10">
        {/* Header */}
        <Header onNavigate={handleNavigate} currentPage={currentPage} />

        {/* Cart Drawer */}
        <CartDrawer onNavigate={handleNavigate} />

        {/* Main Content */}
        <main className={cn(
          'transition-opacity duration-300',
          isCartOpen && 'pointer-events-none'
        )}>
          {renderPage()}
        </main>

        {/* Footer - Only show on certain pages */}
        {['home', 'collection', 'product', 'cart', 'account', 'search'].includes(currentPage) && (
          <Footer onNavigate={handleNavigate} />
        )}
      </div>
    </div>
  );
}

export default App;
