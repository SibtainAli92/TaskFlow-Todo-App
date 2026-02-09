'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in';
  delay?: number;
  threshold?: number;
}

export const ScrollAnimationWrapper = ({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
  threshold = 0.1,
}: ScrollAnimationWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            // Unobserve after animation triggers (one-time animation)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold]);

  const animationClasses = {
    'fade-in': 'opacity-0 transition-opacity duration-700 ease-out',
    'slide-up': 'opacity-0 translate-y-8 transition-all duration-700 ease-out',
    'slide-down': 'opacity-0 -translate-y-8 transition-all duration-700 ease-out',
    'scale-in': 'opacity-0 scale-95 transition-all duration-700 ease-out',
  };

  const visibleClasses = {
    'fade-in': 'opacity-100',
    'slide-up': 'opacity-100 translate-y-0',
    'slide-down': 'opacity-100 translate-y-0',
    'scale-in': 'opacity-100 scale-100',
  };

  return (
    <div
      ref={elementRef}
      className={`
        ${animationClasses[animation]}
        ${isVisible ? visibleClasses[animation] : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
