import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useTasks } from "@/hooks/useTasks";
import { useLists } from "@/hooks/useLists";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Layout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useLocalStorage("taskflow_filter", "all");
  const [selectedListId, setSelectedListId] = useLocalStorage("taskflow_selected_list", null);
  
  const { tasks, loading: tasksLoading } = useTasks();
  const { lists, loading: listsLoading, createList } = useLists();

  // Calculate task counts by list
  const taskCounts = React.useMemo(() => {
    const counts = {};
    lists.forEach(list => {
      counts[list.Id] = tasks.filter(task => task.listId === list.Id).length;
    });
    return counts;
  }, [tasks, lists]);

  // Calculate filter counts
  const filterCounts = React.useMemo(() => {
    const activeTasks = selectedListId 
      ? tasks.filter(task => task.listId === selectedListId && !task.completed)
      : tasks.filter(task => !task.completed);
    
    const completedTasks = selectedListId
      ? tasks.filter(task => task.listId === selectedListId && task.completed)
      : tasks.filter(task => task.completed);

    const allTasks = selectedListId
      ? tasks.filter(task => task.listId === selectedListId)
      : tasks;

    return {
      all: allTasks.length,
      active: activeTasks.length,
      completed: completedTasks.length
    };
  }, [tasks, selectedListId]);

  const handleAddList = async (listData) => {
    try {
      await createList(listData);
    } catch (error) {
      console.error("Failed to create list:", error);
    }
  };

  // Close mobile sidebar when screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          lists={lists}
          selectedListId={selectedListId}
          onListSelect={setSelectedListId}
          onAddList={handleAddList}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
          filterCounts={filterCounts}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar
        lists={lists}
        selectedListId={selectedListId}
        onListSelect={(listId) => {
          setSelectedListId(listId);
          setIsMobileSidebarOpen(false);
        }}
        onAddList={handleAddList}
        activeFilter={activeFilter}
        onFilterChange={(filter) => {
          setActiveFilter(filter);
          setIsMobileSidebarOpen(false);
        }}
        taskCounts={taskCounts}
        filterCounts={filterCounts}
        isMobile
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2"
            >
              <ApperIcon name="Menu" className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">TaskFlow</h1>
            </div>
            
            <div className="w-9 h-9" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet context={{
            tasks,
            lists,
            tasksLoading,
            listsLoading,
            activeFilter,
            selectedListId,
            taskCounts,
            filterCounts,
            onFilterChange: setActiveFilter,
            onListSelect: setSelectedListId
          }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;