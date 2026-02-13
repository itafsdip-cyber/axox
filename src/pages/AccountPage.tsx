import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Headphones, 
  LogOut, 
  ChevronRight,
  FileText,
  Wrench,
  MessageSquare
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import type { Product } from '@/types';

interface AccountPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered' as const,
    items: [{ name: 'Treadmill AX-9000', quantity: 1 }],
    total: 12999,
  },
  {
    id: 'ORD-2024-002',
    date: '2024-02-01',
    status: 'processing' as const,
    items: [{ name: 'Dumbbell Set 2-20 kg', quantity: 1 }],
    total: 2199,
  },
];

const mockAddresses = [
  {
    id: '1',
    label: 'Home',
    street: '123 Sheikh Zayed Road',
    city: 'Dubai',
    emirate: 'Dubai',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Office',
    street: '456 Business Bay',
    city: 'Dubai',
    emirate: 'Dubai',
    isDefault: false,
  },
];

export function AccountPage({ onNavigate }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const { wishlist, user } = useStore();
  
  const userName = user?.name || 'Khalid Al-Rashid';
  const userEmail = user?.email || 'khalid@example.com';
  
  return (
    <div className="min-h-screen bg-[#0F0F10] pt-24 pb-16">
      <div className="px-6 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F4F4] mb-2 font-['Sora']">
              Welcome back, {userName.split(' ')[0]}.
            </h1>
            <p className="text-[#9A9A9A]">
              Manage your orders, addresses, and preferences.
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden sm:flex border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-[#17181A] rounded-2xl p-2 mb-8 flex flex-wrap gap-2 h-auto">
            {[
              { value: 'profile', label: 'Profile', icon: User },
              { value: 'orders', label: 'Orders', icon: Package },
              { value: 'addresses', label: 'Addresses', icon: MapPin },
              { value: 'wishlist', label: 'Wishlist', icon: Heart },
              { value: 'support', label: 'Support', icon: Headphones },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 px-4 py-3 rounded-xl data-[state=active]:bg-[#D7263D] data-[state=active]:text-white text-[#9A9A9A]"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="profile" className="mt-0">
            <div className="bg-[#17181A] rounded-2xl p-6 lg:p-8 max-w-2xl">
              <h2 className="text-xl font-bold text-[#F4F4F4] mb-6 font-['Sora']">
                Personal Information
              </h2>
              
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#9A9A9A] text-sm mb-2 block">Full Name</label>
                    <input
                      type="text"
                      defaultValue={userName}
                      className="w-full bg-[#0F0F10] border border-white/10 rounded-xl px-4 h-12 text-[#F4F4F4]"
                    />
                  </div>
                  <div>
                    <label className="text-[#9A9A9A] text-sm mb-2 block">Email</label>
                    <input
                      type="email"
                      defaultValue={userEmail}
                      className="w-full bg-[#0F0F10] border border-white/10 rounded-xl px-4 h-12 text-[#F4F4F4]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-[#9A9A9A] text-sm mb-2 block">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+971 50 123 4567"
                    className="w-full bg-[#0F0F10] border border-white/10 rounded-xl px-4 h-12 text-[#F4F4F4]"
                  />
                </div>
                
                <Button className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full px-8">
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-0">
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-[#17181A] rounded-2xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[#F4F4F4] font-medium">{order.id}</p>
                      <p className="text-[#9A9A9A] text-sm">{order.date}</p>
                    </div>
                    <Badge
                      className={
                        order.status === 'delivered'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-[#D7263D]/20 text-[#D7263D]'
                      }
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, i) => (
                      <p key={i} className="text-[#9A9A9A] text-sm">
                        {item.name} x {item.quantity}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <p className="text-[#F4F4F4] font-bold">
                      AED {order.total.toLocaleString()}
                    </p>
                    <Button
                      variant="ghost"
                      className="text-[#D7263D] hover:text-[#b91d32]"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Invoice
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="addresses" className="mt-0">
            <div className="grid sm:grid-cols-2 gap-4">
              {mockAddresses.map((address) => (
                <div key={address.id} className="bg-[#17181A] rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-[#D7263D]" />
                      <span className="text-[#F4F4F4] font-medium">{address.label}</span>
                    </div>
                    {address.isDefault && (
                      <Badge className="bg-[#D7263D]/20 text-[#D7263D]">Default</Badge>
                    )}
                  </div>
                  
                  <div className="text-[#9A9A9A] text-sm space-y-1">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.emirate}</p>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full"
                    >
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#9A9A9A] hover:text-[#D7263D]"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <button className="bg-[#17181A]/50 border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-[#D7263D]/50 transition-colors">
                <MapPin className="h-8 w-8 text-[#9A9A9A] mb-2" />
                <span className="text-[#9A9A9A]">Add New Address</span>
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="wishlist" className="mt-0">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 bg-[#17181A] rounded-2xl">
                <Heart className="h-16 w-16 text-[#9A9A9A] mx-auto mb-4" strokeWidth={1} />
                <p className="text-[#9A9A9A] text-lg mb-4">Your wishlist is empty</p>
                <Button
                  onClick={() => onNavigate('collection')}
                  className="bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-full"
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((product: Product) => (
                  <div
                    key={product.id}
                    onClick={() => onNavigate('product', product.id)}
                    className="bg-[#17181A] rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    <div className="aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-[#F4F4F4] font-medium group-hover:text-[#D7263D] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[#9A9A9A] text-sm mt-1">
                        AED {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="support" className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: MessageSquare,
                  title: 'Report an Issue',
                  description: 'Get help with your order or product',
                  action: 'Contact Support',
                },
                {
                  icon: Wrench,
                  title: 'Warranty Claim',
                  description: 'File a warranty claim for your equipment',
                  action: 'Start Claim',
                },
                {
                  icon: FileText,
                  title: 'Documentation',
                  description: 'Access manuals and guides',
                  action: 'View Docs',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#17181A] rounded-2xl p-6">
                  <item.icon className="h-8 w-8 text-[#D7263D] mb-4" />
                  <h3 className="text-[#F4F4F4] font-medium mb-2">{item.title}</h3>
                  <p className="text-[#9A9A9A] text-sm mb-4">{item.description}</p>
                  <Button
                    variant="outline"
                    className="border-white/20 text-[#F4F4F4] hover:bg-white/5 rounded-full w-full"
                  >
                    {item.action}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
