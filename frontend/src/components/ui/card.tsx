import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
}

export const Card = ({
  children,
  className = '',
  variant = 'default',
  ...props
}: CardProps) => {
  const variantClasses = {
    default: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800',
    elevated: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl',
    outlined: 'bg-transparent border-2 border-neutral-300 dark:border-neutral-700',
    gradient: 'bg-gradient-to-br from-white to-neutral-50/50 dark:from-neutral-900 dark:to-neutral-900/50 border-2 border-neutral-200 dark:border-neutral-800',
  };

  const classes = `
    rounded-2xl transition-all duration-300
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = ({
  children,
  className = '',
  ...props
}: CardHeaderProps) => {
  return (
    <div className={`p-6 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = ({
  children,
  className = '',
  ...props
}: CardContentProps) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = ({
  children,
  className = '',
  ...props
}: CardFooterProps) => {
  return (
    <div className={`p-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 ${className}`} {...props}>
      {children}
    </div>
  );
};
