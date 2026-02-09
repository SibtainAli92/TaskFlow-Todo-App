'use client';

import { useState } from 'react';

interface TaskToggleProps {
  taskId: string;
  completed: boolean;
  onToggle: (completed: boolean) => void;
}

export const TaskToggle = ({ taskId, completed, onToggle }: TaskToggleProps) => {
  const [isChecked, setIsChecked] = useState(completed);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onToggle(newChecked);
  };

  return (
    <div className="flex items-center h-5">
      <input
        id={`task-${taskId}`}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
      />
      <label htmlFor={`task-${taskId}`} className="sr-only">
        Toggle task completion
      </label>
    </div>
  );
};