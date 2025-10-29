import React from "react";
import { cn } from "@/utils/cn";

const FilterTabs = ({ activeFilter, onFilterChange, counts = {} }) => {
  const filters = [
    { key: "all", label: "All", count: counts.all || 0 },
    { key: "active", label: "Active", count: counts.active || 0 },
    { key: "completed", label: "Completed", count: counts.completed || 0 }
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
            activeFilter === filter.key
              ? "bg-white text-primary-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <span>{filter.label}</span>
          <span className={cn(
            "text-xs px-1.5 py-0.5 rounded-full",
            activeFilter === filter.key
              ? "bg-primary-100 text-primary-600"
              : "bg-gray-200 text-gray-500"
          )}>
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;