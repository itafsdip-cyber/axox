import { Button } from '@/components/ui/button';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { cart, updateQuantity, removeFromCart } = useStore();
  
  const subtotal = cart.reduce((sum: number, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
        <div className="px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl mx-auto text-center py-20">
            <ShoppingBag className="h-20 w-20 text-[#9A9A9A] mx-auto mb-6" strokeWidth={1} />
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
              Your Cart is Empty
            </h1>
            <p className="text-[#9A9A9A] mb-8">
              Add items to get started with your fitness journey.
            </p>
            <Button
              onClick={() => onNavigate('collection')}
              className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
      <div className="px-6 lg:px-16 xl:px-24">
        <h1 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-8 font-['Sora']">
          Your Selection
        </h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-[#17181A] rounded-2xl p-4 lg:p-6 flex gap-4 lg:gap-6"
              >
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#0F0F10] rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[#F4F4F4] font-medium text-lg">
                        {item.product.name}
                      </h3>
                      <p className="text-[#9A9A9A] text-sm mt-1">
                        AED {item.product.price.toLocaleString()} each
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#9A9A9A] hover:text-[#D7263D] transition-colors p-1"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-[#0F0F10] rounded-full px-4 py-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-[#F4F4F4] w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <span className="text-[#F4F4F4] font-bold text-lg">
                      AED {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-[#17181A] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-[#F4F4F4] mb-6 font-['Sora']">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9A9A9A]">Subtotal</span>
                  <span className="text-[#F4F4F4]">AED {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9A9A9A]">Shipping</span>
                  <span className={shipping === 0 ? 'text-[#D7263D]' : 'text-[#F4F4F4]'}>
                    {shipping === 0 ? 'Free' : `AED ${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[#9A9A9A] text-xs">
                    Free shipping on orders over AED 5,000
                  </p>
                )}
              </div>
              
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#F4F4F4] font-medium">Total</span>
                  <span className="text-[#F4F4F4] font-bold text-xl">
                    AED {total.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <Button
                onClick={() => onNavigate('checkout')}
                className="w-full bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full h-14 text-base"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => onNavigate('collection')}
                className="w-full border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full h-12 mt-3"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
