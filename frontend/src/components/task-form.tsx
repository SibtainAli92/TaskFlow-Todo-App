'use client';

import { useState } from 'react';
import { Task } from '../types/task';
import { Input, Textarea } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface TaskFormProps {
  onSubmit: (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'owner_id'>) => void;
  onCancel?: () => void;
  initialData?: Partial<Task>;
  isEditing?: boolean;
}

export const TaskForm = ({ onSubmit, onCancel, initialData, isEditing = false }: TaskFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      completed: initialData?.completed || false
    });
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-text-dark mb-1">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h3>
            <p className="text-sm text-text-medium">
              {isEditing
                ? 'Update the task details below.'
                : 'Add a new task to your list.'}
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <Input
                    label="Title *"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="col-span-6">
                  <Textarea
                    label="Description"
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {onCancel && (
                  <Button
                    variant="secondary"
                    size="md"
                    type="button"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                >
                  {isEditing ? 'Update Task' : 'Create Task'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};