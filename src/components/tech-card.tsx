'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TechCardProps {
  /** 图标组件 */
  icon: LucideIcon;
  /** 技术分类标题 */
  title: string;
  /** 技术分类描述 */
  description: string;
  /** 技术列表 */
  technologies: string[];
  /** 图标颜色类名 */
  iconColor?: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 技术栈卡片组件
 * 用于展示技术分类和相关技术标签
 */
export function TechCard({
  icon: Icon,
  title,
  description,
  technologies,
  iconColor = 'text-blue-600 dark:text-blue-400',
  className,
}: TechCardProps) {
  return (
    <Card className={cn('border-0 shadow-lg hover:shadow-xl transition-shadow', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={cn('h-6 w-6', iconColor)} />
          <h3>{title}</h3>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
