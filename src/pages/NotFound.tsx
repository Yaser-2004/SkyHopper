
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-bold text-skyhopper-primary mb-2">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-6">Oops! Page not found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="bg-skyhopper-primary hover:bg-orange-600 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
