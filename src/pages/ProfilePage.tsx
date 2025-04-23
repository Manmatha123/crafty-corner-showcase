import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AddressForm from '@/components/AddressForm';
import ProductForm from '@/components/ProductForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useProducts } from '@/contexts/ProductContext';
import { Address, Order, Product, User } from '@/lib/types';
import { mockUsers } from '@/lib/mockData';
import { MapPin, ShoppingBag, Box, Plus, Edit, Package, User as UserIcon, Phone, Image } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { EditProfileDialog } from '@/components/EditProfileDialog';
import axios from 'axios';

const ProfilePage = () => {
  const { token, isAuthenticated } = useAuth();
  const { getProductsByOwnerId, getOrdersByBuyerId, getOrdersBySellerId,
    addProduct, updateProduct, deleteProduct, updateOrderStatus } = useProducts();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('my-orders');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const baseUrl = 'http://localhost:8083';

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getUserInfo();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
    }
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      let authToken = localStorage.getItem('authToken');
      authToken=JSON.parse(authToken);
      const res = await axios.get(`${baseUrl}/v1/api/user/info`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
      );
      setUser(res.data);
    } catch (error) {

    }
  }

  const userData = user;
  const userProducts = [];
  const buyerOrders = [];
  const sellerOrders = [];





  const handleUpdateAddress = (updatedAddress: Omit<Address, 'id'>) => {
    toast({
      title: "Success",
      description: "Address updated successfully!",
    });
    // In a real app, this would update the address
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => {
    addProduct(newProduct);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleUpdateProduct = (updatedProduct: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => {
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...updatedProduct,
      });
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleConfirmOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'confirmed');
  };

  const handleSaveProduct = (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => {
    if (editingProduct) {
      handleUpdateProduct(product);
    } else {
      handleAddProduct(product);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'my-orders':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">My Orders</h2>
            {buyerOrders.length > 0 ? (
              buyerOrders.map(order => (
                <Card key={order.id} className="animate-fade-in">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-[80px_1fr] gap-4">
                      <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1501162946741-4960f990fdf4?w=500&auto=format&fit=crop&q=60";
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{order.productName}</h3>
                          <Badge variant={
                            order.status === 'delivered' ? 'default' :
                              order.status === 'confirmed' ? 'secondary' :
                                'outline'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Quantity: {order.quantity} • Total: ${order.totalPrice.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Ordered on {new Date(order.orderedAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs mt-2 flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {order.address.street}, {order.address.city}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            )}
          </div>
        );

      case 'info':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Information</h2>
            </div>
            <Card className="animate-fade-in">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">
                        {user.locality}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      {user.city},{user.district},{user.state},{user.pincode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'orders-received':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Orders Received</h2>
            {sellerOrders.length > 0 ? (
              sellerOrders.map(order => (
                <Card key={order.id} className="animate-fade-in">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-[80px_1fr] gap-4">
                      <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1501162946741-4960f990fdf4?w=500&auto=format&fit=crop&q=60";
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{order.productName}</h3>
                          <Badge variant={
                            order.status === 'delivered' ? 'default' :
                              order.status === 'confirmed' ? 'secondary' :
                                'outline'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Quantity: {order.quantity} • Total: ${order.totalPrice.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Ordered on {new Date(order.orderedAt).toLocaleDateString()}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <p className="text-xs flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {order.address.street}, {order.address.city}
                          </p>
                          {order.status === 'pending' && (
                            <Button size="sm" onClick={() => handleConfirmOrder(order.id)}>
                              Confirm Order
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">You haven't received any orders yet.</p>
            )}
          </div>
        );

      case 'my-products':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Products</h2>
              <Button size="sm" onClick={() => {
                setEditingProduct(undefined);
                setShowProductForm(true);
              }}>
                <Plus size={16} className="mr-1" />
                Add Product
              </Button>
            </div>

            {userProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProducts.map(product => (
                  <Card key={product.id} className="animate-fade-in">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="h-24 w-24 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://images.unsplash.com/photo-1501162946741-4960f990fdf4?w=500&auto=format&fit=crop&q=60";
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{product.name}</h3>
                            <Badge>{product.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            ${product.price.toFixed(2)} / {product.sellUnit}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Location: {product.location}
                          </p>
                          <div className="mt-2 flex justify-end space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                              <Edit size={14} className="mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You haven't added any products yet.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  const canSell = user.role === 'seller' || user.role === 'both';
  const canBuy = user.role === 'buyer' || user.role === 'both';

  const handleUpdateProfile = async (updatedProfile: Omit<User, 'id'>) => {
    try {
      const userObj:User={
        ...updatedProfile,
        id: user.id,
      }
      const res = await axios.post(`${baseUrl}/v1/api/user/update`, userObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (res.data.status) {
        toast({
          title: "Success",
          description: "Profile Update successful",
        });
        localStorage.setItem('authToken', JSON.stringify(res.data.message));
        setIsEditProfileOpen(false);
        getUserInfo();
      } else {
        toast({
          title: "Error",
          description: res.data.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{user.name}</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsEditProfileOpen(true)}>
                <Edit size={16} className="mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                <span className="text-sm text-gray-500">Mobile: {user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon size={16} className="text-gray-500" />
                <Badge className="mt-0" variant="outline">
                  {user.role === 'both' ? 'Buyer & Seller' : user.role === 'seller' ? 'Seller' : 'Buyer'}
                </Badge>
              </div>
              {user.locality && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">{user.locality}</span>
                </div>
              )}
              {user.district && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">{user.district}</span>
                </div>
              )}
              {user.city && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">{user.city}, {user.state} {user.pincode}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 border-b overflow-x-auto">
          <div className="flex space-x-6">
            {canBuy && (
              <button
                className={`pb-2 px-1 ${activeTab === 'my-orders' ? 'tab-active' : 'text-gray-500 hover:text-gray-700'} flex items-center`}
                onClick={() => setActiveTab('my-orders')}
              >
                <ShoppingBag size={16} className="mr-2" />
                My Orders
              </button>
            )}
            {canBuy && (
              <button
                className={`pb-2 px-1 ${activeTab === 'info' ? 'tab-active' : 'text-gray-500 hover:text-gray-700'} flex items-center`}
                onClick={() => setActiveTab('info')}
              >
                <MapPin size={16} className="mr-2" />
                My Info
              </button>
            )}
            {canSell && (
              <button
                className={`pb-2 px-1 ${activeTab === 'orders-received' ? 'tab-active' : 'text-gray-500 hover:text-gray-700'} flex items-center`}
                onClick={() => setActiveTab('orders-received')}
              >
                <Package size={16} className="mr-2" />
                Orders Received
              </button>
            )}
            {canSell && (
              <button
                className={`pb-2 px-1 ${activeTab === 'my-products' ? 'tab-active' : 'text-gray-500 hover:text-gray-700'} flex items-center`}
                onClick={() => setActiveTab('my-products')}
              >
                <Box size={16} className="mr-2" />
                My Products
              </button>
            )}
          </div>
        </div>

        <div className="py-4">
          {renderTabContent()}
        </div>
      </main>

      {/* <AddressForm
        address={editingAddress}
        isOpen={showAddressForm}
        onClose={() => setShowAddressForm(false)}
        onSave={editingAddress ? handleUpdateAddress : handleAddAddress}
      /> */}

      <ProductForm
        product={editingProduct}
        isOpen={showProductForm}
        onClose={() => setShowProductForm(false)}
        onSave={handleSaveProduct}
      />

      <EditProfileDialog
        user={user}
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleUpdateProfile}
      />
    </div>
  );
};

export default ProfilePage;
