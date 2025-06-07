
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import Logo from '@/components/common/Logo';
import { ArrowLeft, Send, Shield, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PasswordResetPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated successfully",
      });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex">
        {/* Left side - Image */}
        <div 
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
          }}
        >
          <div className="absolute inset-0 bg-green-900/20"></div>
          <div className="relative z-10 flex flex-col justify-end p-12 text-white">
            <h1 className="text-4xl font-bold mb-4">Password Updated</h1>
            <p className="text-xl opacity-90">Your account is now secure</p>
          </div>
        </div>

        {/* Right side - Success Message */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-green-50">
          <Card className="w-full max-w-md shadow-xl border-0">
            <CardHeader className="text-center space-y-4">
              <Logo />
              <CardTitle className="text-2xl text-center text-green-600">
                Password Reset Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-green-50 text-green-700 p-4 rounded-md">
                <p className="font-semibold">Success!</p>
                <p className="text-sm mt-2">
                  Your password has been successfully updated. You can now sign in with your new password.
                </p>
              </div>
              <Link to="/login">
                <Button className="w-full">
                  Continue to Login
                </Button>
              </Link>
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-green-900/20"></div>
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Create New Password</h1>
          <p className="text-xl opacity-90">Secure your research platform account</p>
          <p className="mt-4 opacity-80">Choose a strong password to protect your data</p>
        </div>
      </div>

      {/* Right side - Reset Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-green-50">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Logo />
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">Reset Password</h2>
            <p className="text-sm text-muted-foreground mt-2">Enter your new password</p>
          </div>
          
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Set New Password
              </CardTitle>
              <CardDescription className="text-center">
                Create a strong password for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="newPassword" 
                        type="password" 
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Updating password..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Link 
                to="/login" 
                className="text-sm text-primary hover:underline flex items-center"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back to Login
              </Link>
              <div className="flex items-center justify-center w-full gap-2 text-sm text-muted-foreground pt-4">
                <Shield size={16} />
                <span>Protected by HIPAA & GDPR compliant security</span>
              </div>
            </CardFooter>
          </Card>
          
          <p className="mt-6 text-center text-xs text-muted-foreground">
            &copy; 2025 HealthNexus Research Hub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
