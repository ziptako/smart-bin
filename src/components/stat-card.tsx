'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  /** 图标组件 */
  icon: LucideIcon;
  /** 统计数值 */
  value: string;
  /** 统计标签 */
  label: string;
  /** 描述信息 */
  description?: string;
  /** 案例信息 */
  case?: string;
  /** 徽章内容 */
  badge?: string;
  /** 图标颜色类名 */
  iconColor?: string;
  /** 背景颜色类名 */
  bgColor?: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 统计卡片组件
 * 用于展示KPI数据和统计信息
 */
export function StatCard({
  icon: Icon,
  value,
  label,
  description,
  case: caseInfo,
  badge,
  iconColor = 'text-blue-600 dark:text-blue-400',
  bgColor = 'bg-blue-50 dark:bg-blue-950/20',
  className,
}: StatCardProps) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', bgColor)}>
            <Icon className={cn('h-6 w-6', iconColor)} />
          </div>
          {badge && (
            <Badge variant="secondary" className="font-semibold">
              {badge}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-lg font-semibold text-foreground">{label}</div>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          {caseInfo && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground font-medium">案例: {caseInfo}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
