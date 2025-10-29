import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const QuickAddForm = ({ onAdd, className, placeholder = "Add a new task..." }) => {
  const [title, setTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title: title.trim() });
      setTitle("");
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setTitle("");
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      className={cn("w-full", className)}
      initial={false}
      animate={{ height: "auto" }}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-4 h-12 text-base shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200"
            autoComplete="off"
          />
          <ApperIcon 
            name="Plus" 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
        </div>
        
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <Button
              type="submit"
              size="sm"
              disabled={!title.trim()}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              Add Task
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTitle("");
                setIsExpanded(false);
              }}
            >
              Cancel
            </Button>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default QuickAddForm;