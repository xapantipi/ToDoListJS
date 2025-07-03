import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import AddTaskForm from './components/AddTaskForm';
import TaskFilter from './components/TaskFilter';
import { loadTasksFromStorage, saveTasksToStorage, clearTasksFromStorage } from './utils/storage';
import { filterTasks, getTaskStats } from './utils/taskUtils';
import { CheckCircle, ListTodo } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = loadTasksFromStorage();
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? updatedTask : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const clearAllTasks = () => {
    setTasks([]);
    clearTasksFromStorage();
  };

  const filteredTasks = filterTasks(tasks, filter);
  const stats = getTaskStats(tasks);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-2xl shadow-lg">
              <ListTodo className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Todo App</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Stay organized and boost your productivity
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Add Task Form */}
          <AddTaskForm onAddTask={addTask} />

          {/* Filter and Stats */}
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Your Tasks
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  {stats.completed} of {stats.total} completed
                </div>
                {tasks.length > 0 && (
                  <button
                    onClick={clearAllTasks}
                    className="ml-4 px-3 py-1 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-200 text-xs font-semibold shadow-sm border border-destructive/30"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
            
            <TaskFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              stats={stats}
            />
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-muted rounded-2xl inline-block mb-4">
                  <ListTodo className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {filter === 'all' 
                    ? 'No tasks yet' 
                    : filter === 'active' 
                    ? 'No active tasks' 
                    : 'No completed tasks'
                  }
                </h3>
                <p className="text-muted-foreground">
                  {filter === 'all' 
                    ? 'Create your first task to get started!' 
                    : filter === 'active' 
                    ? 'All tasks are completed. Great job!' 
                    : 'Complete some tasks to see them here'
                  }
                </p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div key={task.id} className="group">
                  <TaskItem
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Xanti Built this with React, Tailwind CSS, and shadcn/ui</p>
        </div>
      </div>
    </div>
  );
}

export default App; 