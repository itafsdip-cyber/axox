import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/store/useStore';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (page: string) => void;
}

export function CartDrawer({ onNavigate }: CartDrawerProps) {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart } = useStore();
  
  const subtotal = cart.reduce((sum: number, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;
  
  const handleCheckout = () => {
    setCartOpen(false);
    onNavigate('checkout');
  };
  
  const handleViewCart = () => {
    setCartOpen(false);
    onNavigate('cart');
  };
  
  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-[#0F0F10] border-l border-white/10 p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="text-[#F4F4F4] font-['Sora'] text-xl">
            Your Selection
          </SheetTitle>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingBag className="h-16 w-16 text-[#9A9A9A] mb-4" strokeWidth={1} />
            <p className="text-[#9A9A9A] text-lg mb-2">Your cart is empty</p>
            <p className="text-[#9A9A9A] text-sm mb-6">Add items to get started</p>
            <Button
              onClick={() => {
                setCartOpen(false);
                onNavigate('collection');
              }}
              className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-[#17181A] rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-[#F4F4F4] font-medium text-sm truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[#9A9A9A] text-xs mt-1">
                            AED {item.product.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#9A9A9A] hover:text-[#D7263D] transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-2 bg-[#17181A] rounded-full px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-[#F4F4F4] text-sm w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <span className="text-[#F4F4F4] font-medium text-sm ml-auto">
                          AED {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-6 border-t border-white/10 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9A9A9A]">Subtotal</span>
                  <span className="text-[#F4F4F4]">AED {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9A9A9A]">Shipping</span>
                  <span className="text-[#F4F4F4]">
                    {shipping === 0 ? 'Free' : `AED ${shipping}`}
                  </span>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex justify-between">
                  <span className="text-[#F4F4F4] font-medium">Total</span>
                  <span className="text-[#F4F4F4] font-bold text-lg">
                    AED {total.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full h-12"
              >
                Checkout
              </Button>
              
              <Button
                variant="outline"
                onClick={handleViewCart}
                className="w-full border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full h-12"
              >
                View Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
