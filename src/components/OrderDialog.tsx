
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
  const [locality, setLocality] = useState<string>(user?.locality || '');
  const [pincode, setPincode] = useState<string>(user?.pincode || '');
  const [city, setCity] = useState<string>(user?.city || '');
  const [state, setState] = useState<string>(user?.state || '');
  const [district, setDistrict] = useState<string>(user?.district || '');


  // Get addresses for the current user
  // const userAddresses = user
  //   ? mockUsers.find(u => u.id === user.id)?.addresses || []
  //   : [];

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



 

    // Handle multiple products case

    let overalOrderPrice = 0;

    if (products && products.length > 0) {
      const orderProduct = products.map(item => {
        const totalPrice = item.product.price * item.quantity;
        overalOrderPrice += totalPrice;
        
        return {
            id: null,
            product: item.product,
            quantity:item.quantity,
            price: totalPrice,
        };
      });

      const newOrder: Omit<Order, 'id' | 'orderedAt'> = {
        orderProducts: orderProduct,
        orderdate: new Date(),
        finalprice:overalOrderPrice,
        seller: products[0].product?.seller,
        buyer: user,
        status: 'pending',
        locality: locality,
        city: city,
        state: state,
        district: district,
        pincode: pincode
      };
      onPlaceOrder(newOrder);
    } 
    // Handle single product case
    else if (product) {
      const totalPrice = product.price * quantity;

      const newOrder: Omit<Order, 'id' | 'orderedAt'> = {
        orderProducts: [{
          id: null,
          product: product,
          quantity,
          price: totalPrice,
        }],
       
        orderdate: new Date(),
        finalprice:totalPrice,
        seller: product?.seller,
        buyer: user,
        status: 'pending',        
        locality: locality,
        city: city,
        state: state,
        district: district,
        pincode: pincode
      };

      onPlaceOrder(newOrder);
    }
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setQuantity(1);
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
      <DialogContent className="sm:max-w-[600px]" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
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
                          src={`data:image/jpeg;base64,${item?.product?.image}`}
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
                        ₹{item.product.price.toFixed(2)} / {item.product.sellunit} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
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
                   src={`data:image/jpeg;base64,${product.image}`}
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
                  <p className="text-sm text-gray-500">₹{product.price.toFixed(2)} / {product.sellunit}</p>
                </div>
              </div>
            )}

            {/* Show quantity field only for single product */}
            {product && !products && (
              <div>
                <Label htmlFor="quantity">Quantity ({product.sellunit})</Label>
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
                value={`₹${totalPrice.toFixed(2)}`}
                disabled
                className="mt-1"
              />
            </div>      

               <div>
              <Label htmlFor="locality">Locality</Label>
              <Input
                id="locality"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="mt-1"
              />
            </div>  
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1"
              />
            </div>  

            <div>
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1"
              />
            </div> 
          <div>
              <Label htmlFor="pin">Pin Code</Label>
              <Input
                id="pin"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="mt-1"
              />
            </div>
          

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              resetForm();
              onClose();
            }}>
              Cancel
            </Button>
            <Button type="submit" disabled={!user}>
              Place Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
