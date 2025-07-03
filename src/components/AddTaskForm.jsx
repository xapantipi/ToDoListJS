import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Plus, X } from 'lucide-react';
import { generateId, validateTask } from '../utils/taskUtils';
import { cn } from '../lib/utils';

const AddTaskForm = ({ onAddTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateTask(title, description);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const newTask = {
      id: generateId(),
      title: title.trim(),
      description: description.trim() || null,
      completed: false,
      createdAt: new Date().toISOString()
    };

    onAddTask(newTask);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setErrors({});
    setIsExpanded(false);
  };

  const handleCancel = () => {
    resetForm();
  };

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        className="w-full h-12 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-all duration-200 text-muted-foreground hover:text-primary"
        variant="ghost"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add a new task
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="task-item animate-fade-in">
      <div className="space-y-3">
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors({ ...errors, title: null });
          }}
          placeholder="What needs to be done?"
          className={cn("font-medium", errors.title && "border-destructive")}
          autoFocus
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title}</p>
        )}
        
        <Textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors({ ...errors, description: null });
          }}
          placeholder="Add a description (optional)"
          className={cn(errors.description && "border-destructive")}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
        
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
          <Button type="button" onClick={handleCancel} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm; 