
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterSignup = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
  };

  return (
    <section className="py-16 bg-craft-100">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-craft-900 mb-4">Join Our Community</h2>
          <p className="text-craft-700 mb-8">
            Subscribe to our newsletter to receive updates on new products, special offers, and artisan stories
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow"
              required
            />
            <Button type="submit" className="bg-craft-600 hover:bg-craft-700 text-white">
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm text-craft-600 mt-4">
            By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
