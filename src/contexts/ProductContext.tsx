
import React, { createContext, useContext, useState } from 'react';
import { Product, Order } from '../lib/types';
import { mockProducts, mockOrders } from '../lib/mockData';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

interface ProductContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'orderedAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getProductsByOwnerId: (ownerId: string) => Product[];
  getOrdersByBuyerId: (buyerId: string) => Order[];
  getOrdersBySellerId: (sellerId: string) => Order[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();
  const { user } = useAuth();

  const addProduct = (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add products",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      ...product,
      id: `product_${Date.now()}`,
      sellerId: user.id,
      sellerName: user.name,
    };

    setProducts([...products, newProduct]);
    toast({
      title: "Success",
      description: "Product added successfully",
    });
  };

  const updateProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
    toast({
      title: "Success",
      description: "Product updated successfully",
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
  };

  const addOrder = (order: Omit<Order, 'id' | 'orderedAt'>) => {
    const newOrder: Order = {
      ...order,
      id: `order_${Date.now()}`,
      orderedAt: new Date().toISOString(),
    };

    setOrders([...orders, newOrder]);
    toast({
      title: "Success",
      description: "Order placed successfully",
    });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    toast({
      title: "Success",
      description: `Order status updated to ${status}`,
    });
  };

  const getProductsByOwnerId = (ownerId: string) => {
    return products.filter(product => product.sellerId === ownerId);
  };

  const getOrdersByBuyerId = (buyerId: string) => {
    return orders.filter(order => order.buyerId === buyerId);
  };

  const getOrdersBySellerId = (sellerId: string) => {
    return orders.filter(order => order.sellerId === sellerId);
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
