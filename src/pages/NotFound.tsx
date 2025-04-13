
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

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
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-blue-50 p-4">
            <FileSearch className="h-12 w-12 text-health-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild>
            <a href="/">Return to Dashboard</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/patients">View Patients</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
