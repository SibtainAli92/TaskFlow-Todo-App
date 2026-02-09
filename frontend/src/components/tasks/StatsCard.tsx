import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'accent' | 'success' | 'warning';
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'primary',
}: StatsCardProps) => {
  const colorClasses = {
    primary: {
      gradient: 'from-primary-500 to-primary-600',
      bg: 'from-primary-50 to-primary-100/50 dark:from-primary-950/50 dark:to-primary-900/30',
      border: 'border-primary-200 dark:border-primary-800',
      shadow: 'shadow-primary-500/30',
    },
    accent: {
      gradient: 'from-accent-500 to-accent-600',
      bg: 'from-accent-50 to-accent-100/50 dark:from-accent-950/50 dark:to-accent-900/30',
      border: 'border-accent-200 dark:border-accent-800',
      shadow: 'shadow-accent-500/30',
    },
    success: {
      gradient: 'from-success-500 to-success-600',
      bg: 'from-success-50 to-success-100/50 dark:from-success-950/50 dark:to-success-900/30',
      border: 'border-success-200 dark:border-success-800',
      shadow: 'shadow-success-500/30',
    },
    warning: {
      gradient: 'from-warning-500 to-warning-600',
      bg: 'from-warning-50 to-warning-100/50 dark:from-warning-950/50 dark:to-warning-900/30',
      border: 'border-warning-200 dark:border-warning-800',
      shadow: 'shadow-warning-500/30',
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`
        bg-gradient-to-br ${colors.bg}
        rounded-2xl p-6 border-2 ${colors.border}
        hover:shadow-2xl hover:scale-105
        transition-all duration-300 transform
        cursor-pointer group
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`
            p-4 rounded-xl bg-gradient-to-br ${colors.gradient} text-white
            shadow-lg ${colors.shadow}
            transform group-hover:scale-110 group-hover:rotate-3
            transition-all duration-300
          `}
        >
          <Icon className="h-7 w-7" />
        </div>
        {trend && (
          <div
            className={`
              text-sm font-bold px-3 py-1 rounded-full
              ${
                trend.isPositive
                  ? 'text-success-700 dark:text-success-300 bg-success-100 dark:bg-success-950/50'
                  : 'text-error-700 dark:text-error-300 bg-error-100 dark:bg-error-950/50'
              }
            `}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
          {title}
        </p>
        <p className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
};
