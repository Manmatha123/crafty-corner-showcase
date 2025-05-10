
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonial = () => {
  return (
    <section className="py-16 bg-craft-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-craft-900 mb-4">What Our Customers Say</h2>
          <p className="text-craft-700 max-w-2xl mx-auto">
            Read what our satisfied customers have to say about our handcrafted products
          </p>
        </div>

        <div className="overflow-x-auto hide-scrollbar" style={{
          maxWidth: "100vw", scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none"
        }}>
          <div className="flex gap-8" style={{ width: "max-content" }}>

                       <Card className="border-none shadow-md" style={{ width: "400px" }}>
              <CardContent className="pt-6 px-6 pb-6">
                <div className="flex mb-4 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-craft-800 mb-6 italic">
                  "The handwoven wall hanging is even more beautiful in person than in the photos. The colors are vibrant, and the craftsmanship is superb. Highly recommend!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-craft-200 rounded-full flex items-center justify-center text-craft-700 font-medium mr-4">
                    MM
                  </div>
                  <div>
                    <p className="font-medium text-craft-900">M.Mandal</p>
                    <p className="text-sm text-craft-600">Happy Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md" style={{ width: "400px" }}>
              <CardContent className="pt-6 px-6 pb-6">
                <div className="flex mb-4 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-craft-800 mb-6 italic">
                  "The handcrafted wooden photo frame I purchased is absolutely beautiful. The attention to detail is remarkable, and it has become the centerpiece of my living room."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-craft-200 rounded-full flex items-center justify-center text-craft-700 font-medium mr-4">
                    MP
                  </div>
                  <div>
                    <p className="font-medium text-craft-900">M.Patra</p>
                    <p className="text-sm text-craft-600">Repeat Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md" style={{ width: "400px" }}>
              <CardContent className="pt-6 px-6 pb-6">
                <div className="flex mb-4 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-craft-800 mb-6 italic">
                  "The handcrafted wooden photo frame I purchased is absolutely beautiful. The attention to detail is remarkable, and it has become the centerpiece of my living room."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-craft-200 rounded-full flex items-center justify-center text-craft-700 font-medium mr-4">
                    PS
                  </div>
                  <div>
                    <p className="font-medium text-craft-900">P.Satvika</p>
                    <p className="text-sm text-craft-600">Happy Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md" style={{ width: "400px" }}>
              <CardContent className="pt-6 px-6 pb-6">
                <div className="flex mb-4 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-craft-800 mb-6 italic">
                 "I commissioned a pencil portrait and was blown away by the artist's skill. The likeness is uncanny, and it makes for a perfect gift. Will definitely order again!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-craft-200 rounded-full flex items-center justify-center text-craft-700 font-medium mr-4">
                    MP
                  </div>
                  <div>
                    <p className="font-medium text-craft-900">M.Panigrahi</p>
                    <p className="text-sm text-craft-600">Repeat Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

 

            <Card className="border-none shadow-md" style={{ width: "400px" }}>
              <CardContent className="pt-6 px-6 pb-6">
                <div className="flex mb-4 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-craft-800 mb-6 italic">
                  "The handcrafted wooden photo frame I purchased is absolutely beautiful. The attention to detail is remarkable, and it has become the centerpiece of my living room."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-craft-200 rounded-full flex items-center justify-center text-craft-700 font-medium mr-4">
                    SP
                  </div>
                  <div>
                    <p className="font-medium text-craft-900">S.Patra</p>
                    <p className="text-sm text-craft-600">Happy Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
       
      </div>
    </section>
  );
};

export default Testimonial;
