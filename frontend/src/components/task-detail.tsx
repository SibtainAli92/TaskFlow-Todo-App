'use client';

import { Task } from '../types/task';
import { TaskToggle } from './task-toggle';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

interface TaskDetailProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggle: (taskId: string, completed: boolean) => void;
}

export const TaskDetail = ({ task, onEdit, onDelete, onToggle }: TaskDetailProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        <div className="flex items-center">
          <TaskToggle
            taskId={task.id}
            completed={task.completed}
            onToggle={(completed) => onToggle(task.id, completed)}
          />
          <h3 className="ml-3 text-lg font-semibold text-text-dark">
            {task.title}
          </h3>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => onEdit(task)}
            variant="secondary"
            size="sm"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(task.id)}
            variant="error"
            size="sm"
          >
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-medium text-text-light">Status</h4>
            <p className="mt-1 text-sm text-text-medium">
              {task.completed ? 'Completed' : 'Pending'}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-light">Created</h4>
            <p className="mt-1 text-sm text-text-medium">
              {new Date(task.created_at).toLocaleString()}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-light">Last Updated</h4>
            <p className="mt-1 text-sm text-text-medium">
              {new Date(task.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
        {task.description && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-text-light">Description</h4>
            <p className="mt-1 text-sm text-text-medium">{task.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};