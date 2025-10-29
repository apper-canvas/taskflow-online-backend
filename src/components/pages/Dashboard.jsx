import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
import QuickAddForm from "@/components/molecules/QuickAddForm";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useTasks } from "@/hooks/useTasks";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { 
    lists, 
    activeFilter, 
    selectedListId,
    filterCounts
  } = useOutletContext();
  
  const { 
    tasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    searchTasks,
    refreshTasks
  } = useTasks();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedList = selectedListId ? lists.find(l => l.Id === selectedListId) : null;

  const handleQuickAdd = async (taskData) => {
    try {
      await createTask({
        ...taskData,
        listId: selectedListId || lists[0]?.Id || "1"
      });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleTaskSubmit = async (taskData) => {
    setIsSubmitting(true);
    try {
      if (editingTask) {
        await updateTask(editingTask.Id, taskData);
        toast.success("Task updated successfully!");
      } else {
        await createTask(taskData);
        toast.success("Task created successfully!");
      }
      
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      toast.error("Failed to save task");
      console.error("Task submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      await updateTask(taskId, { completed });
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchTasks(query);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={refreshTasks} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedList ? selectedList.name : "All Tasks"}
            </h1>
            <p className="text-gray-600">
              {filterCounts.active} active • {filterCounts.completed} completed
            </p>
          </div>
          
          <Button
            onClick={() => setShowTaskForm(true)}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {/* Quick Add */}
        <QuickAddForm 
          onAdd={handleQuickAdd}
          className="mb-6"
        />

        {/* Search */}
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search tasks..."
          className="mb-6"
        />
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        filter={activeFilter}
        searchQuery={searchQuery}
        selectedListId={selectedListId}
      />

      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseForm}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <TaskForm
                task={editingTask}
                lists={lists}
                onSubmit={handleTaskSubmit}
                onCancel={handleCloseForm}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;