import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Input = ({
  label,
  error,
  helperText,
  required,
  className = '',
  id,
  ...props
}: InputProps) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium mb-2 ${
            error ? 'text-error-600 dark:text-error-400' : 'text-neutral-700 dark:text-neutral-300'
          }`}
        >
          {label} {required && <span className="text-error-600 dark:text-error-400">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-2.5 rounded-lg border transition-all duration-200
          bg-white dark:bg-neutral-900
          text-neutral-900 dark:text-neutral-100
          placeholder:text-neutral-400 dark:placeholder:text-neutral-600
          focus:outline-none focus:ring-2 focus:ring-offset-0
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            error
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 focus:border-primary-500 focus:ring-primary-500/20'
          }
          ${className}
        `}
        {...props}
      />
      {(helperText || error) && (
        <p
          className={`mt-1.5 text-sm ${
            error ? 'text-error-600 dark:text-error-400' : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Textarea = ({
  label,
  error,
  helperText,
  required,
  className = '',
  id,
  ...props
}: TextareaProps) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className={`block text-sm font-medium mb-2 ${
            error ? 'text-error-600 dark:text-error-400' : 'text-neutral-700 dark:text-neutral-300'
          }`}
        >
          {label} {required && <span className="text-error-600 dark:text-error-400">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-2.5 rounded-lg border transition-all duration-200
          bg-white dark:bg-neutral-900
          text-neutral-900 dark:text-neutral-100
          placeholder:text-neutral-400 dark:placeholder:text-neutral-600
          focus:outline-none focus:ring-2 focus:ring-offset-0
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-vertical
          ${
            error
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 focus:border-primary-500 focus:ring-primary-500/20'
          }
          ${className}
        `}
        {...props}
      />
      {(helperText || error) && (
        <p
          className={`mt-1.5 text-sm ${
            error ? 'text-error-600 dark:text-error-400' : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const Select = ({
  label,
  error,
  helperText,
  required,
  className = '',
  id,
  options,
  ...props
}: SelectProps) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className={`block text-sm font-medium mb-2 ${
            error ? 'text-error-600 dark:text-error-400' : 'text-neutral-700 dark:text-neutral-300'
          }`}
        >
          {label} {required && <span className="text-error-600 dark:text-error-400">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`
          w-full px-4 py-2.5 rounded-lg border transition-all duration-200
          bg-white dark:bg-neutral-900
          text-neutral-900 dark:text-neutral-100
          focus:outline-none focus:ring-2 focus:ring-offset-0
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            error
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 focus:border-primary-500 focus:ring-primary-500/20'
          }
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(helperText || error) && (
        <p
          className={`mt-1.5 text-sm ${
            error ? 'text-error-600 dark:text-error-400' : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};