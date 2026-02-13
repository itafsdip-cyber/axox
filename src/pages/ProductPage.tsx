import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Truck, Shield, Wrench, CreditCard, ChevronRight, Heart, Share2 } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface ProductPageProps {
  onNavigate: (page: string) => void;
  productId?: string;
}

export function ProductPage({ onNavigate, productId = 'ax-9000' }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  
  const product = getProductById(productId) || getProductById('ax-9000')!;
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    addToCart(product);
  };
  
  const handleBuyNow = () => {
    addToCart(product);
    onNavigate('checkout');
  };
  
  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleRequestQuote = () => {
    onNavigate('quote');
  };
  
  return (
    <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
      <div className="px-6 lg:px-16 xl:px-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#9A9A9A] mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-[#F4F4F4]">Home</button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={() => onNavigate('collection')} className="hover:text-[#F4F4F4]">Collection</button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#F4F4F4]">{product.name}</span>
        </nav>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-[#17181A] rounded-2xl overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {[product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'w-20 h-20 bg-[#17181A] rounded-lg overflow-hidden border-2 transition-colors',
                    selectedImage === i ? 'border-[#D7263D]' : 'border-transparent'
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            {/* USP Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.usps.map((usp) => (
                <span
                  key={usp}
                  className="inline-flex items-center gap-1.5 text-xs text-[#9A9A9A] bg-[#17181A] px-3 py-1.5 rounded-full"
                >
                  <Check className="h-3 w-3 text-[#D7263D]" />
                  {usp}
                </span>
              ))}
            </div>
            
            {/* Title & Badge */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#F4F4F4] font-['Sora']">
                {product.name}
              </h1>
              {product.badge && (
                <Badge className="bg-[#D7263D] text-white shrink-0">
                  {product.badge}
                </Badge>
              )}
            </div>
            
            {/* Price */}
            <p className="text-3xl font-bold text-[#F4F4F4] mb-6">
              AED {product.price.toLocaleString()}
            </p>
            
            {/* Description */}
            <p className="text-[#9A9A9A] mb-8">
              {product.description}
            </p>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              {product.type === 'commercial' ? (
                <>
                  <Button
                    onClick={handleRequestQuote}
                    className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8 h-14 text-base min-w-[160px]"
                  >
                    Request Quote
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('quote')}
                    className="border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full px-8 h-14 min-w-[160px]"
                  >
                    Contact Sales
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full px-8 h-14 min-w-[160px]"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8 h-14 min-w-[160px]"
                  >
                    Buy Now
                  </Button>
                </>
              )}
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlist}
                className={cn(
                  'border-white/20 rounded-full h-14 w-14',
                  inWishlist ? 'text-[#D7263D]' : 'text-[#F4F4F4]'
                )}
              >
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="border-white/20 text-[#F4F4F4] rounded-full h-14 w-14"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Truck, label: 'Free Delivery', desc: '3-5 business days' },
                { icon: Wrench, label: 'Free Installation', desc: 'Professional setup' },
                { icon: Shield, label: product.specs.warranty + ' Warranty', desc: 'Full coverage' },
                { icon: CreditCard, label: 'Cash on Delivery', desc: 'Available in UAE' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-[#D7263D]" strokeWidth={1.5} />
                  <div>
                    <p className="text-[#F4F4F4] text-sm font-medium">{item.label}</p>
                    <p className="text-[#9A9A9A] text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full bg-[#17181A] rounded-full p-1 mb-6">
                {['overview', 'specifications', 'delivery'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="flex-1 rounded-full text-sm data-[state=active]:bg-[#D7263D] data-[state=active]:text-white text-[#9A9A9A]"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="overview" className="mt-0">
                <div className="bg-[#17181A] rounded-2xl p-6">
                  <p className="text-[#9A9A9A] mb-4">
                    A responsive deck, precision motor, and console built for real training data. 
                    The {product.name} is designed for serious athletes who demand the best.
                  </p>
                  <ul className="space-y-3">
                    {product.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#F4F4F4]">
                        <Check className="h-4 w-4 text-[#D7263D]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-0">
                <div className="bg-[#17181A] rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      value && (
                        <div key={key} className="border-b border-white/10 pb-3">
                          <p className="text-[#9A9A9A] text-sm capitalize">{key}</p>
                          <p className="text-[#F4F4F4] font-medium">{value}</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="delivery" className="mt-0">
                <div className="bg-[#17181A] rounded-2xl p-6">
                  <p className="text-[#9A9A9A] mb-4">
                    UAE delivery in 3-5 business days. Installation included.
                  </p>
                  <ul className="space-y-3 text-[#F4F4F4]">
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#D7263D]" />
                      Free delivery within UAE
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#D7263D]" />
                      Professional installation included
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#D7263D]" />
                      Old equipment removal available
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#D7263D]" />
                      Assembly and setup by certified technicians
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
