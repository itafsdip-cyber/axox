import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Grid3X3, List, Filter, ArrowRightLeft } from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/store/useStore';
import type { Product } from '@/types';

interface CollectionPageProps {
  onNavigate: (page: string, productId?: string) => void;
  initialCategory?: string;
}

type ViewMode = 'grid' | 'list';
type ProductType = 'all' | 'home' | 'commercial';

interface FilterContentProps {
  productType: ProductType;
  setProductType: (type: ProductType) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

const FilterContent = ({
  productType,
  setProductType,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  onClearFilters,
}: FilterContentProps) => {
  const categories = ['cardio', 'strength', 'weight', 'accessories'];

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-[#F4F4F4] font-medium mb-4">Product Type</h4>
        <div className="space-y-3">
          {[
            { value: 'all', label: 'All Products' },
            { value: 'home', label: 'Home Use' },
            { value: 'commercial', label: 'Commercial' },
          ].map((type) => (
            <label key={type.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="productType"
                value={type.value}
                checked={productType === type.value}
                onChange={() => setProductType(type.value as ProductType)}
                className="w-4 h-4 accent-[#D7263D]"
              />
              <span className={
                productType === type.value ? 'text-[#F4F4F4]' : 'text-[#9A9A9A]'
              }>
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[#F4F4F4] font-medium mb-4">Categories</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-3">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                className="border-white/20 data-[state=checked]:bg-[#D7263D] data-[state=checked]:border-[#D7263D]"
              />
              <Label
                htmlFor={category}
                className="text-[#9A9A9A] text-sm capitalize cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[#F4F4F4] font-medium mb-4">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          max={20000}
          step={500}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-[#9A9A9A]">
          <span>AED {priceRange[0].toLocaleString()}</span>
          <span>AED {priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={onClearFilters}
        className="w-full border-white/20 text-[#F4F4F4] hover:bg-white/5"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export function CollectionPage({ onNavigate, initialCategory }: CollectionPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [productType, setProductType] = useState<ProductType>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (initialCategory) return [initialCategory];
    const saved = sessionStorage.getItem('selectedCategory');
    if (saved) {
      sessionStorage.removeItem('selectedCategory');
      return [saved];
    }
    return [];
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCompare, compare, removeFromCompare, canCompare, addToCart } = useStore();

  // Sync initialCategory prop to state (getDerivedStateFromProps pattern)
  const [lastInitialCategory, setLastInitialCategory] = useState(initialCategory);
  if (initialCategory !== lastInitialCategory) {
    setLastInitialCategory(initialCategory);
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }



  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (productType !== 'all' && product.type !== productType) return false;

      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [productType, selectedCategories, priceRange]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleCompare = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (compare.find((p: Product) => p.id === product.id)) {
      removeFromCompare(product.id);
    } else if (canCompare(product) && compare.length < 2) {
      addToCompare(product);
    }
  };

  const handleProductClick = (productId: string) => {
    onNavigate('product', productId);
  };




  return (
    <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
      <div className="px-6 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F4F4] mb-2 font-['Sora']">
              Browse the Range
            </h1>
            <p className="text-[#9A9A9A]">
              {filteredProducts.length} products available
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#17181A] rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={
                  viewMode === 'grid'
                    ? 'p-2 rounded-full bg-[#D7263D] text-white'
                    : 'p-2 rounded-full text-[#9A9A9A] hover:text-[#F4F4F4]'
                }
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={
                  viewMode === 'list'
                    ? 'p-2 rounded-full bg-[#D7263D] text-white'
                    : 'p-2 rounded-full text-[#9A9A9A] hover:text-[#F4F4F4]'
                }
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden border-white/20 text-[#F4F4F4] hover:bg-white/5"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-[#0F0F10] border-r border-white/10 p-6">
                <SheetHeader>
                  <SheetTitle className="text-[#F4F4F4] font-['Sora']">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent
                    productType={productType}
                    setProductType={setProductType}
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    onClearFilters={() => {
                      setProductType('all');
                      setSelectedCategories([]);
                      setPriceRange([0, 20000]);
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-[#F4F4F4] font-bold mb-6 font-['Sora']">Filters</h3>
              <FilterContent
                productType={productType}
                setProductType={setProductType}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onClearFilters={() => {
                  setProductType('all');
                  setSelectedCategories([]);
                  setPriceRange([0, 20000]);
                }}
              />
            </div>
          </aside>

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#9A9A9A] text-lg">No products found</p>
                <p className="text-[#9A9A9A] text-sm mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className={
                      viewMode === 'list'
                        ? 'group cursor-pointer flex gap-6 bg-[#17181A] rounded-2xl p-4'
                        : 'group cursor-pointer'
                    }
                  >
                    <div className={
                      viewMode === 'grid'
                        ? 'relative overflow-hidden rounded-xl bg-[#17181A] aspect-square mb-4'
                        : 'w-48 h-48 flex-shrink-0 relative overflow-hidden rounded-xl bg-[#17181A]'
                    }>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {product.badge && (
                        <Badge className="absolute top-3 left-3 bg-[#D7263D] text-white text-xs">
                          {product.badge}
                        </Badge>
                      )}

                      <button
                        onClick={(e) => handleCompare(product, e)}
                        className={
                          compare.find((p: Product) => p.id === product.id)
                            ? 'absolute top-3 right-3 p-2 rounded-full bg-[#0F0F10]/80 backdrop-blur-sm text-[#D7263D]'
                            : 'absolute top-3 right-3 p-2 rounded-full bg-[#0F0F10]/80 backdrop-blur-sm text-[#9A9A9A] opacity-0 group-hover:opacity-100 transition-opacity'
                        }
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                      </button>

                      <div className="absolute bottom-3 left-3">
                        <span className={
                          product.type === 'commercial'
                            ? 'text-xs px-2 py-1 rounded-full bg-[#D7263D]/20 text-[#D7263D]'
                            : 'text-xs px-2 py-1 rounded-full bg-white/10 text-[#F4F4F4]'
                        }>
                          {product.type === 'commercial' ? 'Commercial' : 'Home'}
                        </span>
                      </div>
                    </div>

                    <div className={viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}>
                      <div>
                        <h3 className="text-[#F4F4F4] font-medium group-hover:text-[#D7263D] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[#9A9A9A] text-sm mt-1">
                          AED {product.price.toLocaleString()}
                        </p>

                        {viewMode === 'list' && (
                          <>
                            <p className="text-[#9A9A9A] text-sm mt-3 line-clamp-2">
                              {product.description}
                            </p>
                            <ul className="mt-3 space-y-1">
                              {product.highlights.slice(0, 3).map((highlight, i) => (
                                <li key={i} className="text-[#9A9A9A] text-xs flex items-center gap-2">
                                  <span className="w-1 h-1 bg-[#D7263D] rounded-full" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>

                      {viewMode === 'list' && (
                        <div className="flex items-center gap-4 mt-4">
                          {product.type === 'commercial' ? (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigate('quote');
                              }}
                              variant="outline"
                              className="border-[#D7263D] text-[#D7263D] hover:bg-[#D7263D]/10 rounded-full"
                            >
                              Request Quote
                            </Button>
                          ) : (
                            <>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                }}
                                variant="outline"
                                className="border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full"
                              >
                                Add to Cart
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                  onNavigate('checkout');
                                }}
                                className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full"
                              >
                                Buy Now
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
