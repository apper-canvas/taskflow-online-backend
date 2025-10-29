import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ title, message, action, icon = "CheckSquare" }) => {
  return (
    <div className="text-center py-16 px-8">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="w-12 h-12 text-primary-500" />
      </div>
      <div className="space-y-3 max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-500">{message}</p>
        {action}
      </div>
    </div>
  );
};

export default Empty;