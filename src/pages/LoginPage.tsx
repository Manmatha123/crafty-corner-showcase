
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

const LoginPage = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(mobile, password);
      if (success) {
        navigate('/');
        navigate(0)
        // window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-md mx-auto px-4 py-16">
        <Card className="shadow-lg animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="text"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
       
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
    
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
              
              <div className="text-center text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-brand-600 hover:underline">
                  Register here
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;
