import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser, User } from "../lib/types";
import { useToast } from "@/components/ui/use-toast";
import { mockUsers } from "@/lib/mockData";
import axios from "axios";

interface AuthContextType {
  token: String | null;
  login: (mobile: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    mobile: string,
    password: string,
    role: "seller" | "buyer" | "both"
  ) => Promise<boolean>;
  logout: () => void;
  user:User|null;
  isAuthenticated: boolean;
}

const initialAuthContext: AuthContextType = {
  token: null,
  login: async () => false,
  register: async () => false,
  logout: () => { },
  user:null,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<String | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const isAuthenticated = !!token;
  const baseUrl = import.meta.env.VITE_API_URL;
  // process.env.NEXT_PUBLIC_API_URL ||
  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('authToken');
    const userObj = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userobject = JSON.parse(userObj);
        setUser(userobject);
        setToken(parsedUser);
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      if (!phone || !password) {
        toast({
          title: "Error",
          description: "Please provide phone and password",
          variant: "destructive",
        });
        return false;
      }
      const user = {
        phone,
        password,
      };
      const res = await axios.post(`${baseUrl}/v1/api/user/signin`, user,{
        headers: {
          'ngrok-skip-browser-warning': '1',
        }
      });

      if(res.data.status){
        const userRes = await axios.get(`${baseUrl}/v1/api/user/info`, {
          headers: {
            Authorization: `Bearer ${res.data.message}`,
            'ngrok-skip-browser-warning' : '1'
          } } );
          localStorage.setItem("user",JSON.stringify(userRes.data));
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });


        localStorage.setItem('authToken', JSON.stringify(res.data.message));
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
    phone: string,
    password: string,
    role: "seller" | "buyer"
  ): Promise<boolean> => {
    try {
      if (!name || !phone || !password || !role) {
        toast({
          title: "Error",
          description: "All fields are required",
          variant: "destructive",
        });
        return false;
      }

      const user = {
        name,
        phone,
        role,
        password,
      };
      const res = await axios.post(`${baseUrl}/v1/api/user/saveorupdate`, user,{
        headers:{
          'ngrok-skip-browser-warning' : '1'
        }
      });
      if (res.data.status) {
        toast({
          title: "Success",
          description: "Registration successful",
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: res.data.message,
          variant: "destructive",
        });
        return false;
      }
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
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem("authToken");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ token, login,user, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
