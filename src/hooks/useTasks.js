import { useState, useEffect } from "react";
import taskService from "@/services/api/taskService";
import { toast } from "react-toastify";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task created successfully!");
      return newTask;
    } catch (err) {
      toast.error("Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.Id === id ? updatedTask : task
        ));
        if (updates.completed !== undefined) {
          toast.success(updates.completed ? "Task completed! 🎉" : "Task marked as active");
        }
        return updatedTask;
      }
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
      throw err;
    }
  };

  const searchTasks = async (query) => {
    if (!query.trim()) {
      loadTasks();
      return;
    }
    
    try {
      setError("");
      setLoading(true);
      const results = await taskService.search(query);
      setTasks(results);
    } catch (err) {
      setError("Failed to search tasks");
      console.error("Error searching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    searchTasks,
    refreshTasks: loadTasks
  };
};