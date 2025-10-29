import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ListSelector = ({ 
  lists = [], 
  selectedListId, 
  onListSelect, 
  onAddList,
  taskCounts = {},
  className 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newListName, setNewListName] = useState("");

  const handleAddList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      onAddList({ name: newListName.trim() });
      setNewListName("");
      setShowAddForm(false);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Lists</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAddForm(true)}
          className="p-1.5 h-auto text-gray-500 hover:text-primary-600"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddList}
            className="space-y-2"
          >
            <input
              type="text"
              placeholder="List name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              autoFocus
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={!newListName.trim()}>
                Add
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowAddForm(false);
                  setNewListName("");
                }}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-1">
        {lists.map((list) => {
          const taskCount = taskCounts[list.Id] || 0;
          const isSelected = selectedListId === list.Id;
          
          return (
            <button
              key={list.Id}
              onClick={() => onListSelect(list.Id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-all duration-200",
                isSelected
                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: list.color }}
                />
                <span className="font-medium">{list.name}</span>
              </div>
              
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                isSelected
                  ? "bg-primary-100 text-primary-600"
                  : "bg-gray-200 text-gray-500"
              )}>
                {taskCount}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ListSelector;