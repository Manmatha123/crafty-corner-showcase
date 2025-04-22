import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import OrderDialog from '@/components/OrderDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductContext';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/lib/types';
import { mockUsers } from '@/lib/mockData';
import { ArrowLeft, User, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const SellerPage = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const { products, addOrder } = useProducts();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedProducts, setSelectedProducts] = useState<{ product: Product; quantity: number }[]>([]);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const sellerInfo = useMemo(() => {
    return sellerId ? mockUsers.find(u => u.id === sellerId) : null;
  }, [sellerId]);

  const sellerProducts = useMemo(() => {
    return sellerId ? products.filter(p => p.sellerId === sellerId) : [];
  }, [sellerId, products]);

  const handleOrderClick = (product: Product, quantity: number) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const existingProduct = selectedProducts.find(p => p.product.id === product.id);
    if (existingProduct) {
      setSelectedProducts(prevProducts =>
        prevProducts.map(p =>
          p.product.id === product.id ? { ...p, quantity } : p
        )
      );
    } else {
      setSelectedProducts(prev => [...prev, { product, quantity }]);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.product.id !== productId));
  };

  const handlePlaceOrder = (orders: any) => {
    orders.forEach((order: any) => {
      addOrder(order);
    });
    setSelectedProducts([]);
    setIsOrderDialogOpen(false);
  };

  const cartItemsCount = selectedProducts.reduce((sum, item) => sum + item.quantity, 0);

  if (!sellerId || !sellerInfo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Seller not found</h2>
            <p className="mt-2 text-gray-600">Sorry, we couldn't find this seller.</p>
            <Link to="/">
              <Button className="mt-4">Back to Home</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="inline-flex items-center text-brand-600 hover:text-brand-700">
            <ArrowLeft size={16} className="mr-1" />
            Back to all products
          </Link>
          
          {selectedProducts.length > 0 && (
            <Button 
              onClick={() => setIsOrderDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              Cart ({cartItemsCount})
            </Button>
          )}
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-16 w-16 bg-gradient-to-br from-brand-100 to-brand-300 rounded-full flex items-center justify-center">
                <User size={32} className="text-brand-700" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{sellerInfo.name}</h1>
                <p className="text-gray-500">Seller</p>
                <p className="text-sm text-gray-500 mt-1">Location: {sellerProducts[0]?.location || 'Unknown'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-6">Products by {sellerInfo.name}</h2>

        {sellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerProducts.map(product => {
              const cartItem = selectedProducts.find(p => p.product.id === product.id);
              return (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onOrder={handleOrderClick}
                  quantityInCart={cartItem?.quantity}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">This seller has no products available yet.</p>
          </div>
        )}
      </main>

      <OrderDialog
        products={selectedProducts}
        isOpen={isOrderDialogOpen}
        onClose={() => setIsOrderDialogOpen(false)}
        onPlaceOrder={handlePlaceOrder}
        onRemoveProduct={handleRemoveFromCart}
      />
    </div>
  );
};

export default SellerPage;
