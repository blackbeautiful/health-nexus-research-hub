
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import Logo from '@/components/common/Logo';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors on change
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulated login
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate role-based redirect
      const roleMappings: { [key: string]: string } = {
        'patient@example.com': '/dashboard/patient',
        'researcher@example.com': '/dashboard/researcher',
        'admin@example.com': '/dashboard/admin',
        'default': '/'
      };
      
      const redirectPath = roleMappings[formData.email] || roleMappings.default;
      
      toast({
        title: "Login Successful",
        description: `Welcome back ${formData.email}!`,
      });
      
      navigate(redirectPath);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">HealthNexus Research Hub</h1>
          <p className="text-xl opacity-90">Advancing Clinical Research Through Innovation</p>
          <p className="mt-4 opacity-80">Secure, compliant, and intuitive platform for medical research professionals</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Logo />
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-2">Sign in to your account to continue</p>
          </div>
          
          <Card className="shadow-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the platform
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Try: patient@example.com, researcher@example.com, or admin@example.com
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive flex items-center mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.password}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Use "password123" for demo login
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="remember-me" 
                    checked={formData.rememberMe} 
                    onCheckedChange={(checked) => handleChange('rememberMe', checked)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember-me" className="text-sm">Remember me for 30 days</Label>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <span className="text-primary hover:underline cursor-pointer">
                    Contact your administrator
                  </span>
                </p>
              </CardFooter>
            </form>
          </Card>
          
          <p className="mt-6 text-center text-xs text-muted-foreground">
            &copy; 2025 HealthNexus Research Hub. All rights reserved.<br />
            HIPAA & GDPR Compliant
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
