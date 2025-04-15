
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileSearch, ArrowLeft, Home, Users, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-300 to-blue-600 opacity-75 blur-sm animate-pulse"></div>
            <div className="rounded-full bg-blue-50 p-6 relative">
              <FileSearch className="h-16 w-16 text-blue-600 animate-fade-in" />
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900 animate-fade-in">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 animate-fade-in" style={{ animationDelay: "200ms" }}>Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <Button asChild className="hover-scale">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild className="hover-scale">
            <Link to="/patients" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              View Patients
            </Link>
          </Button>
        </div>
        <div className="mt-12 animate-fade-in" style={{ animationDelay: "800ms" }}>
          <Button 
            variant="ghost" 
            asChild 
            size="sm" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => window.history.back()}
          >
            <Link to="#" className="flex items-center">
              <ArrowLeft className="mr-1 h-3 w-3" />
              Go Back
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 animate-fade-in border-t pt-8 border-gray-200" style={{ animationDelay: "900ms" }}>
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            If you believe this is an error, please contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
