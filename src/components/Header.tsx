
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import websitelogo from "../../public/logo4.png";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-0 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand-600" >
        <div style={{height:"70px",borderRadius:"2%",overflow:"hidden"}}>

        <img src={websitelogo} style={{height:"80px",objectFit:"cover",filter:"grayscale(100%) brightness(0)"}} alt="" />
        </div>
          {/* Artisence */}
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-brand-600">
                <User size={20} />
                <span className="hidden md:inline">{user?.name}</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="text-gray-700 hover:text-red-600">
                <LogOut size={20} />
              </Button>
            </>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
