import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}: SkeletonProps) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const defaultHeight = variant === 'text' ? '1em' : '100%';

  return (
    <div
      className={`
        animate-pulse bg-neutral-200 dark:bg-neutral-800
        ${variantClasses[variant]}
        ${className}
      `}
      style={{
        width: width || '100%',
        height: height || defaultHeight,
        ...style,
      }}
      {...props}
    />
  );
};

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height="1em"
          width={i === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  );
};
