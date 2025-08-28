import * as React from 'react';
import { MetricsGrid } from './metrics-grid';
import { QuickActions } from './quick-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp } from 'lucide-react';

interface DashboardPageProps {
  className?: string;
}

export function DashboardPage({ className }: DashboardPageProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">仪表板</h1>
          <p className="text-muted-foreground">
            智能垃圾桶管理系统概览
          </p>
        </div>
      </div>

      {/* 指标网格 */}
      <MetricsGrid />

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 快速操作 */}
        <div className="lg:col-span-2">
          <QuickActions />
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          {/* 实时活动 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                实时活动
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">垃圾桶 #A123 已清理</p>
                    <p className="text-xs text-muted-foreground">2分钟前</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">垃圾桶 #B456 需要清理</p>
                    <p className="text-xs text-muted-foreground">5分钟前</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">新设备 #C789 已注册</p>
                    <p className="text-xs text-muted-foreground">10分钟前</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 统计概览 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                本周统计
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">清理次数</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">回收重量</span>
                  <span className="font-medium">2.5吨</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">设备利用率</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">响应时间</span>
                  <span className="font-medium">15分钟</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 