import React from 'react';
import { PriorityBadge } from './PriorityBadge';
import { TagChip } from './TagChip';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MoreVertical, CheckCircle2, Circle } from 'lucide-react';

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
  tags?: string[];
  onToggleComplete?: (id: string) => void;
  onClick?: (id: string) => void;
  onMenuClick?: (id: string) => void;
}

export const TaskCard = ({
  id,
  title,
  description,
  priority,
  status,
  dueDate,
  tags = [],
  onToggleComplete,
  onClick,
  onMenuClick,
}: TaskCardProps) => {
  const isCompleted = status === 'completed';
  const isOverdue = dueDate && new Date(dueDate) < new Date() && !isCompleted;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete?.(id);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMenuClick?.(id);
  };

  return (
    <div
      className={`
        group relative bg-gradient-to-br from-white to-neutral-50/50
        dark:from-neutral-900 dark:to-neutral-900/50
        rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer
        hover:shadow-2xl hover:scale-[1.02] transform
        ${
          isCompleted
            ? 'border-success-200 dark:border-success-900/30 bg-success-50/30 dark:bg-success-950/10 opacity-80'
            : 'border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-700'
        }
        ${isOverdue ? 'border-error-300 dark:border-error-800 bg-error-50/20 dark:bg-error-950/10' : ''}
      `}
      onClick={() => onClick?.(id)}
    >
      {/* Gradient Overlay for Completed Tasks */}
      {isCompleted && (
        <div className="absolute inset-0 bg-gradient-to-br from-success-100/20 to-success-200/20 dark:from-success-900/10 dark:to-success-950/10 rounded-2xl pointer-events-none" />
      )}

      <div className="flex items-start gap-4 relative z-10">
        {/* Enhanced Checkbox */}
        <button
          onClick={handleCheckboxClick}
          className={`
            mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2
            transition-all duration-300 flex items-center justify-center
            hover:scale-110 active:scale-95
            ${
              isCompleted
                ? 'bg-gradient-to-br from-success-500 to-success-600 border-success-600 shadow-lg shadow-success-500/50'
                : 'border-neutral-300 dark:border-neutral-600 hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30'
            }
          `}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-white" />
          ) : (
            <Circle className="w-3 h-3 text-neutral-400 dark:text-neutral-600" />
          )}
        </button>

        {/* Enhanced Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className={`
                text-lg font-bold text-neutral-900 dark:text-neutral-50
                transition-all duration-200
                ${
                  isCompleted
                    ? 'line-through text-neutral-500 dark:text-neutral-600'
                    : 'group-hover:text-primary-600 dark:group-hover:text-primary-400'
                }
              `}
            >
              {title}
            </h3>
            <button
              onClick={handleMenuClick}
              className="
                flex-shrink-0 p-2 rounded-xl
                hover:bg-gradient-to-br hover:from-error-50 hover:to-error-100
                dark:hover:from-error-950/50 dark:hover:to-error-900/50
                opacity-0 group-hover:opacity-100 transition-all duration-200
                hover:shadow-md transform hover:scale-110 active:scale-95
                border border-transparent hover:border-error-200 dark:hover:border-error-800
              "
              aria-label="Task options"
            >
              <MoreVertical className="h-5 w-5 text-neutral-500 dark:text-neutral-400 hover:text-error-600 dark:hover:text-error-400 transition-colors" />
            </button>
          </div>

          {description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Enhanced Meta Information */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <PriorityBadge priority={priority} />

            {status === 'in_progress' && (
              <Badge variant="info" size="sm" className="shadow-sm">
                <Clock className="h-3 w-3 mr-1" />
                In Progress
              </Badge>
            )}

            {status === 'completed' && (
              <Badge variant="success" size="sm" className="shadow-sm">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}

            {dueDate && (
              <div
                className={`
                  flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full
                  transition-all duration-200
                  ${
                    isOverdue
                      ? 'text-error-700 dark:text-error-300 bg-error-100 dark:bg-error-950/50 font-semibold border border-error-300 dark:border-error-800'
                      : 'text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/50'
                  }
                `}
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {new Date(dueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                {isOverdue && <span className="ml-1 font-bold">⚠️</span>}
              </div>
            )}
          </div>

          {/* Enhanced Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <TagChip key={index} label={tag} size="sm" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
