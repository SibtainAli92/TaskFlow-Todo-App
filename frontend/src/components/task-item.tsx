import { Task } from '../types/task';
import { TaskToggle } from './task-toggle';
import { Button } from './ui/button';

interface TaskItemProps {
  task: Task;
  onUpdate: (taskId: string, updatedTask: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
  isSelected?: boolean;
  onSelect?: (taskId: string) => void;
}

export const TaskItem = ({ task, onUpdate, onDelete, isSelected, onSelect }: TaskItemProps) => {
  return (
    <li className={`p-4 border border-gray-200 rounded-lg ${isSelected ? 'bg-primary-50' : 'bg-white'} hover:bg-gray-50`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={!!isSelected}
            onChange={() => onSelect && onSelect(task.id)}
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
          />
          <TaskToggle
            taskId={task.id}
            completed={task.completed}
            onToggle={(completed) => onUpdate(task.id, { completed })}
          />
          <div className="ml-3 flex-1">
            <p
              className={`text-base font-medium ${
                task.completed ? 'text-text-medium line-through' : 'text-text-dark'
              }`}
            >
              {task.title}
            </p>
            {task.description && (
              <p className="text-sm text-text-medium mt-1">{task.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="error"
            size="sm"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="mt-2 flex justify-between text-sm text-text-medium">
        <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
        <span>Updated: {new Date(task.updated_at).toLocaleDateString()}</span>
      </div>
    </li>
  );
};