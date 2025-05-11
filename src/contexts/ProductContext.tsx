
import React, { createContext, useContext, useState } from 'react';
import { Product, Order } from '../lib/types';
import { mockProducts, mockOrders } from '../lib/mockData';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { assert } from 'console';

interface ProductContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => void;
  updateProduct: (formData: FormData) => void;
  deleteProduct: (productId: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'orderedAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getProductsByOwnerId: (ownerId: string) => Product[];
  getOrdersByBuyerId: (buyerId: string) => Order[];
  getOrdersBySellerId: (sellerId: string) => Order[];
  setFilteredProducts: (filtered: Product[]) => void;

}

const ProductContext = createContext<ProductContextType | undefined>(undefined);


const BASE_URL = import.meta.env.VITE_API_URL;
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>();
  const { toast } = useToast();
  const { user } = useAuth();
  const setFilteredProducts = (filtered: Product[]) => {
    setProducts(filtered);
  };
  

  const addProduct = (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => {
 
  };

  const updateProduct = async (formData: FormData) => {

    let authToken = localStorage.getItem('authToken');
    authToken = JSON.parse(authToken);

    const res = await axios.post(`${BASE_URL}/v1/api/product/saveorupdate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`,
        'ngrok-skip-browser-warning' : '1'
      },
    });


    toast({
      title: "Success",
      description: "Product updated successfully",
    });
  };

  const deleteProduct = async (productId: string) => {
    let authToken = localStorage.getItem('authToken');
    authToken = JSON.parse(authToken);
    const res = await axios.delete(`${BASE_URL}/v1/api/product/delete/id/${productId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'ngrok-skip-browser-warning' : '1'
      }
    });
    if (res.data.status) {
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Something went wrong while deleting the product",
        variant: "destructive",
      });
      return;
    }

  };

  const addOrder = async(order: Omit<Order, 'id' | 'orderedAt'>) => {
    const newOrder: Order = {
      ...order,
      id: null,
    };
const authtoken= localStorage.getItem('authToken');
const token=JSON.parse(authtoken);
if(!token) {
  console.error('Please login');
  return;
}

    const res=await axios.post(`${BASE_URL}/v1/api/order/saveorupdate`, newOrder, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning' : '1'
    }}  
    );
   
    toast({
      title: "Success",
      description: "Order placed successfully",
    });
  };

  const updateOrderStatus = async(orderId: any, status: Order['status']) => {
    
    const authtoken= localStorage.getItem('authToken');
    const token=JSON.parse(authtoken);
    if(!token) {
      console.error('Please login');
      return;
    }
    
        const res=await axios.get(`${BASE_URL}/v1/api/order/status/id/${orderId}/${status}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning' : '1'
        }}  
        );
        if(res.data.status){
          toast({
            title: "Success",
            description: `Order status updated to ${status}`,
          });
        }else{
          toast({
            title: "Error",
            description: `Something went wrong`,
          });
        }

  };

  const getProductsByOwnerId = (ownerId: string) => {
    return products;
    // return products.filter(product => product.sellerId === ownerId);
  };

  const getOrdersByBuyerId = (buyerId: string) => {
    return orders;
  };

  const getOrdersBySellerId = (sellerId: string) => {
    return orders;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        getProductsByOwnerId,
        getOrdersByBuyerId,
        getOrdersBySellerId,
        setFilteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
