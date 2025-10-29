import React from "react";
import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  className 
}) => {
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  const getDueDateColor = (dateString) => {
    if (!dateString) return "text-gray-500";
    
    const date = new Date(dateString);
    if (isPast(date) && !isToday(date)) return "text-red-500";
    if (isToday(date)) return "text-orange-500";
    return "text-gray-500";
  };

  const priorityVariants = {
    high: "high",
    medium: "medium", 
    low: "low"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, shadow: "0 8px 25px rgba(0, 0, 0, 0.1)" }}
      className={cn(
        "bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200",
        task.completed && "opacity-75",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onChange={onToggleComplete}
          className="mt-0.5 flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-medium text-gray-900 leading-tight",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-gray-600 mt-1 leading-relaxed",
                  task.completed && "line-through text-gray-400"
                )}>
                  {task.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 h-auto"
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 h-auto text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Badge variant={priorityVariants[task.priority]}>
                {task.priority}
              </Badge>
              
              {task.dueDate && (
                <div className={cn(
                  "flex items-center gap-1 text-xs",
                  getDueDateColor(task.dueDate)
                )}>
                  <ApperIcon name="Calendar" className="w-3 h-3" />
                  <span>{formatDueDate(task.dueDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;