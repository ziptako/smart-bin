/**
 * Mobile Route Optimization View - 移动端路线优化视图
 * Mobile Route Optimization View
 *
 * 专为清洁人员在户外使用设计的移动端优化界面
 * Mobile-optimized interface designed for cleaning staff outdoor use
 */
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  MapPin,
  Navigation,
  Route,
  Clock,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  XCircle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BarChart3,
  Settings,
  Truck,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 移动端地图视图
 * Mobile map view
 */
function MobileMapView() {
  const [currentLocation] = useState('香港中环');

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border">
      {/* 地图内容 */}
      <div className="absolute inset-0 p-4">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-600 relative">
          {/* 模拟垃圾桶标记点 */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
          
          {/* 当前位置标记 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full animate-ping opacity-75"></div>
          </div>

          {/* 路线 */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <path
              d="M 25% 25% Q 50% 30% 67% 33% L 75% 75%"
              stroke="#3B82F6"
              strokeWidth="4"
              fill="none"
              strokeDasharray="8,8"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      {/* 地图控制按钮 */}
      <div className="absolute top-2 right-2 flex flex-col space-y-1">
        <Button size="sm" variant="outline" className="bg-white/90 dark:bg-gray-800/90 h-8 w-8 p-0">
          <ZoomIn className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 dark:bg-gray-800/90 h-8 w-8 p-0">
          <ZoomOut className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 dark:bg-gray-800/90 h-8 w-8 p-0">
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>

      {/* 位置信息 */}
      <div className="absolute bottom-2 left-2 right-2">
        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
          <CardContent className="p-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">{currentLocation}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs">3</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs">12</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * 移动端任务卡片
 * Mobile task card
 */
interface MobileTaskCardProps {
  id: string;
  location: string;
  binId: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  distance: string;
  estimatedTime: string;
  onNavigate: () => void;
  onComplete: () => void;
}

function MobileTaskCard({
  location,
  binId,
  priority,
  status,
  distance,
  estimatedTime,
  onNavigate,
  onComplete,
}: MobileTaskCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {getStatusIcon(status)}
            <div>
              <p className="font-medium text-sm">{location}</p>
              <p className="text-xs text-gray-500">#{binId}</p>
            </div>
          </div>
          <Badge className={getPriorityColor(priority)}>
            {priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Route className="h-3 w-3" />
            <span>{distance}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{estimatedTime}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onNavigate}>
            <Navigation className="h-3 w-3 mr-1" />
            导航
          </Button>
          {status !== 'completed' && (
            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={onComplete}>
              <CheckCircle className="h-3 w-3 mr-1" />
              完成
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 移动端统计卡片
 * Mobile statistics card
 */
interface MobileStatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  change?: string;
}

function MobileStatCard({ title, value, icon: Icon, color, change }: MobileStatCardProps) {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
            {change && (
              <p className="text-xs text-green-600 mt-1">{change}</p>
            )}
          </div>
          <div className={cn('p-2 rounded-lg', color)}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 移动端路线优化视图
 * Mobile route optimization view
 */
export function MobileRouteOptimizationView() {
  const [currentView, setCurrentView] = useState<'map' | 'tasks' | 'stats'>('map');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const tasks = [
    {
      id: '1',
      location: '中央公园 - A区',
      binId: 'CP-001',
      priority: 'high' as const,
      status: 'pending' as const,
      distance: '0.3km',
      estimatedTime: '15min',
    },
    {
      id: '2',
      location: '购物中心 - 入口',
      binId: 'SM-005',
      priority: 'medium' as const,
      status: 'in-progress' as const,
      distance: '0.8km',
      estimatedTime: '20min',
    },
    {
      id: '3',
      location: '办公楼 - 3楼',
      binId: 'OB-012',
      priority: 'low' as const,
      status: 'completed' as const,
      distance: '1.2km',
      estimatedTime: '10min',
    },
  ];

  const stats = [
    {
      title: '今日收集',
      value: '15/20',
      icon: Truck,
      color: 'bg-blue-600',
      change: '+2 较昨日',
    },
    {
      title: '路线效率',
      value: '87%',
      icon: TrendingUp,
      color: 'bg-green-600',
      change: '+5% 较上周',
    },
    {
      title: '节省时间',
      value: '45min',
      icon: Clock,
      color: 'bg-purple-600',
      change: '+12min 较昨日',
    },
    {
      title: '碳减排',
      value: '2.3kg',
      icon: Zap,
      color: 'bg-emerald-600',
      change: '+0.5kg 较昨日',
    },
  ];

  const handleNavigate = (taskId: string) => {
    console.log('Navigate to task:', taskId);
  };

  const handleCompleteTask = (taskId: string) => {
    console.log('Complete task:', taskId);
  };

  return (
    <div className="space-y-4">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">路线优化</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">智能路线规划</p>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 视图切换 */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <Button
          size="sm"
          variant={currentView === 'map' ? 'default' : 'ghost'}
          className="flex-1 text-xs"
          onClick={() => setCurrentView('map')}
        >
          <MapPin className="h-3 w-3 mr-1" />
          地图
        </Button>
        <Button
          size="sm"
          variant={currentView === 'tasks' ? 'default' : 'ghost'}
          className="flex-1 text-xs"
          onClick={() => setCurrentView('tasks')}
        >
          <CheckSquare className="h-3 w-3 mr-1" />
          任务
        </Button>
        <Button
          size="sm"
          variant={currentView === 'stats' ? 'default' : 'ghost'}
          className="flex-1 text-xs"
          onClick={() => setCurrentView('stats')}
        >
          <BarChart3 className="h-3 w-3 mr-1" />
          统计
        </Button>
      </div>

      {/* 地图视图 */}
      {currentView === 'map' && (
        <div className="space-y-4">
          <MobileMapView />
          
          {/* 优化控制 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex space-x-2">
                <Button 
                  className="flex-1" 
                  onClick={() => setIsOptimizing(!isOptimizing)}
                >
                  {isOptimizing ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isOptimizing ? '暂停优化' : '开始优化'}
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 任务视图 */}
      {currentView === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">今日任务</h3>
            <Badge variant="outline">3 个任务</Badge>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <MobileTaskCard
                key={task.id}
                {...task}
                onNavigate={() => handleNavigate(task.id)}
                onComplete={() => handleCompleteTask(task.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 统计视图 */}
      {currentView === 'stats' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <MobileStatCard key={index} {...stat} />
            ))}
          </div>
          
          {/* 进度卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">今日进度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">完成进度</span>
                  <span className="text-sm font-semibold">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>已完成: 15/20</span>
                  <span>剩余: 5 个任务</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1">
            <AlertTriangle className="h-4 w-4 mr-2" />
            报告问题
          </Button>
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            快速完成
          </Button>
        </div>
      </div>

      {/* 为底部固定按钮留出空间 */}
      <div className="h-20"></div>
    </div>
  );
} 