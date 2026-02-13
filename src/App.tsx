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
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

type Page = 'home' | 'collection' | 'product' | 'compare' | 'cart' | 'checkout' | 'account' | 'quote';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();
  const { isCartOpen } = useStore();
  
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  
  const handleNavigate = (page: string, productId?: string) => {
    setCurrentPage(page as Page);
    if (productId) {
      setSelectedProductId(productId);
    }
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'collection':
        return <CollectionPage onNavigate={handleNavigate} />;
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
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
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
      {['home', 'collection', 'product', 'cart', 'account'].includes(currentPage) && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
