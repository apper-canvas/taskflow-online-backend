import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  className, 
  variant = "default",
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    high: "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg",
    medium: "bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-md",
    low: "bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-md",
    success: "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md",
    secondary: "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;