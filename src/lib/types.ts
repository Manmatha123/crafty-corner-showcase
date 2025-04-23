export interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  description: string;
  sellUnit: string; // kg/ liter/ pic
  location: string;
  sellerId: string;
  sellerName: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'seller' | 'buyer' | 'both';
  profileImage?: string;
  locality?: string;
  pincode?: string;
  password?: string;
  city?: string;
  state?: string;
  district?: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  totalPrice: number;
  sellerId: string;
  buyerId: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  additionalContact?: string;
  address: Address;
  orderedAt: string;
}

export type AuthUser = {
  id: string;
  name: string;
  phone: string;
  role: 'seller' | 'buyer' | 'both';
  loggedIn: boolean;
  city?: string;
  state?: string;
  district?: string;
  locality?: string;
  pincode?: string;
};
