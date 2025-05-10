
import React from 'react';
import Navbar from './Navbar2';
import Hero from './Hero2';
import CategorySection from './CategorySection';
import FeaturedProducts from './FeaturedProducts';
import Testimonial from './Testimonial';
import NewsletterSignup from './NewsletterSignup';
import Footer from './Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategorySection />
        <FeaturedProducts />
        <Testimonial />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
