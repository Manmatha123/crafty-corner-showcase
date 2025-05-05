
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Package } from "lucide-react";


const Navbar = () => {
  return (
    <nav className="w-full py-4 border-b border-muted">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Package className="w-8 h-8 text-craft-700" />
          <span className="text-2xl font-bold text-craft-900">Eco Market</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-craft-900 hover:text-craft-700 transition-colors">Home</Link>
          <Link to="/shop" className="text-craft-900 hover:text-craft-700 transition-colors">Shop</Link>
          <Link to="/about" className="text-craft-900 hover:text-craft-700 transition-colors">About Us</Link>
          <Link to="/contact" className="text-craft-900 hover:text-craft-700 transition-colors">Contact</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="w-5 h-5" />
            <span className="absolute top-0 right-0 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </Button>
          <Button className="hidden md:flex" size="sm" variant="outline">Sign in</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
