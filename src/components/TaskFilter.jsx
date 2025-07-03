import React from 'react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const TaskFilter = ({ currentFilter, onFilterChange, stats }) => {
  const filters = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "filter-button",
            currentFilter === filter.key && "active"
          )}
          variant={currentFilter === filter.key ? "default" : "secondary"}
        >
          {filter.label}
          <span className="ml-2 px-2 py-0.5 text-xs bg-background/50 rounded-full">
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default TaskFilter; 