'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScenarioCardProps {
  /** 图标组件 */
  icon: LucideIcon;
  /** 场景标题 */
  scenario: string;
  /** 问题描述 */
  problem: string;
  /** 解决方案 */
  solution: string;
  /** 准确率 */
  accuracy?: string;
  /** 图标颜色类名 */
  iconColor?: string;
  /** 背景颜色类名 */
  bgColor?: string;
  /** 边框颜色类名 */
  borderColor?: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 场景卡片组件
 * 展示具体场景-痛点-解决方案的三段式卡片
 */
export function ScenarioCard({
  icon: Icon,
  scenario,
  problem,
  solution,
  accuracy,
  iconColor = 'text-blue-600 dark:text-blue-400',
  bgColor = 'bg-blue-50 dark:bg-blue-950/20',
  borderColor = 'border-blue-200 dark:border-blue-800',
  className,
}: ScenarioCardProps) {
  return (
    <Card
      className={cn(
        'border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105',
        borderColor,
        className,
      )}
    >
      <CardHeader className={cn(bgColor, 'rounded-t-lg')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
              <Icon className={cn('h-6 w-6', iconColor)} />
            </div>
            <CardTitle className="text-lg">
              <h3>{scenario}</h3>
            </CardTitle>
          </div>
          {accuracy && (
            <Badge variant="secondary" className={cn(iconColor, 'font-bold')}>
              {accuracy}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* 痛点 */}
          <div>
            <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">痛点</h4>
            <p className="text-sm text-muted-foreground">{problem}</p>
          </div>

          {/* 箭头 */}
          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* 解决方案 */}
          <div>
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">解决方案</h4>
            <p className="text-sm text-foreground font-medium">{solution}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
