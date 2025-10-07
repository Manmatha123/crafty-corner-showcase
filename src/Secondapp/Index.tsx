
import React from 'react';
import Hero from './Hero2';
import CategorySection from './CategorySection';
import FeaturedProducts from './FeaturedProducts';
import Testimonial from './Testimonial';
import Footer from './Footer';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CategorySection />
        <FeaturedProducts />
        <Testimonial />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
