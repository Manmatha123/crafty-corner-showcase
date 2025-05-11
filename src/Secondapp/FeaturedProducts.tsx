
import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Product } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
const [productList,setProductList]=React.useState<Product[]>([]);
const navigate=useNavigate();


  useEffect(() => {
    fetchLatestProductList();
  }, []);
 
  const fetchLatestProductList = async () => {
    const res = await axios.get(`${BASE_URL}/v1/public/api/product/filter-latest?page=0&size=8`,{
      headers: {
        'ngrok-skip-browser-warning': '1',
      }
    });
    setProductList(res.data.content);
  }
  // /v1/public/api/product/filter-latest
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-craft-900 mb-2">Latest Products</h2>
            <p className="text-craft-700">Handpicked items crafted with attention to detail</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Button variant="outline" onClick={()=>navigate("/filter")}>View All Products</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
            <ProductCard 
              key={product.id}
              id={Number(product.id)}
              name={product.name}
              image={product.image}
              price={product.price}
              category={product.category}
              artist={product?.seller?.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
