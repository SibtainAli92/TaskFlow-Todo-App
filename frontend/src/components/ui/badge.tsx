import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Badge = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) => {
  const variantClasses = {
    default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
    primary: 'bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300',
    success: 'bg-success-100 dark:bg-success-950 text-success-700 dark:text-success-300',
    warning: 'bg-warning-100 dark:bg-warning-950 text-warning-700 dark:text-warning-300',
    error: 'bg-error-100 dark:bg-error-950 text-error-700 dark:text-error-300',
    info: 'bg-accent-100 dark:bg-accent-950 text-accent-700 dark:text-accent-300',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};
