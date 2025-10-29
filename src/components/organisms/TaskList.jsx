import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const TaskList = ({ 
  tasks = [], 
  onToggleTask, 
  onEditTask, 
  onDeleteTask,
  filter = "all",
  searchQuery = "",
  selectedListId = null
}) => {
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter by list
    if (selectedListId) {
      filtered = filtered.filter(task => task.listId === selectedListId);
    }

    // Filter by status
    switch (filter) {
      case "active":
        filtered = filtered.filter(task => !task.completed);
        break;
      case "completed":
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        // "all" - no additional filtering
        break;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    // Sort: incomplete tasks first, then by creation date (newest first)
    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, filter, searchQuery, selectedListId]);

  const getEmptyState = () => {
    if (searchQuery.trim()) {
      return {
        title: "No tasks found",
        message: `No tasks match "${searchQuery}". Try adjusting your search.`,
        icon: "Search"
      };
    }

    if (filter === "completed") {
      return {
        title: "No completed tasks yet",
        message: "Mark some tasks as complete to see them here.",
        icon: "CheckCircle"
      };
    }

    if (filter === "active") {
      return {
        title: "No active tasks",
        message: "All caught up! Add a new task to get started.",
        icon: "Circle"
      };
    }

    return {
      title: "No tasks yet",
      message: "Start organizing your work by adding your first task.",
      icon: "CheckSquare"
    };
  };

  if (filteredTasks.length === 0) {
    const emptyState = getEmptyState();
    return (
      <Empty
        title={emptyState.title}
        message={emptyState.message}
        icon={emptyState.icon}
      />
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            className="group"
            whileHover={{ scale: 1.01 }}
          >
            <TaskCard
              task={task}
              onToggleComplete={() => onToggleTask(task.Id, !task.completed)}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.Id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {filteredTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <p className="text-sm text-gray-500">
            {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;