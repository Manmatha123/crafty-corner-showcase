
import React, { useEffect, useState } from 'react';
import { PaintBucket, GalleryHorizontal, Pencil, Frame, Hand } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Category } from '@/lib/types';
import axios from 'axios';

const CategorySection = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [api, setApi] = React.useState<any>(null);
  
  const [categoryList,setCategoryList]=useState<Category[]>([]);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    fetchAllcategory();
  }, []);
 
  const fetchAllcategory = async () => {
    const res = await axios.get(`${BASE_URL}/v1/api/categories/list`,{
      headers: {
        'ngrok-skip-browser-warning': '1',
      }
    });
    setCategoryList(res.data);
  }


  return (
    <section className="py-16 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-craft-900 mb-4">Shop by Category</h2>
          <p className="text-craft-700 max-w-2xl mx-auto">
            Browse through our handpicked collection of unique handcrafted items across various categories
          </p>
        </div>
        
        <Carousel 
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative px-4"
        >
          <CarouselContent>
            {categoryList && categoryList.map((category) => (
              <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5 pl-4">
                <Link to={`/filter/category/${category.id}`} className="category-card">
                  <Card className="h-full border-2 border-transparent hover:border-craft-200">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                      <div className={`bg-blue-100 text-blue-600 p-3 rounded-full mb-4`}>
                        <Frame className="w-6 h-6" />
                      </div>
                      <h3 className="font-medium text-lg mb-2 text-craft-800">{category.name}</h3>
                    
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 lg:-left-12" />
          <CarouselNext className="right-0 lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategorySection;
