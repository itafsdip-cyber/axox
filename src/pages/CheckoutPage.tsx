import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useStore } from '@/store/useStore';
import { CreditCard, Truck, Shield, Check } from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, clearCart } = useStore();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidence, setConfidence] = useState({ delivery: false, installation: false, warranty: true });
  
  const subtotal = cart.reduce((sum: number, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;
  
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      clearCart();
    }, 2000);
  };
  
  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
        <div className="px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
              Your Cart is Empty
            </h1>
            <p className="text-[#9A9A9A] mb-8">
              Add items to proceed with checkout.
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
  
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
        <div className="px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-[#D7263D]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-[#D7263D]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
              Order Confirmed!
            </h1>
            <p className="text-[#9A9A9A] mb-8">
              Thank you for your purchase. We will send you a confirmation email shortly.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => onNavigate('home')}
                className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8"
              >
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('account')}
                className="border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full px-8"
              >
                View Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
      <div className="px-6 lg:px-16 xl:px-24">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-[#F4F4F4] font-['Sora']">AXOX</span>
          <span className="text-xs text-[#9A9A9A] uppercase tracking-widest ml-2">Fitness</span>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-12">
          {['Shipping', 'Payment'].map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              <div className={
                (step === 'shipping' && i === 0) || (step === 'payment' && i <= 1)
                  ? 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-[#D7263D] text-white'
                  : 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-[#17181A] text-[#9A9A9A]'
              }>
                {i + 1}
              </div>
              <span className={
                (step === 'shipping' && i === 0) || (step === 'payment' && i <= 1)
                  ? 'text-[#F4F4F4] text-sm'
                  : 'text-[#9A9A9A] text-sm'
              }>
                {s}
              </span>
              {i === 0 && <div className="w-12 h-[1px] bg-white/20" />}
            </div>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            {step === 'shipping' ? (
              <div className="bg-[#17181A] rounded-2xl p-6 lg:p-8">
                <h2 className="text-xl font-bold text-[#F4F4F4] mb-6 font-['Sora']">
                  Shipping Information
                </h2>
                
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#9A9A9A]">First Name</Label>
                      <Input
                        placeholder="John"
                        className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#9A9A9A]">Last Name</Label>
                      <Input
                        placeholder="Doe"
                        className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[#9A9A9A]">Email</Label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[#9A9A9A]">Phone</Label>
                    <Input
                      placeholder="+971 XX XXX XXXX"
                      className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[#9A9A9A]">Address</Label>
                    <Input
                      placeholder="Street address"
                      className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#9A9A9A]">City</Label>
                      <Input
                        placeholder="Dubai"
                        className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#9A9A9A]">Emirate</Label>
                      <select className="w-full bg-[#0F0F10] border border-white/10 text-[#F4F4F4] rounded-xl h-12 px-4">
                        <option value="">Select Emirate</option>
                        <option value="dubai">Dubai</option>
                        <option value="abu-dhabi">Abu Dhabi</option>
                        <option value="sharjah">Sharjah</option>
                        <option value="ajman">Ajman</option>
                        <option value="ras-al-khaimah">Ras Al Khaimah</option>
                        <option value="fujairah">Fujairah</option>
                        <option value="umm-al-quwain">Umm Al Quwain</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setStep('payment')}
                    className="w-full bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full h-14"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-[#17181A] rounded-2xl p-6 lg:p-8">
                <h2 className="text-xl font-bold text-[#F4F4F4] mb-6 font-['Sora']">
                  Payment Method
                </h2>

                {/* AI Checkout Confidence Checks — minimal, no upsell */}
                <div className="mb-6 rounded-xl border border-white/10 bg-[#0F0F10]/50 p-4">
                  <p className="text-[#9A9A9A] text-xs uppercase tracking-wider mb-3">Quick confirmations</p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={confidence.delivery}
                        onCheckedChange={(v) => setConfidence((c) => ({ ...c, delivery: !!v }))}
                        className="border-white/20 data-[state=checked]:bg-[#D7263D] data-[state=checked]:border-[#D7263D]"
                      />
                      <span className="text-[#F4F4F4] text-sm">Delivery address and constraints confirmed</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={confidence.installation}
                        onCheckedChange={(v) => setConfidence((c) => ({ ...c, installation: !!v }))}
                        className="border-white/20 data-[state=checked]:bg-[#D7263D] data-[state=checked]:border-[#D7263D]"
                      />
                      <span className="text-[#F4F4F4] text-sm">Installation date will be arranged after order</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={confidence.warranty}
                        onCheckedChange={(v) => setConfidence((c) => ({ ...c, warranty: !!v }))}
                        className="border-white/20 data-[state=checked]:bg-[#D7263D] data-[state=checked]:border-[#D7263D]"
                      />
                      <span className="text-[#F4F4F4] text-sm">Warranty as per product (included)</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {['Credit Card', 'Cash on Delivery'].map((method) => (
                    <label
                      key={method}
                      className="flex items-center gap-4 p-4 bg-[#0F0F10] rounded-xl cursor-pointer hover:bg-[#0F0F10]/80 transition-colors"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        defaultChecked={method === 'Credit Card'}
                        className="w-4 h-4 accent-[#D7263D]"
                      />
                      <CreditCard className="h-5 w-5 text-[#9A9A9A]" />
                      <span className="text-[#F4F4F4]">{method}</span>
                    </label>
                  ))}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label className="text-[#9A9A9A]">Card Number</Label>
                    <Input
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#9A9A9A]">Expiry</Label>
                      <Input
                        placeholder="MM/YY"
                        className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#9A9A9A]">CVV</Label>
                      <Input
                        placeholder="XXX"
                        className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep('shipping')}
                    className="flex-1 border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full h-14"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full h-14"
                  >
                    {isProcessing ? 'Processing...' : `Pay AED ${total.toLocaleString()}`}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-[#17181A] rounded-2xl p-6">
              <h2 className="text-lg font-bold text-[#F4F4F4] mb-6 font-['Sora']">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-[#0F0F10] rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F4F4F4] text-sm truncate">{item.product.name}</p>
                      <p className="text-[#9A9A9A] text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-[#F4F4F4] text-sm">
                      AED {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              
              <Separator className="bg-white/10 mb-6" />
              
              <div className="space-y-3 mb-6">
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
              </div>
              
              <Separator className="bg-white/10 mb-6" />
              
              <div className="flex justify-between">
                <span className="text-[#F4F4F4] font-medium">Total</span>
                <span className="text-[#F4F4F4] font-bold text-xl">
                  AED {total.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-[#9A9A9A] text-xs">
                  <Truck className="h-4 w-4" />
                  Free Delivery
                </div>
                <div className="flex items-center gap-2 text-[#9A9A9A] text-xs">
                  <Shield className="h-4 w-4" />
                  Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
