'use client';

import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { TaskItem } from './task-item';
import { Input, Select } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { EmptyState } from './ui/state-handling';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updatedTask: Partial<Task>) => void;
  onTaskDelete: (taskId: string) => void;
  onBulkUpdate: (taskIds: string[], updatedTask: Partial<Task>) => void;
}

export const TaskList = ({ tasks, onTaskUpdate, onTaskDelete, onBulkUpdate }: TaskListProps) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [sortOption, setSortOption] = useState<'created_desc' | 'created_asc' | 'title_az' | 'title_za'>('created_desc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let result = [...tasks];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(term) ||
        (task.description && task.description.toLowerCase().includes(term))
      );
    }

    // Apply status filter
    if (filter === 'active') {
      result = result.filter(task => !task.completed);
    } else if (filter === 'completed') {
      result = result.filter(task => task.completed);
    }

    // Apply sorting
    switch (sortOption) {
      case 'created_desc':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'created_asc':
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'title_az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setFilteredTasks(result);
  }, [tasks, filter, sortOption, searchTerm]);

  const handleSelectAll = () => {
    if (selectedTasks.size === filteredTasks.length) {
      // Deselect all
      setSelectedTasks(new Set());
    } else {
      // Select all visible tasks
      setSelectedTasks(new Set(filteredTasks.map(task => task.id)));
    }
  };

  const handleTaskSelection = (taskId: string) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  const handleBulkMarkCompleted = () => {
    onBulkUpdate(Array.from(selectedTasks), { completed: true });
    setSelectedTasks(new Set());
  };

  const handleBulkMarkActive = () => {
    onBulkUpdate(Array.from(selectedTasks), { completed: false });
    setSelectedTasks(new Set());
  };

  const handleBulkDelete = () => {
    selectedTasks.forEach(taskId => onTaskDelete(taskId));
    setSelectedTasks(new Set());
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-text-dark mb-4">Your Tasks</h3>

        {/* Search and Sort Controls */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              label="Search"
              id="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <Select
              label="Sort by"
              id="sort"
              options={[
                { value: 'created_desc', label: 'Newest First' },
                { value: 'created_asc', label: 'Oldest First' },
                { value: 'title_az', label: 'Title A-Z' },
                { value: 'title_za', label: 'Title Z-A' },
              ]}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
            />
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <span className="text-sm font-medium text-text-medium mr-4">Filter:</span>
              <div className="flex space-x-2">
                <Button
                  variant={filter === 'all' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'active' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setFilter('active')}
                >
                  Active
                </Button>
                <Button
                  variant={filter === 'completed' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedTasks.size > 0 && (
          <div className="mt-4 flex space-x-2">
            <Button
              variant="success"
              size="sm"
              onClick={handleBulkMarkCompleted}
            >
              Mark Selected Complete
            </Button>
            <Button
              variant="warning"
              size="sm"
              onClick={handleBulkMarkActive}
            >
              Mark Selected Active
            </Button>
            <Button
              variant="error"
              size="sm"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </Button>
          </div>
        )}

        {/* Task List */}
        <ul className="divide-y divide-gray-200 mt-4">
          {filteredTasks.length > 0 ? (
            <>
              <li className="p-3 border-b border-gray-200 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTasks.size === filteredTasks.length && filteredTasks.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                />
                <span className="ml-2 text-sm font-medium text-text-medium">
                  {selectedTasks.size > 0
                    ? `${selectedTasks.size} of ${filteredTasks.length} selected`
                    : 'Select all'}
                </span>
              </li>
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={onTaskUpdate}
                  onDelete={onTaskDelete}
                  isSelected={selectedTasks.has(task.id)}
                  onSelect={handleTaskSelection}
                />
              ))}
            </>
          ) : (
            <li className="py-8">
              <EmptyState
                message="No tasks found"
                icon={
                  <svg className="h-12 w-12 text-text-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
              />
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};