import listsData from "@/services/mockData/lists.json";

const STORAGE_KEY = "taskflow_lists";

class ListService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(listsData));
    }
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const lists = stored ? JSON.parse(stored) : [...listsData];
        resolve(lists);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const lists = stored ? JSON.parse(stored) : [...listsData];
        const list = lists.find(l => l.Id === id);
        resolve(list);
      }, 150);
    });
  }

  async create(listData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const lists = stored ? JSON.parse(stored) : [...listsData];
        
        const newId = (Math.max(...lists.map(l => parseInt(l.Id))) + 1).toString();
        const newList = {
          Id: newId,
          name: listData.name,
          color: listData.color || "#6366f1",
          taskCount: 0,
          createdAt: new Date().toISOString()
        };
        
        lists.push(newList);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
        resolve(newList);
      }, 300);
    });
  }

  async update(id, updates) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const lists = stored ? JSON.parse(stored) : [...listsData];
        
        const index = lists.findIndex(l => l.Id === id);
        if (index !== -1) {
          lists[index] = { ...lists[index], ...updates };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
          resolve(lists[index]);
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
        const lists = stored ? JSON.parse(stored) : [...listsData];
        
        const filteredLists = lists.filter(l => l.Id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLists));
        resolve(true);
      }, 200);
    });
  }

  async updateTaskCount(listId, count) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const lists = stored ? JSON.parse(stored) : [...listsData];
        
        const index = lists.findIndex(l => l.Id === listId);
        if (index !== -1) {
          lists[index].taskCount = count;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
          resolve(lists[index]);
        } else {
          resolve(null);
        }
      }, 100);
    });
  }
}

export default new ListService();