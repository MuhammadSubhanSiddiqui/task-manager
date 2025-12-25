// In-memory data store for tasks

// In-memory storage
let tasks = [
  {
    id: '1',
    title: 'Sample Task',
    description: 'This is a sample task to get you started',
    status: 'Pending',
    priority: 'Medium',
    createdAt: new Date().toISOString(),
  },
];

export const getTasks = () => {
  return tasks;
};

export const getTaskById = (id) => {
  return tasks.find(task => task.id === id);
};

export const createTask = (taskData) => {
  const newTask = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (id, taskData) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return null;
  
  tasks[index] = { ...tasks[index], ...taskData };
  return tasks[index];
};

export const deleteTask = (id) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return false;
  
  tasks.splice(index, 1);
  return true;
};
