'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/input';
import { X } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: TaskFormData) => void;
  task?: TaskFormData;
  mode?: 'create' | 'edit';
}

export interface TaskFormData {
  id?: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  tags: string[];
}

export const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  task,
  mode = 'create',
}: TaskModalProps) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        dueDate: '',
        tags: [],
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            {mode === 'create' ? 'Create New Task' : 'Edit Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <Input
            label="Task Title"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter task title"
            className="bg-white dark:bg-neutral-900"
          />

          {/* Description */}
          <Textarea
            label="Description"
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add task description (optional)"
            rows={4}
            className="bg-white dark:bg-neutral-900"
          />

          {/* Priority and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Priority"
              id="priority"
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value as 'low' | 'medium' | 'high',
                })
              }
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
              className="bg-white dark:bg-neutral-900"
            />

            <Select
              label="Status"
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'pending' | 'in_progress' | 'completed',
                })
              }
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
              ]}
              className="bg-white dark:bg-neutral-900"
            />
          </div>

          {/* Due Date */}
          <Input
            label="Due Date"
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="bg-white dark:bg-neutral-900"
          />

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                id="tagInput"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add a tag"
                className="bg-white dark:bg-neutral-900"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="p-0.5 rounded-full hover:bg-primary-200 dark:hover:bg-primary-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" size="lg" className="flex-1">
              {mode === 'create' ? 'Create Task' : 'Save Changes'}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
