import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import taskService from "@/services/api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const initialLoad = useRef(true);

  const loadTasks = async () => {
    try {
      setError("");
      if (initialLoad.current) {
        setLoading(true);
      }
      const data = await taskService.getAll();
      setTasks(data);
      initialLoad.current = false;
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      if (initialLoad.current) {
        setLoading(false);
      }
    }
  };

  const createTask = async (taskData) => {
try {
      setError("");
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task created successfully!");
      return newTask;
    } catch (err) {
      setError("Failed to create task");
      toast.error("Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
try {
      setError("");
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
      setError("Failed to update task");
      toast.error("Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id) => {
try {
      setError("");
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== id));
      toast.success("Task deleted");
    } catch (err) {
      setError("Failed to delete task");
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
      const results = await taskService.search(query);
      setTasks(results);
    } catch (err) {
      setError("Failed to search tasks");
      console.error("Error searching tasks:", err);
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