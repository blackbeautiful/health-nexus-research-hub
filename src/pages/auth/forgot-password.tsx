
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/common/Logo';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate password reset request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast({
        title: "Reset Link Sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex">
        {/* Left side - Image */}
        <div 
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
          }}
        >
          <div className="absolute inset-0 bg-purple-900/20"></div>
          <div className="relative z-10 flex flex-col justify-end p-12 text-white">
            <h1 className="text-4xl font-bold mb-4">Check Your Email</h1>
            <p className="text-xl opacity-90">We've sent you password reset instructions</p>
          </div>
        </div>

        {/* Right side - Success Message */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-purple-50">
          <Card className="w-full max-w-md shadow-xl border-0">
            <CardHeader className="text-center space-y-4">
              <Logo />
              <CardTitle className="flex items-center justify-center text-2xl font-bold">
                <Mail className="mr-2 h-6 w-6" />
                Check Your Email
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="space-y-2">
                <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
                  Try Different Email
                </Button>
                <Link to="/login">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-purple-900/20"></div>
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Reset Your Password</h1>
          <p className="text-xl opacity-90">Secure access to your research platform</p>
          <p className="mt-4 opacity-80">Enter your email to receive reset instructions</p>
        </div>
      </div>

      {/* Right side - Reset Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Logo />
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">Forgot Password</h2>
            <p className="text-sm text-muted-foreground mt-2">Enter your email to reset your password</p>
          </div>
          
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="flex items-center justify-center text-xl">
                <KeyRound className="mr-2 h-5 w-5" />
                Reset Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login">
                  <Button variant="ghost" className="text-sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </Link>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <p className="mt-6 text-center text-xs text-muted-foreground">
            &copy; 2025 HealthNexus Research Hub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
