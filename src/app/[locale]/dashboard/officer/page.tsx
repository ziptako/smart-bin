/**
 * Officer Dashboard Page - 环境智控官仪表板页面
 * Officer Dashboard Page
 *
 * 为环境智控官提供数据概览、告警监控和性能指标
 * Provides data overview, alert monitoring and performance metrics for environmental control officers
 */
'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Trash2, Route, Activity, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 统计卡片组件
 * Statistics card component
 */
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

function StatCard({ title, value, change, changeType, icon: Icon }: StatCardProps) {
  const changeColor = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400',
  }[changeType];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn('text-xs', changeColor)}>{change}</p>
      </CardContent>
    </Card>
  );
}

/**
 * 告警项组件
 * Alert item component
 */
interface AlertItemProps {
  id: string;
  type: 'high' | 'medium' | 'low';
  message: string;
  location: string;
  time: string;
}

function AlertItem({ type, message, location, time }: AlertItemProps) {
  const alertStyles = {
    high: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
    medium: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20',
    low: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20',
  };

  const alertColors = {
    high: 'text-red-600 dark:text-red-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    low: 'text-blue-600 dark:text-blue-400',
  };

  return (
    <div className={cn('p-3 rounded-lg border', alertStyles[type])}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-2">
          <AlertTriangle className={cn('h-4 w-4 mt-0.5', alertColors[type])} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{message}</p>
            <div className="flex items-center space-x-2 mt-1">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">{location}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
            </div>
          </div>
        </div>
        <Badge variant={type === 'high' ? 'destructive' : type === 'medium' ? 'default' : 'secondary'}>
          {type.toUpperCase()}
        </Badge>
      </div>
    </div>
  );
}

/**
 * 环境智控官仪表板页面
 * Officer dashboard page with comprehensive monitoring and analytics
 */
export default function OfficerDashboardPage() {
  const t = useTranslations('Dashboard.officer');

  // 模拟数据
  const stats = [
    {
      title: t('totalBins'),
      value: '1,247',
      change: `+12% ${t('fromLastMonth')}`,
      changeType: 'positive' as const,
      icon: Trash2,
    },
    {
      title: t('activeBins'),
      value: '1,198',
      change: `+5% ${t('fromLastWeek')}`,
      changeType: 'positive' as const,
      icon: CheckCircle,
    },
    {
      title: t('alertsCount'),
      value: '23',
      change: `-8% ${t('fromYesterday')}`,
      changeType: 'positive' as const,
      icon: AlertTriangle,
    },
    {
      title: t('efficiency'),
      value: '94.2%',
      change: `+2.1% ${t('fromLastWeek')}`,
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
  ];

  const recentAlerts = [
    {
      id: '1',
      type: 'high' as const,
      message: t('binOverflowDetected'),
      location: t('centralParkZoneA'),
      time: `5 ${t('minAgo')}`,
    },
    {
      id: '2',
      type: 'medium' as const,
      message: t('maintenanceRequired'),
      location: t('shoppingMallEntrance'),
      time: `15 ${t('minAgo')}`,
    },
    {
      id: '3',
      type: 'low' as const,
      message: t('batteryLowWarning'),
      location: t('officeBuildingFloor3'),
      time: `1 ${t('hourAgo')}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('overview')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t('description')}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            {t('exportReport')}
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Activity className="h-4 w-4 mr-2" />
            {t('realtimeView')}
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 最近告警 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                {t('recentAlerts')}
              </CardTitle>
              <CardDescription>{t('alertsDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.map((alert) => (
                <AlertItem key={alert.id} {...alert} />
              ))}
              <div className="pt-3">
                <Button variant="outline" className="w-full">
                  {t('viewAllAlerts')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 快速操作 */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                {t('quickActions')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                {t('binManagement')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Route className="h-4 w-4 mr-2" />
                {t('routeOptimization')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                {t('analytics')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {t('alerts')}
              </Button>
            </CardContent>
          </Card>

          {/* 系统状态 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                {t('systemStatus')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('network')}</span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                >
                  {t('online')}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('database')}</span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                >
                  {t('healthy')}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('api')}</span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                >
                  {t('active')}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
