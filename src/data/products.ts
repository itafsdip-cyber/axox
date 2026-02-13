import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'ax-9000',
    name: 'Treadmill AX-9000',
    price: 12999,
    category: 'cardio',
    type: 'home',
    image: '/product_treadmill.jpg',
    badge: 'Best Seller',
    description: 'Commercial-grade motor, responsive deck, and a console that keeps pace with your data.',
    specs: {
      motor: '3.5 HP',
      speed: '0.8–20 km/h',
      capacity: '150 kg',
      warranty: '5 Years',
    },
    highlights: [
      'Commercial-grade 3.5 HP motor',
      'Responsive shock-absorbing deck',
      'Advanced console with training programs',
      'Heart rate monitoring',
    ],
    usps: ['Free Installation', '5-Year Warranty', 'Commercial Grade'],
  },
  {
    id: 'ax-7000',
    name: 'Treadmill AX-7000',
    price: 8499,
    category: 'cardio',
    type: 'home',
    image: '/product_treadmill_ax7000.jpg',
    description: 'Powerful home treadmill with premium features at an accessible price point.',
    specs: {
      motor: '3.0 HP',
      speed: '1–18 km/h',
      capacity: '130 kg',
      warranty: '3 Years',
    },
    highlights: [
      '3.0 HP continuous duty motor',
      '12 preset workout programs',
      'Foldable design for easy storage',
      'Bluetooth connectivity',
    ],
    usps: ['Free Installation', '3-Year Warranty'],
  },
  {
    id: 'ex-550',
    name: 'Elliptical EX-550',
    price: 7499,
    category: 'cardio',
    type: 'home',
    image: '/product_elliptical.jpg',
    description: 'Low-impact full-body workout with smooth magnetic resistance.',
    specs: {
      motor: 'N/A',
      speed: 'N/A',
      capacity: '135 kg',
      warranty: '3 Years',
    },
    highlights: [
      '20 levels of magnetic resistance',
      'Front-drive design for natural stride',
      'Dual-action handlebars',
      'Tablet holder included',
    ],
    usps: ['Free Installation', '3-Year Warranty'],
  },
  {
    id: 'rx-200',
    name: 'Rowing Machine RX-200',
    price: 5999,
    category: 'cardio',
    type: 'home',
    image: '/product_rowing.jpg',
    description: 'Air resistance rowing machine for an authentic on-water feel.',
    specs: {
      motor: 'N/A',
      speed: 'N/A',
      capacity: '140 kg',
      warranty: '3 Years',
    },
    highlights: [
      'Air resistance with damper settings',
      'Performance monitor with PM5',
      'Foldable for storage',
      'Commercial-grade chain',
    ],
    usps: ['Free Installation', '3-Year Warranty'],
  },
  {
    id: 'sx-300',
    name: 'Spin Bike SX-300',
    price: 4299,
    category: 'cardio',
    type: 'home',
    image: '/product_spinbike.jpg',
    description: 'Studio-quality spin bike for intense cardio sessions at home.',
    specs: {
      motor: 'N/A',
      speed: 'N/A',
      capacity: '125 kg',
      warranty: '2 Years',
    },
    highlights: [
      'Heavy 18kg flywheel',
      'Magnetic resistance system',
      'Fully adjustable seat and handlebars',
      'SPD-compatible pedals',
    ],
    usps: ['Free Installation', '2-Year Warranty'],
  },
  {
    id: 'mx-800',
    name: 'Multi Gym MX-800',
    price: 14999,
    category: 'strength',
    type: 'commercial',
    image: '/product_multigym.jpg',
    description: 'Complete home gym station with multiple exercise stations.',
    specs: {
      motor: 'N/A',
      speed: 'N/A',
      capacity: '200 kg',
      warranty: '5 Years',
    },
    highlights: [
      'Over 50 exercise options',
      '200 lb weight stack included',
      'Lat pulldown and low row station',
      'Leg developer attachment',
    ],
    usps: ['Commercial Grade', '5-Year Warranty', 'Free Installation'],
  },
  {
    id: 'cable-pro',
    name: 'Cable Crossover Pro',
    price: 8999,
    category: 'strength',
    type: 'commercial',
    image: '/product_cable.jpg',
    description: 'Dual pulley cable system for functional training.',
    specs: {
      motor: 'N/A',
      speed: 'N/A',
      capacity: '180 kg',
      warranty: '5 Years',
    },
    highlights: [
      'Dual 160 lb weight stacks',
      'Adjustable pulley heights',
      'Multiple attachment points',
      'Commercial-grade cables',
    ],
    usps: ['Commercial Grade', '5-Year Warranty'],
  },
  {
    id: 'leg-press-500',
    name: 'Leg Press LP-500',
    price: 6999,
    category: 'strength',
    type: 'commercial',
    image: '/product_legpress.jpg',
    description: 'Plate-loaded leg press for serious lower body training.',
    specs: {
      motor: 'N/A',
      speed: 'N/A',
      capacity: '400 kg',
      warranty: '5 Years',
    },
    highlights: [
      '45-degree angle design',
      'Large footplate',
      'Safety lockout system',
      'Weight plate storage',
    ],
    usps: ['Commercial Grade', '5-Year Warranty'],
  },
  {
    id: 'dumbbell-set',
    name: 'Dumbbell Set 2–20 kg',
    price: 2199,
    category: 'weight',
    type: 'home',
    image: '/product_dumbbells.jpg',
    description: 'Complete rubber dumbbell set with storage rack.',
    specs: {
      motor: 'N/A',
      speed: 'N/A',
      capacity: 'N/A',
      warranty: '2 Years',
    },
    highlights: [
      '10 pairs from 2-20kg',
      'Hexagonal design prevents rolling',
      'Rubber coating protects floors',
      'Steel rack included',
    ],
    usps: ['2-Year Warranty'],
  },
  {
    id: 'bench-bx400',
    name: 'Bench Press BX-400',
    price: 3499,
    category: 'weight',
    type: 'home',
    image: '/product_bench.jpg',
    description: 'Adjustable bench for flat, incline, and decline exercises.',
    specs: {
      motor: 'N/A',
      speed: 'N/A',
      capacity: '300 kg',
      warranty: '3 Years',
    },
    highlights: [
      '7 back pad positions',
      '4 seat positions',
      'Heavy-duty steel frame',
      'Transport wheels',
    ],
    usps: ['3-Year Warranty'],
  },
  {
    id: 'kettlebell-set',
    name: 'Kettlebell Set',
    price: 1299,
    category: 'accessories',
    type: 'home',
    image: '/product_kettlebell.jpg',
    description: 'Cast iron kettlebell set for functional training.',
    specs: {
      motor: 'N/A',
      speed: 'N/A',
      capacity: 'N/A',
      warranty: '2 Years',
    },
    highlights: [
      '4 kettlebells: 4, 8, 12, 16 kg',
      'Cast iron construction',
      'Wide comfortable handles',
      'Flat base for stability',
    ],
    usps: ['2-Year Warranty'],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getHomeProducts = (): Product[] => {
  return products.filter((p) => p.type === 'home');
};

export const getCommercialProducts = (): Product[] => {
  return products.filter((p) => p.type === 'commercial');
};
