'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  /** 图标组件 */
  icon: LucideIcon;
  /** 卡片标题 */
  title: string;
  /** 卡片描述 */
  description: string;
  /** 图标颜色类名 */
  iconColor?: string;
  /** 图标背景颜色类名 */
  iconBgColor?: string;
  /** 自定义类名 */
  className?: string;
  /** 图标大小 */
  iconSize?: 'sm' | 'md' | 'lg';
}

/**
 * 特性卡片组件
 * 用于展示带图标的功能特性，统一样式和布局
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor = 'text-blue-600 dark:text-blue-400',
  iconBgColor = 'bg-blue-100 dark:bg-blue-900/20',
  className,
  iconSize = 'md',
}: FeatureCardProps) {
  const sizeClasses = {
    sm: {
      container: 'w-8 h-8',
      icon: 'h-4 w-4',
    },
    md: {
      container: 'w-10 h-10 md:w-12 md:h-12',
      icon: 'h-5 w-5 md:h-6 md:w-6',
    },
    lg: {
      container: 'w-12 h-12 md:w-16 md:h-16',
      icon: 'h-6 w-6 md:h-8 md:w-8',
    },
  };

  const { container, icon } = sizeClasses[iconSize];

  return (
    <Card className={cn('border-0 shadow-lg hover:shadow-xl transition-shadow', className)}>
      <CardHeader className="p-4 md:p-6">
        <div className={cn(container, iconBgColor, 'rounded-lg flex items-center justify-center mb-3 md:mb-4')}>
          <Icon className={cn(icon, iconColor)} />
        </div>
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm md:text-base">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
