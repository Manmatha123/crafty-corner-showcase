export interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  sellunit: string; // kg/ liter/ pic
  seller: User;
}

export interface Category {
id:number,
name:string
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
  userAdditional:AditionalUserInfo;
}

export interface AditionalUserInfo {
  id: number;
  customorder: boolean;
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
  orderProducts: OrderProduct[];
  orderdate: Date;
  finalprice: number;
  seller: User;
  buyer: User;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';

  locality: String;
  city: String;
  state: String;
  district: String;
  pincode: String;
  // orderedAt: string;
}


export interface OrderProduct{
  id: string;
  product:Product;
  quantity: number;
  price: number;
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

export interface ProductC {
  id: string;
  name: string;
  price: number;
  category: string;
}
