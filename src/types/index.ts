export type ProductCategory =
  | 'All'
  | 'Chargers'
  | 'Cables'
  | 'Audio Devices'
  | 'Wearables'
  | 'Mobile Holders'
  | 'Other Accessories';

export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  authorCity?: string;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount?: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in PKR
  originalPrice?: number;
  image: string;
  tagline: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  inStock: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'easypaisa' | 'jazzcash' | 'bank_transfer';

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  address: string;
  city: string;
  province: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  date: string;
  status: 'Confirmed' | 'Dispatched' | 'In Transit' | 'Delivered';
}
