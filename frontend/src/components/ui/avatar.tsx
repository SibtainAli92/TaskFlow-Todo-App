import React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar = ({
  src,
  alt,
  fallback,
  size = 'md',
  className = '',
  ...props
}: AvatarProps) => {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const displayFallback = fallback || alt.charAt(0).toUpperCase();

  return (
    <div
      className={`
        relative inline-flex items-center justify-center
        rounded-full overflow-hidden
        bg-primary-100 dark:bg-primary-900
        text-primary-700 dark:text-primary-300
        font-semibold
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{displayFallback}</span>
      )}
    </div>
  );
};
