import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Building2, Phone, Mail, MapPin, Package, Users, FileText } from 'lucide-react';
import { products } from '@/data/products';

interface QuotePageProps {
  onNavigate: (page: string) => void;
}

export function QuotePage({ onNavigate }: QuotePageProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
        <div className="px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-[#D7263D]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-[#D7263D]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
              Quote Request Received
            </h1>
            <p className="text-[#9A9A9A] mb-8">
              Thank you for your interest. Our commercial team will contact you within 24 hours with a customized quote.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => onNavigate('home')}
                className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8"
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('collection')}
                className="border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full px-8"
              >
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16 relative">
      <div className="absolute inset-0 z-0">
        <img
          src="/quote_background.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F10] via-[#0F0F10]/90 to-[#0F0F10]" />
      </div>
      
      <div className="relative z-10 px-6 lg:px-16 xl:px-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F4F4] mb-4 font-['Sora']">
              Request a Quote
            </h1>
            <p className="text-[#9A9A9A] max-w-xl mx-auto">
              Tell us what you need. We'll build a package that fits your facility.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-[#17181A]/95 backdrop-blur-sm rounded-2xl p-6 lg:p-10">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[#9A9A9A] flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  required
                  placeholder="John Smith"
                  className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#9A9A9A] flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  required
                  type="tel"
                  placeholder="+971 XX XXX XXXX"
                  className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#9A9A9A] flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  required
                  type="email"
                  placeholder="john@company.com"
                  className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#9A9A9A] flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company Name
                </Label>
                <Input
                  required
                  placeholder="Your Company"
                  className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#9A9A9A] flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Emirate
                </Label>
                <select
                  required
                  className="w-full bg-[#0F0F10] border border-white/10 text-[#F4F4F4] rounded-xl h-12 px-4"
                >
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
              
              <div className="space-y-2">
                <Label className="text-[#9A9A9A] flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Product of Interest
                </Label>
                <select
                  required
                  className="w-full bg-[#0F0F10] border border-white/10 text-[#F4F4F4] rounded-xl h-12 px-4"
                >
                  <option value="">Select Product</option>
                  {products
                    .filter((p) => p.type === 'commercial')
                    .map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  <option value="multiple">Multiple Products</option>
                  <option value="custom">Custom Package</option>
                </select>
              </div>
              
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-[#9A9A9A]">Quantity Needed</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g., 5"
                  className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl h-12"
                />
              </div>
              
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-[#9A9A9A] flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Additional Notes
                </Label>
                <Textarea
                  placeholder="Tell us about your facility, timeline, or any specific requirements..."
                  rows={4}
                  className="bg-[#0F0F10] border-white/10 text-[#F4F4F4] placeholder:text-[#9A9A9A] rounded-xl resize-none"
                />
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full h-14 mt-8 text-base"
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </Button>
            
            <p className="text-[#9A9A9A] text-sm text-center mt-4">
              Our commercial team will respond within 24 hours.
            </p>
          </form>
          
          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { value: '500+', label: 'Commercial Clients' },
              { value: '24h', label: 'Response Time' },
              { value: '5-Year', label: 'Warranty' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-[#D7263D] font-['Sora']">
                  {stat.value}
                </p>
                <p className="text-[#9A9A9A] text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
