import { Button } from '@/components/ui/button';
import { X, Check, AlertCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import type { Product } from '@/types';

interface ComparePageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function ComparePage({ onNavigate }: ComparePageProps) {
  const { compare, removeFromCompare, clearCompare, addToCart } = useStore();
  
  if (compare.length === 0) {
    return (
      <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
        <div className="px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
              Compare Products
            </h1>
            <p className="text-[#9A9A9A] mb-8">
              You haven't selected any products to compare yet.
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
  
  if (compare.length === 1) {
    return (
      <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
        <div className="px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
              Compare Products
            </h1>
            <p className="text-[#9A9A9A] mb-8">
              Select one more product from the same category to compare.
            </p>
            <Button
              onClick={() => onNavigate('collection')}
              className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8"
            >
              Add Another Product
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const sameCategory = compare[0].category === compare[1].category;
  
  if (!sameCategory) {
    return (
      <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
        <div className="px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl mx-auto text-center py-20">
            <AlertCircle className="h-16 w-16 text-[#D7263D] mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
              Cannot Compare
            </h1>
            <p className="text-[#9A9A9A] mb-8">
              You can only compare similar products from the same category.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={clearCompare}
                variant="outline"
                className="border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full px-8"
              >
                Clear Selection
              </Button>
              <Button
                onClick={() => onNavigate('collection')}
                className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8"
              >
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const allSpecs = ['motor', 'speed', 'capacity', 'warranty'];
  
  return (
    <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
      <div className="px-6 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-2 font-['Sora']">
              Choose with confidence.
            </h1>
            <p className="text-[#9A9A9A]">
              Compare specs side by side—then decide.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={clearCompare}
            className="border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {compare.map((product: Product) => (
            <div key={product.id} className="bg-[#17181A] rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-3 right-3 p-2 bg-[#0F0F10]/80 rounded-full text-[#9A9A9A] hover:text-[#D7263D]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#F4F4F4] mb-2 font-['Sora']">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-[#D7263D] mb-4">
                  AED {product.price.toLocaleString()}
                </p>
                
                <div className="space-y-3 mb-6">
                  {allSpecs.map((spec) => (
                    <div key={spec} className="flex justify-between text-sm">
                      <span className="text-[#9A9A9A] capitalize">{spec}</span>
                      <span className="text-[#F4F4F4]">
                        {product.specs[spec as keyof typeof product.specs] || 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 mb-6">
                  {product.highlights.slice(0, 3).map((highlight: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#9A9A9A]">
                      <Check className="h-3 w-3 text-[#D7263D]" />
                      {highlight}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  {product.type === 'commercial' ? (
                    <Button
                      onClick={() => onNavigate('quote')}
                      className="w-full bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full"
                    >
                      Request Quote
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          addToCart(product);
                          onNavigate('checkout');
                        }}
                        className="w-full bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full"
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => addToCart(product)}
                        className="w-full border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full"
                      >
                        Add to Cart
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate('product', product.id)}
                    className="w-full text-[#9A9A9A] hover:text-[#F4F4F4]"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {compare.length < 2 && (
            <button
              onClick={() => onNavigate('collection')}
              className="bg-[#17181A]/50 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-[#D7263D]/50 transition-colors"
            >
              <span className="text-[#9A9A9A] text-lg mb-2">Add Product</span>
              <span className="text-[#9A9A9A] text-sm">Click to browse</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
