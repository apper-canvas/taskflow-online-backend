import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ListSelector from "@/components/molecules/ListSelector";
import FilterTabs from "@/components/molecules/FilterTabs";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ 
  lists = [],
  selectedListId,
  onListSelect,
  onAddList,
  activeFilter,
  onFilterChange,
  taskCounts = {},
  filterCounts = {},
  className,
  isMobile = false,
  isOpen = true,
  onClose
}) => {
  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">TaskFlow</h2>
        </div>
        
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          counts={filterCounts}
        />
      </div>

      {/* Lists */}
      <div className="flex-1 p-6">
        <ListSelector
          lists={lists}
          selectedListId={selectedListId}
          onListSelect={onListSelect}
          onAddList={onAddList}
          taskCounts={taskCounts}
        />
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Stay organized, stay productive
          </p>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        
        {/* Mobile Sidebar */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? 0 : "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className={cn(
            "fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden flex flex-col",
            className
          )}
        >
          {sidebarContent}
        </motion.div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className={cn(
      "w-80 bg-white border-r border-gray-200 flex flex-col h-full",
      className
    )}>
      {sidebarContent}
    </div>
  );
};

export default Sidebar;