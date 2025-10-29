import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className,
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        checked
          ? "bg-gradient-to-br from-primary-500 to-primary-600 border-primary-500 text-white shadow-lg"
          : "border-gray-300 hover:border-gray-400 bg-white",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "hover:shadow-md transform hover:scale-105",
        className
      )}
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          className="w-4 h-4 animate-scale-check" 
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;