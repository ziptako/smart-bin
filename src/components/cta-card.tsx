'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTACardProps {
  /** 图标组件 */
  icon: LucideIcon;
  /** 卡片标题 */
  title: string;
  /** 卡片描述 */
  description: string;
  /** 按钮文本 */
  actionText: string;
  /** 点击事件处理函数 */
  onAction?: () => void;
  /** 自定义类名 */
  className?: string;
  /** 按钮变体 */
  buttonVariant?: 'default' | 'secondary' | 'outline';
}

/**
 * CTA卡片组件
 * 用于展示行动号召相关的内容，包含图标、标题、描述和按钮
 */
export function CTACard({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className,
  buttonVariant = 'secondary',
}: CTACardProps) {
  return (
    <Card className={cn('bg-white/10 backdrop-blur border-white/20 text-white', className)}>
      <CardContent className="pt-6 text-center flex flex-col h-full">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="opacity-90 mb-4 flex-grow">{description}</p>

        <Button variant={buttonVariant} className="w-full mt-auto" onClick={onAction}>
          {actionText}
        </Button>
      </CardContent>
    </Card>
  );
}
