'use client';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  /** 主标题 */
  title: string;
  /** 副标题/描述 */
  description?: string;
  /** 标题对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 标题大小 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 自定义类名 */
  className?: string;
  /** 描述的最大宽度 */
  descriptionMaxWidth?: string;
}

/**
 * 页面标题组件
 * 用于统一各个section的标题样式和布局
 */
export function SectionHeader({
  title,
  description,
  align = 'center',
  size = 'lg',
  className,
  descriptionMaxWidth = 'max-w-2xl',
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-2xl md:text-4xl',
    xl: 'text-3xl md:text-5xl',
  };

  const containerClasses = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  return (
    <div className={cn(alignClasses[align], className)}>
      <h2 className={cn('font-bold mb-3 md:mb-4', sizeClasses[size])}>{title}</h2>
      {description && (
        <p className={cn('text-lg md:text-xl text-muted-foreground', descriptionMaxWidth, containerClasses[align])}>
          {description}
        </p>
      )}
    </div>
  );
}
