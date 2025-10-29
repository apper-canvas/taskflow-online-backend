import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center space-y-6 max-w-md mx-auto p-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-100 to-purple-100 rounded-full flex items-center justify-center">
          <ApperIcon name="SearchX" className="w-12 h-12 text-primary-500" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Home" className="w-4 h-4" />
            Go Home
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;