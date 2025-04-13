
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import Logo from '@/components/common/Logo';
import { ArrowLeft, Send, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PasswordResetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for reset instructions",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isSubmitted ? "Check Your Email" : "Reset Password"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted 
                ? "We've sent you an email with instructions" 
                : "Enter your email to receive reset instructions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="jane.roberts@healthnexus.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Sending instructions..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Reset Instructions
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-green-50 text-green-700 p-4 rounded-md">
                  <p>
                    We've sent password reset instructions to <strong>{email}</strong>
                  </p>
                  <p className="text-sm mt-2">
                    Please check your inbox and spam folders.
                  </p>
                </div>
                <Button
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try Another Email
                </Button>
              </div>
            )}
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
      </div>
    </div>
  );
};

export default PasswordResetPage;
