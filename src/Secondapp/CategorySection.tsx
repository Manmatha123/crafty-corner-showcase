
import React, { useEffect } from 'react';
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

const categories = [
  {
    id: 1,
    name: "Artwork",
    description: "Original paintings & illustrations",
    icon: PaintBucket,
    color: "bg-red-100 text-red-600",
    link: "/filter/category=1"
  },
  {
    id: 2,
    name: "Pencil Art",
    description: "Detailed pencil drawings & sketches",
    icon: Pencil,
    color: "bg-gray-100 text-gray-600",
    link: "/filter/category=2"
  },
  {
    id: 3,
    name: "Photo Frames",
    description: "Handcrafted decorative frames",
    icon: Frame,
    color: "bg-amber-100 text-amber-600",
    link: "/filter/category=3"
  },
  {
    id: 4,
    name: "Handcrafts",
    description: "Unique handmade crafts & decorations",
    icon: Hand,
    color: "bg-blue-100 text-blue-600",
    link: "/filter/category=4"
  },
  {
    id: 5,
    name: "Wall Art",
    description: "Beautiful pieces to adorn your walls",
    icon: GalleryHorizontal,
    color: "bg-green-100 text-green-600",
    link: "/filter/category=5"
  }
];

const CategorySection = () => {
  const [api, setApi] = React.useState<any>(null);
  
  // Auto-slide every 3 seconds
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [api]);

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
            {categories.map((category) => (
              <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5 pl-4">
                <Link to={category.link} className="category-card">
                  <Card className="h-full border-2 border-transparent hover:border-craft-200">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                      <div className={`${category.color} p-3 rounded-full mb-4`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-medium text-lg mb-2 text-craft-800">{category.name}</h3>
                      <p className="text-sm text-craft-600">{category.description}</p>
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
