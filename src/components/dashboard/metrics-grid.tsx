import * as React from 'react';
import { StatusCard } from './status-card';
import { Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface MetricsGridProps {
  className?: string;
}

export function MetricsGrid({ className }: MetricsGridProps) {
  const metrics = [
    {
      title: '在线垃圾桶',
      value: '156',
      status: 'normal' as const,
      icon: <CheckCircle className="h-4 w-4" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: '需要清理',
      value: '23',
      status: 'warning' as const,
      icon: <AlertTriangle className="h-4 w-4" />,
      trend: { value: 5, isPositive: false },
    },
    {
      title: '故障设备',
      value: '3',
      status: 'critical' as const,
      icon: <XCircle className="h-4 w-4" />,
      trend: { value: 1, isPositive: false },
    },
    {
      title: '离线设备',
      value: '8',
      status: 'offline' as const,
      icon: <Trash2 className="h-4 w-4" />,
      trend: { value: 2, isPositive: false },
    },
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <StatusCard
            key={index}
            title={metric.title}
            value={metric.value}
            status={metric.status}
            icon={metric.icon}
            trend={metric.trend}
          />
        ))}
      </div>
    </div>
  );
} 