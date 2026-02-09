import React from 'react';
import { X } from 'lucide-react';

interface TagChipProps {
  label: string;
  color?: string;
  onRemove?: () => void;
  size?: 'sm' | 'md';
}

export const TagChip = ({
  label,
  color = 'primary',
  onRemove,
  size = 'sm',
}: TagChipProps) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  const colorClasses = {
    primary: 'bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800',
    accent: 'bg-accent-100 dark:bg-accent-950 text-accent-700 dark:text-accent-300 border-accent-200 dark:border-accent-800',
    success: 'bg-success-100 dark:bg-success-950 text-success-700 dark:text-success-300 border-success-200 dark:border-success-800',
    warning: 'bg-warning-100 dark:bg-warning-950 text-warning-700 dark:text-warning-300 border-warning-200 dark:border-warning-800',
    neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700',
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.neutral;

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full border font-medium
        transition-all duration-200
        ${sizeClasses[size]}
        ${colorClass}
        ${onRemove ? 'pr-1' : ''}
      `}
    >
      <span className="truncate max-w-[120px]">{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex-shrink-0 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label={`Remove ${label} tag`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};
