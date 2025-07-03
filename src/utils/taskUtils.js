export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case 'active':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
};

export const validateTask = (title, description = '') => {
  const errors = {};
  
  if (!title || title.trim().length === 0) {
    errors.title = 'Task title is required';
  } else if (title.trim().length > 100) {
    errors.title = 'Task title must be less than 100 characters';
  }
  
  if (description && description.trim().length > 500) {
    errors.description = 'Task description must be less than 500 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;
  
  return { total, completed, active };
}; 