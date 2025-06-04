
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface AdminAuthProps {
  onLogin: (email: string) => void;
}

const AdminAuth = ({ onLogin }: AdminAuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting admin login for:', email);
      
      // Check admin credentials in the database
      const { data: adminData, error } = await supabase
        .from('admin_credentials')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .maybeSingle();

      console.log('Admin query result:', adminData);
      console.log('Admin query error:', error);

      if (error) {
        console.error('Database error during login:', error);
        toast({
          title: "Database Error",
          description: `Error: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      if (!adminData) {
        console.log('No matching admin credentials found');
        toast({
          title: "Invalid Credentials",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log('Admin login successful for:', adminData.email);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${adminData.email}!`,
      });
      onLogin(email);
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Test credentials:</p>
            <p>amardeep.gupta@gmail.com / 123456</p>
            <p>puneet.sharma@gmail.com / 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
