'use client';

import React from 'react';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
}

export const Switch = ({
  checked,
  onCheckedChange,
  disabled = false,
  label,
  id,
}: SwitchProps) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={label ? `${switchId}-label` : undefined}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 focus:outline-none focus:ring-2
          focus:ring-primary-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${checked ? 'bg-primary-600' : 'bg-neutral-300 dark:bg-neutral-700'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full
            bg-white transition-transform duration-200
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      {label && (
        <label
          id={`${switchId}-label`}
          htmlFor={switchId}
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  );
};
