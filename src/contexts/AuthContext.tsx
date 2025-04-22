
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../lib/types';
import { useToast } from '@/components/ui/use-toast';
import { mockUsers } from '@/lib/mockData';

interface AuthContextType {
  user: AuthUser | null;
  login: (mobile: string, password: string) => Promise<boolean>;
  register: (name: string, mobile: string, password: string, role: 'seller' | 'buyer' | 'both') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const initialAuthContext: AuthContextType = {
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const { toast } = useToast();
  const isAuthenticated = !!user;

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (mobile: string, password: string): Promise<boolean> => {
    // In a real app, we'd call an API. Here we'll simulate with mock data
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation for demo purposes
      if (!mobile || !password) {
        toast({
          title: "Error",
          description: "Please provide mobile and password",
          variant: "destructive",
        });
        return false;
      }

      // Find user in mock data
      const foundUser = mockUsers.find(u => u.mobile === mobile);
      
      if (foundUser && password === 'password') { // Simple password check for demo
        const authUser: AuthUser = {
          id: foundUser.id,
          name: foundUser.name,
          mobile: foundUser.mobile,
          role: foundUser.role,
          loggedIn: true
        };
        
        setUser(authUser);
        localStorage.setItem('user', JSON.stringify(authUser));
        
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: "Invalid mobile or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (
    name: string, 
    mobile: string, 
    password: string, 
    role: 'seller' | 'buyer' | 'both'
  ): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simple validation for demo purposes
      if (!name || !mobile || !password || !role) {
        toast({
          title: "Error",
          description: "All fields are required",
          variant: "destructive",
        });
        return false;
      }

      // Check if user already exists in mock data
      const existingUser = mockUsers.find(u => u.mobile === mobile);
      if (existingUser) {
        toast({
          title: "Error",
          description: "A user with this mobile number already exists",
          variant: "destructive",
        });
        return false;
      }

      // In a real app, we'd add the user to the database
      // Here we'll just create a new user object
      const newUser: AuthUser = {
        id: `user_${Date.now()}`,
        name,
        mobile,
        role,
        loggedIn: true,
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      toast({
        title: "Success",
        description: "Registration successful",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during registration",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
