import { useState, useEffect } from "react";
import listService from "@/services/api/listService";
import { toast } from "react-toastify";

export const useLists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLists = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await listService.getAll();
      setLists(data);
    } catch (err) {
      setError("Failed to load lists. Please try again.");
      console.error("Error loading lists:", err);
    } finally {
      setLoading(false);
    }
  };

  const createList = async (listData) => {
    try {
      const newList = await listService.create(listData);
      setLists(prev => [...prev, newList]);
      toast.success("List created successfully!");
      return newList;
    } catch (err) {
      toast.error("Failed to create list");
      throw err;
    }
  };

  const updateList = async (id, updates) => {
    try {
      const updatedList = await listService.update(id, updates);
      if (updatedList) {
        setLists(prev => prev.map(list => 
          list.Id === id ? updatedList : list
        ));
        return updatedList;
      }
    } catch (err) {
      toast.error("Failed to update list");
      throw err;
    }
  };

  const deleteList = async (id) => {
    try {
      await listService.delete(id);
      setLists(prev => prev.filter(list => list.Id !== id));
      toast.success("List deleted");
    } catch (err) {
      toast.error("Failed to delete list");
      throw err;
    }
  };

  useEffect(() => {
    loadLists();
  }, []);

  return {
    lists,
    loading,
    error,
    createList,
    updateList,
    deleteList,
    refreshLists: loadLists
  };
};