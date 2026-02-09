import React from 'react';
import { Button } from './button';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const LoadingState = ({ message = 'Loading...', size = 'medium' }: LoadingStateProps) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        className={`animate-spin text-primary-500 ${sizeClasses[size]}`}
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
      {message && <p className="mt-4 text-sm text-text-medium">{message}</p>}
    </div>
  );
};

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  action?: {
    text: string;
    onClick: () => void;
  };
  illustration?: string;
}

export const EmptyState = ({ message, icon, action, illustration }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon || (
        <div className="bg-background-accent rounded-full p-4">
          <svg
            className="h-12 w-12 text-text-medium"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      )}
      <h3 className="mt-4 text-lg font-medium text-text-dark">{message}</h3>
      {action && (
        <div className="mt-6">
          <Button
            variant="primary"
            size="md"
            onClick={action.onClick}
          >
            {action.text}
          </Button>
        </div>
      )}
    </div>
  );
};

interface ErrorStateProps {
  message: string;
  error?: Error | string;
  onRetry?: () => void;
  icon?: React.ReactNode;
}

export const ErrorState = ({ message, error, onRetry, icon }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon || (
        <div className="bg-error-100 rounded-full p-4">
          <svg
            className="h-12 w-12 text-error-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      )}
      <h3 className="mt-4 text-lg font-medium text-error-600">{message}</h3>
      {error && (
        <p className="mt-2 text-sm text-error-500 max-w-md">
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
      {onRetry && (
        <div className="mt-6">
          <Button
            variant="error"
            size="md"
            onClick={onRetry}
          >
            Try again
          </Button>
        </div>
      )}
    </div>
  );
};

interface SkeletonProps {
  children?: React.ReactNode;
  count?: number;
  height?: string;
  width?: string;
  className?: string;
}

export const Skeleton = ({
  children,
  count = 1,
  height = 'h-4',
  width = 'w-full',
  className = ''
}: SkeletonProps) => {
  if (children) {
    return (
      <div className={`animate-pulse ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${height} ${width} bg-background-accent rounded-md ${className}`}
        />
      ))}
    </>
  );
};