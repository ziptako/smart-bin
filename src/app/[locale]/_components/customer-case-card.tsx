'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CustomerCaseCardProps {
  /** 客户名称 */
  name: string;
  /** 英文名称 */
  nameEn?: string;
  /** Logo路径 */
  logo: string;
  /** 部署时间 */
  deployment: string;
  /** 垃圾桶数量 */
  bins: string;
  /** 效果结果 */
  result: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 客户案例卡片组件
 * 专用于展示客户部署案例和效果
 */
export function CustomerCaseCard({ name, nameEn, logo, deployment, bins, result, className }: CustomerCaseCardProps) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={logo}
              alt={`${name} logo`}
              width={48}
              height={48}
              className="object-contain"
              onError={(e) => {
                // 如果图片加载失败，显示文字缩写
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-lg font-bold text-muted-foreground">${name.charAt(0)}</span>`;
                }
              }}
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg">{name}</h4>
            {nameEn && <p className="text-sm text-muted-foreground">{nameEn}</p>}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">部署时间</span>
            <Badge variant="outline">{deployment}</Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">设备数量</span>
            <Badge variant="secondary">{bins}</Badge>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm font-medium text-green-600 dark:text-green-400">{result}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
