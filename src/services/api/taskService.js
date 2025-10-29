import tasksData from "@/services/mockData/tasks.json";

const STORAGE_KEY = "taskflow_tasks";

class TaskService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksData));
    }
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const tasks = stored ? JSON.parse(stored) : [...tasksData];
        resolve(tasks);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const tasks = stored ? JSON.parse(stored) : [...tasksData];
        const task = tasks.find(t => t.Id === parseInt(id));
        resolve(task);
      }, 150);
    });
  }

  async create(taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const tasks = stored ? JSON.parse(stored) : [...tasksData];
        
        const newId = Math.max(...tasks.map(t => t.Id)) + 1;
        const newTask = {
          Id: newId,
          title: taskData.title,
          description: taskData.description || "",
          completed: false,
          priority: taskData.priority || "medium",
          dueDate: taskData.dueDate || null,
          listId: taskData.listId || "1",
          createdAt: new Date().toISOString(),
          completedAt: null
        };
        
        tasks.push(newTask);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        resolve(newTask);
      }, 300);
    });
  }

  async update(id, updates) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const tasks = stored ? JSON.parse(stored) : [...tasksData];
        
        const index = tasks.findIndex(t => t.Id === parseInt(id));
        if (index !== -1) {
          const updatedTask = {
            ...tasks[index],
            ...updates,
            ...(updates.completed && !tasks[index].completed ? { completedAt: new Date().toISOString() } : {}),
            ...(!updates.completed && tasks[index].completed ? { completedAt: null } : {})
          };
          tasks[index] = updatedTask;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
          resolve(updatedTask);
        } else {
          resolve(null);
        }
      }, 250);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const tasks = stored ? JSON.parse(stored) : [...tasksData];
        
        const filteredTasks = tasks.filter(t => t.Id !== parseInt(id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
        resolve(true);
      }, 200);
    });
  }

  async getByListId(listId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const tasks = stored ? JSON.parse(stored) : [...tasksData];
        const filteredTasks = tasks.filter(t => t.listId === listId);
        resolve(filteredTasks);
      }, 150);
    });
  }

  async getByStatus(completed) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const tasks = stored ? JSON.parse(stored) : [...tasksData];
        const filteredTasks = tasks.filter(t => t.completed === completed);
        resolve(filteredTasks);
      }, 150);
    });
  }

  async search(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const tasks = stored ? JSON.parse(stored) : [...tasksData];
        const searchResults = tasks.filter(t => 
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(searchResults);
      }, 100);
    });
  }
}

export default new TaskService();