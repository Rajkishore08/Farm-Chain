import type { Product } from '../types';

// User location (Coimbatore)
export const USER_LOCATION = {
  city: 'Coimbatore',
  state: 'Tamil Nadu',
  coordinates: {
    lat: 11.0168,
    lng: 76.9558
  }
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fresh Local Tomatoes',
    farmer: 'Senthil Kumar',
    type: 'Fresh Produce',
    quantity: 100,
    basePrice: 1000,
    price: 1000,
    location: {
      city: 'Mettupalayam',
      state: 'Tamil Nadu',
      coordinates: {
        lat: 11.2990,
        lng: 76.9422
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000',
    description: 'Fresh, locally grown tomatoes from Mettupalayam farms',
    maxDeliveryDistance: 50,
    unit: 'kg',
    category: 'Vegetables',
    shelfLife: 7
  },
  {
    id: '2',
    name: 'Premium Basmati Rice',
    farmer: 'Sukhwinder Singh',
    type: 'Grains',
    quantity: 500,
    basePrice: 1500,
    price: 1500,
    location: {
      city: 'Karnal',
      state: 'Haryana',
      coordinates: {
        lat: 29.6857,
        lng: 76.9905
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1000',
    description: 'High-quality basmati rice, aged for perfect aroma',
    maxDeliveryDistance: 2000,
    unit: 'kg',
    category: 'Grains',
    shelfLife: 365
  },
  {
    id: '3',
    name: 'Fresh Bananas',
    farmer: 'Murugan R',
    type: 'Fruits',
    quantity: 200,
    basePrice: 1200,
    price: 1200,
    location: {
      city: 'Pollachi',
      state: 'Tamil Nadu',
      coordinates: {
        lat: 10.6598,
        lng: 77.0083
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=1000',
    description: 'Fresh local bananas from Pollachi region',
    maxDeliveryDistance: 100,
    unit: 'dozen',
    category: 'Fruits',
    shelfLife: 7
  },
  {
    id: '4',
    name: 'Organic Carrots',
    farmer: 'Lakshmi P',
    type: 'Vegetables',
    quantity: 150,
    basePrice: 1100,
    price: 1100,
    location: {
      city: 'Ooty',
      state: 'Tamil Nadu',
      coordinates: {
        lat: 11.4102,
        lng: 76.6950
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=1000',
    description: 'Fresh organic carrots from the Nilgiris',
    maxDeliveryDistance: 150,
    unit: 'kg',
    category: 'Vegetables',
    shelfLife: 14
  },
  {
    id: '5',
    name: 'Premium Saffron',
    farmer: 'Mohammad Yaseen',
    type: 'Spices',
    quantity: 5,
    basePrice: 250000,
    price: 250000,
    location: {
      city: 'Pampore',
      state: 'Kashmir',
      coordinates: {
        lat: 34.0837,
        lng: 74.7973
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1600841867003-d904bd142d24?auto=format&fit=crop&q=80&w=1000',
    description: 'High-quality Kashmir saffron, known for its rich aroma',
    maxDeliveryDistance: 3000,
    unit: 'gram',
    category: 'Spices',
    shelfLife: 730
  },
  {
    id: '6',
    name: 'Organic Turmeric',
    farmer: 'Lakshmi Devi',
    type: 'Spices',
    quantity: 100,
    basePrice: 1800,
    price: 1800,
    location: {
      city: 'Erode',
      state: 'Tamil Nadu',
      coordinates: {
        lat: 11.3410,
        lng: 77.7172
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1615485290449-441a08e4e937?auto=format&fit=crop&q=80&w=1000',
    description: 'Organic turmeric powder, rich in curcumin',
    maxDeliveryDistance: 1500,
    unit: 'kg',
    category: 'Spices',
    shelfLife: 365
  },
  {
    id: '7',
    name: 'Local Green Chillies',
    farmer: 'Raman K',
    type: 'Vegetables',
    quantity: 50,
    basePrice: 1000,
    price: 1000,
    location: {
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      coordinates: {
        lat: 11.0168,
        lng: 76.9558
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&q=80&w=1000',
    description: 'Fresh green chillies from local farms',
    maxDeliveryDistance: 30,
    unit: 'kg',
    category: 'Vegetables',
    shelfLife: 10
  },
  {
    id: '8',
    name: 'Premium Cardamom',
    farmer: 'Joseph Thomas',
    type: 'Spices',
    quantity: 25,
    basePrice: 3500,
    price: 3500,
    location: {
      city: 'Munnar',
      state: 'Kerala',
      coordinates: {
        lat: 10.0889,
        lng: 77.0595
      }
    },
    imageUrl: 'https://images.unsplash.com/photo-1638228661208-14acae0878ed?auto=format&fit=crop&q=80&w=1000',
    description: 'High-quality cardamom from the Western Ghats',
    maxDeliveryDistance: 500,
    unit: 'kg',
    category: 'Spices',
    shelfLife: 365
  }
];