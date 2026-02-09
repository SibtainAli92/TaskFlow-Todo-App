'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center font-medium
    rounded-lg transition-all duration-200 focus:outline-none focus:ring-2
    focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    whitespace-nowrap active:scale-95
  `;

  // Variant classes with new Indigo/Pink palette
  const variantClasses = {
    primary: `
      bg-primary-600 hover:bg-primary-700 text-white
      border border-transparent focus:ring-primary-500
      shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-accent-600 hover:bg-accent-700 text-white
      border border-transparent focus:ring-accent-500
      shadow-sm hover:shadow-md
    `,
    outline: `
      bg-transparent hover:bg-primary-50 dark:hover:bg-primary-950 text-primary-600 dark:text-primary-400
      border border-primary-300 dark:border-primary-700 focus:ring-primary-500
    `,
    ghost: `
      bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800
      text-neutral-700 dark:text-neutral-300
      border border-transparent focus:ring-neutral-500
    `,
    success: `
      bg-success-600 hover:bg-success-700 text-white
      border border-transparent focus:ring-success-500
      shadow-sm hover:shadow-md
    `,
    warning: `
      bg-warning-600 hover:bg-warning-700 text-white
      border border-transparent focus:ring-warning-500
      shadow-sm hover:shadow-md
    `,
    error: `
      bg-error-600 hover:bg-error-700 text-white
      border border-transparent focus:ring-error-500
      shadow-sm hover:shadow-md
    `,
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};