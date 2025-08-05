'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerCaseCardProps {
  name: string;
  deployment: string;
  bins: string;
  result: string;
  deploymentLabel: string;
  binsLabel: string;
  className?: string;
}

/**
 * 客户案例卡片组件
 * 用于展示客户案例信息，包括客户名称、部署时间、垃圾桶数量和效果结果
 */
export function CustomerCaseCard({
  name,
  deployment,
  bins,
  result,
  deploymentLabel,
  binsLabel,
  className,
}: CustomerCaseCardProps) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardContent className="p-6">
        {/* 客户Logo */}
        <div className="flex items-center justify-center h-16 mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Building2 className="h-8 w-8 text-gray-400" />
          {/* 实际项目中这里会是真实的logo图片 */}
          {/* <img src={customer.logo} alt={customer.name} className="h-8" /> */}
        </div>

        {/* 客户信息 */}
        <div className="text-center">
          <h4 className="font-semibold text-sm mb-2">{name}</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>{deploymentLabel}:</span>
              <span>{deployment}</span>
            </div>
            <div className="flex justify-between">
              <span>{binsLabel}:</span>
              <span>{bins}</span>
            </div>
          </div>
          <Badge variant="secondary" className="mt-2 text-xs">
            {result}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
