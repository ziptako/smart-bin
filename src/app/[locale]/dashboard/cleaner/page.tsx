/**
 * Cleaner Dashboard Page - 智洁专员工作台页面
 * Cleaner Dashboard Page
 *
 * 为智洁专员提供任务管理、位置导航和工作记录，专为移动端优化
 * Provides task management, location navigation and work records for cleaning specialists, optimized for mobile
 */
'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  CheckSquare,
  Clock,
  MapPin,
  Navigation,
  AlertCircle,
  CheckCircle,
  Calendar,
  UserCheck,
  Route,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 任务卡片组件
 * Task card component
 */
interface TaskCardProps {
  id: string;
  title: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: string;
  distance: string;
  onNavigate: () => void;
  onComplete: () => void;
}

function TaskCard({
  title,
  location,
  priority,
  status,
  estimatedTime,
  distance,
  onNavigate,
  onComplete,
}: TaskCardProps) {
  const t = useTranslations('Dashboard.cleaner');
  const priorityStyles = {
    high: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
    medium: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20',
    low: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20',
  };

  const statusColors = {
    pending: 'text-yellow-600 dark:text-yellow-400',
    'in-progress': 'text-blue-600 dark:text-blue-400',
    completed: 'text-green-600 dark:text-green-400',
  };

  const StatusIcon = {
    pending: Clock,
    'in-progress': AlertCircle,
    completed: CheckCircle,
  }[status];

  return (
    <Card className={cn('border-l-4', priorityStyles[priority])}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <div className="flex items-center space-x-1 mt-1">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge
              variant={priority === 'high' ? 'destructive' : priority === 'medium' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {t(priority).toUpperCase()}
            </Badge>
            <div className={cn('flex items-center space-x-1', statusColors[status])}>
              <StatusIcon className="h-3 w-3" />
              <span className="text-xs capitalize">{t(status === 'in-progress' ? 'inProgress' : status)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Route className="h-3 w-3" />
            <span>{distance}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onNavigate}>
            <Navigation className="h-3 w-3 mr-1" />
            {t('navigate')}
          </Button>
          {status !== 'completed' && (
            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={onComplete}>
              <CheckCircle className="h-3 w-3 mr-1" />
              {t('complete')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 统计卡片组件（移动端优化）
 * Statistics card component (mobile optimized)
 */
interface MobileStatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function MobileStatCard({ title, value, icon: Icon, color }: MobileStatCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <div className={cn('w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center', color)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      </CardContent>
    </Card>
  );
}

/**
 * 智洁专员工作台页面
 * Cleaner dashboard page optimized for mobile use
 */
export default function CleanerDashboardPage() {
  const t = useTranslations('Dashboard.cleaner');

  // 模拟数据
  const todayStats = [
    {
      title: t('todayTasks'),
      value: '8',
      icon: CheckSquare,
      color: 'bg-green-600',
    },
    {
      title: t('completedTasks'),
      value: '5',
      icon: CheckCircle,
      color: 'bg-blue-600',
    },
    {
      title: t('pendingTasks'),
      value: '3',
      icon: Clock,
      color: 'bg-yellow-600',
    },
    {
      title: t('urgentTasks'),
      value: '1',
      icon: AlertCircle,
      color: 'bg-red-600',
    },
  ];

  const tasks = [
    {
      id: '1',
      title: `${t('emptyBin')} - ${t('centralParkZoneA')}`,
      location: `${t('centralParkZoneA')}, Bin #CP-001`,
      priority: 'high' as const,
      status: 'pending' as const,
      estimatedTime: '15 min',
      distance: '0.3 km',
    },
    {
      id: '2',
      title: t('maintenanceCheck'),
      location: `${t('shoppingMallEntrance')}, Bin #SM-005`,
      priority: 'medium' as const,
      status: 'in-progress' as const,
      estimatedTime: '20 min',
      distance: '0.8 km',
    },
    {
      id: '3',
      title: t('replaceBinLiner'),
      location: `${t('officeBuildingFloor3')}, Bin #OB-012`,
      priority: 'low' as const,
      status: 'pending' as const,
      estimatedTime: '10 min',
      distance: '1.2 km',
    },
  ];

  const handleNavigate = (taskId: string) => {
    // 这里可以集成地图导航功能
    console.log('Navigate to task:', taskId);
  };

  const handleCompleteTask = (taskId: string) => {
    // 这里可以标记任务完成
    console.log('Complete task:', taskId);
  };

  const completionPercentage = (5 / 8) * 100; // 5 completed out of 8 total

  return (
    <div className="space-y-6">
      {/* 移动端优化的页面标题 */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{t('overview')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t('todayWorkSchedule')}</p>
        </div>

        {/* 今日进度 */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">{t('todayProgress')}</h3>
                <p className="text-green-100">5 {t('tasksCompleted')}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{Math.round(completionPercentage)}%</div>
                <div className="text-green-100 text-sm">{t('completePercent')}</div>
              </div>
            </div>
            <Progress value={completionPercentage} className="bg-green-400" />
          </CardContent>
        </Card>
      </div>

      {/* 统计卡片 - 移动端优化网格 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {todayStats.map((stat, index) => (
          <MobileStatCard key={index} {...stat} />
        ))}
      </div>

      {/* 快速操作按钮 */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center space-y-1">
          <UserCheck className="h-6 w-6" />
          <span className="text-sm">{t('checkin')}</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
          <MapPin className="h-6 w-6" />
          <span className="text-sm">{t('currentLocation')}</span>
        </Button>
      </div>

      {/* 任务列表 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('nextTask')}</h2>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            {t('schedule')}
          </Button>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              onNavigate={() => handleNavigate(task.id)}
              onComplete={() => handleCompleteTask(task.id)}
            />
          ))}
        </div>
      </div>

      {/* 底部操作区域 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 lg:hidden">
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1">
            <AlertCircle className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Quick Complete
          </Button>
        </div>
      </div>

      {/* 为底部固定按钮留出空间 */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
}
