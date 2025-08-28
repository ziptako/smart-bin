import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  MapPin, 
  BarChart3, 
  Settings, 
  Users, 
  Download,
  RefreshCw
} from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  variant?: 'default' | 'outline' | 'secondary';
}

interface QuickActionsProps {
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      title: '添加垃圾桶',
      description: '注册新的智能垃圾桶设备',
      icon: <Plus className="h-5 w-5" />,
      action: () => console.log('添加垃圾桶'),
      variant: 'default',
    },
    {
      title: '地图视图',
      description: '查看垃圾桶分布位置',
      icon: <MapPin className="h-5 w-5" />,
      action: () => console.log('地图视图'),
      variant: 'outline',
    },
    {
      title: '数据分析',
      description: '查看详细统计报告',
      icon: <BarChart3 className="h-5 w-5" />,
      action: () => console.log('数据分析'),
      variant: 'outline',
    },
    {
      title: '用户管理',
      description: '管理系统用户和权限',
      icon: <Users className="h-5 w-5" />,
      action: () => console.log('用户管理'),
      variant: 'outline',
    },
    {
      title: '导出数据',
      description: '导出系统数据报告',
      icon: <Download className="h-5 w-5" />,
      action: () => console.log('导出数据'),
      variant: 'secondary',
    },
    {
      title: '系统设置',
      description: '配置系统参数',
      icon: <Settings className="h-5 w-5" />,
      action: () => console.log('系统设置'),
      variant: 'secondary',
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          快速操作
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-start gap-2 text-left"
              onClick={action.action}
            >
              <div className="flex items-center gap-2 w-full">
                {action.icon}
                <div className="flex-1">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 