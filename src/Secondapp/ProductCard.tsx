
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Category } from '@/lib/types';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  category: Category;
  artist: string;
}

const ProductCard = ({ id, name, image, price, category,artist }: ProductCardProps) => {


  const categoryId = category?.id;
  const productUrl = `/filter?category=${categoryId}&name=${encodeURIComponent(name)}`;

  return (
    <Link to={productUrl} className="block h-full">
      <Card className="product-card overflow-hidden h-full border border-muted flex flex-col hover:shadow-md transition-shadow">
        <div className="relative">
          <img 
           src={`data:image/jpeg;base64,${image}`}
            alt={name}
            className="w-full aspect-square object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&h=400';
            }}
          />
          <div className="absolute bottom-0 left-0 bg-craft-500 text-white px-3 py-1 text-xs">
            {category?.name}
          </div>
        </div>
        
        <CardContent className="pt-4 pb-0 flex-grow">
          <h3 className="font-medium text-craft-900 line-clamp-2 mb-1 hover:text-craft-600 transition-colors">{name}</h3>
          <p className="text-sm text-muted-foreground">by {artist}</p>
        </CardContent>
        
        <CardFooter className="pt-3 pb-4 flex items-center justify-between">
          <span className="font-semibold text-craft-900">₹{price.toFixed(2)}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
