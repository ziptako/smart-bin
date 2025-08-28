import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  value: string | number;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const statusConfig = {
  normal: {
    color: 'bg-green-500',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  warning: {
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  critical: {
    color: 'bg-red-500',
    textColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  offline: {
    color: 'bg-gray-500',
    textColor: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
  },
};

export function StatusCard({
  title,
  value,
  status,
  icon,
  trend,
  className,
}: StatusCardProps) {
  const config = statusConfig[status];

  return (
    <Card className={cn('border-l-4', config.borderColor, className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={cn('text-xs', config.textColor, config.bgColor)}
            >
              {status.toUpperCase()}
            </Badge>
            {trend && (
              <span
                className={cn(
                  'text-xs',
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 