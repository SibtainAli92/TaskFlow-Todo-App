import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ArrowUp, Minus } from 'lucide-react';

interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high';
  showIcon?: boolean;
}

export const PriorityBadge = ({ priority, showIcon = true }: PriorityBadgeProps) => {
  const config = {
    low: {
      variant: 'default' as const,
      label: 'Low',
      icon: Minus,
    },
    medium: {
      variant: 'warning' as const,
      label: 'Medium',
      icon: AlertCircle,
    },
    high: {
      variant: 'error' as const,
      label: 'High',
      icon: ArrowUp,
    },
  };

  const { variant, label, icon: Icon } = config[priority];

  return (
    <Badge variant={variant} size="sm">
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {label}
    </Badge>
  );
};
