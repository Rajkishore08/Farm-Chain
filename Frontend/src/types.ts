export interface Product {
  id: string;
  name: string;
  farmer: string;
  type: string;
  quantity: number;
  basePrice: number;
  price: number;
  location: {
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    }
  };
  imageUrl: string;
  description: string;
  maxDeliveryDistance: number;
  unit: string;
  category: 'Vegetables' | 'Fruits' | 'Grains' | 'Dairy' | 'Spices';
  shelfLife: number; // in days
  transactionHash?: string;
  blockNumber?: number;
  timestamp?: number;
  supplyChainSteps?: SupplyChainStep[];
}

export interface SupplyChainStep {
  id: string;
  date: string;
  location: string;
  action: string;
  verifier: string;
  temperature?: number;
  humidity?: number;
}

export interface Farmer {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    }
  };
  products: Product[];
  rating: number;
  joinedDate: string;
  walletAddress: string;
  totalSales: number;
  verificationStatus: 'verified' | 'pending' | 'unverified';
}

export type ProductFilter = {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  maxDistance?: number;
  category?: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: string | null;
  balance: string | null;
}

export interface UserLocation {
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  }
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  unit: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}