import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, User, Plus, Minus } from 'lucide-react';
import { Product } from '@/lib/types';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface ProductCardProps {
  product: Product;
  onOrder: (product: Product, quantity: number) => void;
  quantityInCart?: number;
  pageName?: string;
}

const ProductCard = ({ product, onOrder, quantityInCart,pageName }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quantityInCart) {
      setQuantity(quantityInCart);
    }
  }, [quantityInCart]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setQuantity(newValue);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <Card className="overflow-hidden product-card h-full flex flex-col">
      <div className="relative h-48 bg-gray-100">
        <img
          src={`data:image/jpeg;base64,${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1501162946741-4960f990fdf4?w=500&auto=format&fit=crop&q=60";
          }}
        />
        <Link
          to={`/seller/${product?.seller?.id}`}
          className="absolute bottom-2 left-2 flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full shadow-sm hover:bg-opacity-100 transition-all"
        >
          <User size={16} className="mr-1 text-brand-600" />
          <span className="text-xs font-medium text-gray-700">{product?.seller?.name}</span>
        </Link>
        {quantityInCart ? (
          <Badge className="absolute top-2 right-2" variant="secondary">
            {quantityInCart} in cart
          </Badge>
        ) : null}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-lg text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {product.category.name} • {product?.seller?.locality}
        </p>
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-xl font-bold text-brand-600">
          ₹{product.price.toFixed(2)}
            <span className="text-sm font-normal text-gray-500"> / {product.sellunit}</span>
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={decrementQuantity}
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-20 h-8 text-center"
          />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={incrementQuantity}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="w-full mt-auto"
          onClick={() => onOrder(product, quantity)}
          variant={quantityInCart ? "secondary" : "default"}
        >
          <ShoppingBag size={18} className="mr-2" />
          {pageName&& pageName=="home"?"Order Now":(quantityInCart ? `Update Cart (${quantityInCart})` : 'Cart Product')}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
