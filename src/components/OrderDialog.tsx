
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product, Address, Order } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { mockUsers } from '@/lib/mockData';
import { Trash2 } from 'lucide-react';

interface OrderDialogProps {
  products?: { product: Product; quantity: number }[];
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onPlaceOrder: (order: Omit<Order, 'id' | 'orderedAt'> | any[]) => void;
  onRemoveProduct?: (productId: string) => void;
}

const OrderDialog = ({ 
  product, 
  products, 
  isOpen, 
  onClose, 
  onPlaceOrder,
  onRemoveProduct 
}: OrderDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [additionalContact, setAdditionalContact] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');

  // Get addresses for the current user
  // const userAddresses = user
  //   ? mockUsers.find(u => u.id === user.id)?.addresses || []
  //   : [];
  const userAddresses=[];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!product && !products) || !user) {
      toast({
        title: "Error",
        description: "You must be logged in to place an order",
        variant: "destructive",
      });
      return;
    }

    if (!selectedAddressId) {
      toast({
        title: "Error",
        description: "Please select a delivery address",
        variant: "destructive",
      });
      return;
    }

    const selectedAddress = userAddresses.find(addr => addr.id === selectedAddressId);
    if (!selectedAddress) {
      toast({
        title: "Error",
        description: "Invalid address selected",
        variant: "destructive",
      });
      return;
    }

    // Handle multiple products case
    if (products && products.length > 0) {
      const orders = products.map(item => {
        const totalPrice = item.product.price * item.quantity;
        
        return {
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.image,
          quantity: item.quantity,
          totalPrice,
          sellerId: item.product.sellerId,
          buyerId: user.id,
          status: 'pending',
          additionalContact,
          address: selectedAddress,
        };
      });

      onPlaceOrder(orders);
    } 
    // Handle single product case
    else if (product) {
      const totalPrice = product.price * quantity;

      const newOrder: Omit<Order, 'id' | 'orderedAt'> = {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        quantity,
        totalPrice,
        sellerId: product.sellerId,
        buyerId: user.id,
        status: 'pending',
        additionalContact,
        address: selectedAddress,
      };

      onPlaceOrder(newOrder);
    }
    
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setQuantity(1);
    setAdditionalContact('');
    setSelectedAddressId(userAddresses[0]?.id || '');
  };

  // Calculate total price for all products
  const totalPrice = products 
    ? products.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    : product ? (product.price * quantity) : 0;

  return (
    <Dialog open={isOpen && (!!product || (products && products.length > 0))} onOpenChange={() => {
      resetForm();
      onClose();
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Place Order</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Display multiple products */}
            {products && products.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Items in Cart</h3>
                {products.map((item, index) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-4 border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 rounded overflow-hidden bg-gray-100">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1501162946741-4960f990fdf4?w=500&auto=format&fit=crop&q=60";
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">
                          ${item.product.price.toFixed(2)} / {item.product.sellUnit} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      {onRemoveProduct && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveProduct(item.product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Display single product */}
            {product && !products && (
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded overflow-hidden bg-gray-100">
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
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)} / {product.sellUnit}</p>
                </div>
              </div>
            )}

            {/* Show quantity field only for single product */}
            {product && !products && (
              <div>
                <Label htmlFor="quantity">Quantity ({product.sellUnit})</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label htmlFor="total">Total Price</Label>
              <Input
                id="total"
                value={`$${totalPrice.toFixed(2)}`}
                disabled
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Delivery Address</Label>
              {userAddresses.length > 0 ? (
                <Select 
                  value={selectedAddressId} 
                  onValueChange={setSelectedAddressId}
                >
                  <SelectTrigger id="address" className="mt-1">
                    <SelectValue placeholder="Select delivery address" />
                  </SelectTrigger>
                  <SelectContent>
                    {userAddresses.map((address) => (
                      <SelectItem key={address.id} value={address.id}>
                        {address.street}, {address.city}, {address.state} {address.zipCode}
                        {address.isDefault && " (Default)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-500 mt-1">
                  No address found. Please add an address in your profile.
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="additional-contact">Additional Contact Information (Optional)</Label>
              <Textarea
                id="additional-contact"
                placeholder="Any special instructions or additional contact details"
                value={additionalContact}
                onChange={(e) => setAdditionalContact(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              resetForm();
              onClose();
            }}>
              Cancel
            </Button>
            <Button type="submit" disabled={!user || userAddresses.length === 0}>
              Place Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
