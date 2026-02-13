export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'cardio' | 'strength' | 'weight' | 'accessories';
  type: 'home' | 'commercial';
  image: string;
  badge?: string;
  description: string;
  specs: {
    motor?: string;
    speed?: string;
    capacity?: string;
    warranty?: string;
  };
  highlights: string[];
  usps: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  emirate: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped';
  items: CartItem[];
  total: number;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  company: string;
  emirate: string;
  product: string;
  quantity: number;
  notes: string;
}
