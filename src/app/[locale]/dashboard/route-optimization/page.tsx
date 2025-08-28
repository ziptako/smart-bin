/**
 * Route Optimization Page - 路线优化页面
 * Route Optimization Page
 *
 * 为清洁人员提供智能路线优化功能，包含香港地图、实时数据和控制面板
 * Provides intelligent route optimization for cleaning staff with Hong Kong map, real-time data and control panel
 */
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  MapPin,
  Navigation,
  Route,
  Clock,
  Target,
  Settings,
  RefreshCw,
  Play,
  Pause,
  Layers,
  Filter,
  Download,
  Upload,
  BarChart3,
  Calendar,
  Users,
  Truck,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OptimizationAnalysis } from '@/components/route-optimization/optimization-analysis';
import { MobileRouteOptimizationView } from './mobile-view';

/**
 * 地图组件 - 模拟香港地图
 * Map component - Hong Kong map simulation
 */
function MapView() {
  const [isLoading, setIsLoading] = useState(true);
  const [mapState, setMapState] = useState({
    layer: 'satellite',
    filter: 'all',
    binVisible: true,
    routeVisible: true,
    trafficVisible: false,
  });

  useEffect(() => {
    // 模拟地图加载
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLayerChange = (layer: string) => {
    setMapState(prev => ({ ...prev, layer }));
  };

  const handleFilterChange = (filter: string) => {
    setMapState(prev => ({ ...prev, filter }));
  };

  const handleToggleBinVisibility = () => {
    setMapState(prev => ({ ...prev, binVisible: !prev.binVisible }));
  };

  const handleToggleRouteVisibility = () => {
    setMapState(prev => ({ ...prev, routeVisible: !prev.routeVisible }));
  };

  const handleToggleTrafficVisibility = () => {
    setMapState(prev => ({ ...prev, trafficVisible: !prev.trafficVisible }));
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">加载香港地图...</p>
          </div>
        </div>
      ) : (
        <>
          {/* 地图内容 - 模拟香港地区 */}
          <div className="absolute inset-0 p-4">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-600 relative">
              {/* 模拟垃圾桶标记点 */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              
              {/* 模拟路线 */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                <path
                  d="M 25% 25% Q 50% 30% 67% 33% L 75% 75%"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                <circle cx="25%" cy="25%" r="8" fill="#EF4444" opacity="0.8" />
                <circle cx="67%" cy="33%" r="8" fill="#F59E0B" opacity="0.8" />
                <circle cx="33%" cy="67%" r="8" fill="#10B981" opacity="0.8" />
                <circle cx="75%" cy="75%" r="8" fill="#EF4444" opacity="0.8" />
              </svg>

              {/* 当前位置标记 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </div>

          {/* 地图信息面板 */}
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs">紧急 (3)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs">中等 (5)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs">正常 (12)</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    总距离: 8.5km | 预计时间: 2h 15m
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * 统计卡片组件
 * Statistics card component
 */
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

function StatCard({ title, value, icon: Icon, color, change, changeType }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            {change && (
              <p className={cn(
                "text-xs mt-1",
                changeType === 'positive' ? 'text-green-600' : 
                changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn('p-2 rounded-lg', color)}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



/**
 * 任务列表组件
 * Task list component
 */
function TaskList() {
  const tasks = [
    {
      id: '1',
      location: '中央公园 - A区',
      binId: 'CP-001',
      priority: 'high',
      status: 'pending',
      distance: '0.3km',
      estimatedTime: '15min',
    },
    {
      id: '2',
      location: '购物中心 - 入口',
      binId: 'SM-005',
      priority: 'medium',
      status: 'in-progress',
      distance: '0.8km',
      estimatedTime: '20min',
    },
    {
      id: '3',
      location: '办公楼 - 3楼',
      binId: 'OB-012',
      priority: 'low',
      status: 'completed',
      distance: '1.2km',
      estimatedTime: '10min',
    },
  ];

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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">今日任务</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <p className="font-medium text-sm">{task.location}</p>
                  <p className="text-xs text-gray-500">#{task.binId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                </Badge>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{task.distance}</p>
                  <p className="text-xs text-gray-500">{task.estimatedTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 路线优化主页面
 * Route optimization main page
 */
export default function RouteOptimizationPage() {
  const t = useTranslations('Dashboard');
  const [showAnalysis, setShowAnalysis] = useState(false);

  // 模拟优化指标数据
  const optimizationMetrics = {
    distanceSaved: 2.3,
    timeSaved: 45,
    fuelSaved: 8.5,
    carbonReduced: 2.3,
    efficiencyGain: 87,
    costSavings: 125,
  };

  const handleExportReport = () => {
    console.log('Exporting optimization report...');
  };

  const handleViewDetails = () => {
    console.log('Viewing detailed analysis...');
  };

  // 移动端视图
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return <MobileRouteOptimizationView />;
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t('routeOptimization.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('routeOptimization.description')}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            {t('routeOptimization.settings')}
          </Button>
          <Button 
            variant={showAnalysis ? 'default' : 'outline'}
            onClick={() => setShowAnalysis(!showAnalysis)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            {t('routeOptimization.analysis')}
          </Button>
        </div>
      </div>

      {/* 主要内容区域 */}
      {!showAnalysis ? (
        <div className="space-y-6">
          {/* 地图区域 */}
          <Card className="h-[500px] lg:h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('routeOptimization.hongKongMap')}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {t('routeOptimization.realTimeUpdate')}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-full">
              <MapView />
            </CardContent>
          </Card>

          {/* 地图控制面板 - 放在地图下方 */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* 算法选择和路线控制 */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">优化算法</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'shortest', name: '最短距离', icon: Route },
                      { id: 'fastest', name: '最快时间', icon: Clock },
                      { id: 'balanced', name: '平衡路线', icon: Target },
                      { id: 'eco', name: '环保路线', icon: Zap },
                    ].map((algo) => {
                      const Icon = algo.icon;
                      return (
                        <Button
                          key={algo.id}
                          variant={algo.id === 'balanced' ? 'default' : 'outline'}
                          className="h-auto p-3 flex flex-col items-center space-y-1"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-xs">{algo.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">路线控制</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      开始优化
                    </Button>
                    <Button variant="outline" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      导出路线
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      导入数据
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 地图控制 */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">地图控制</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* 图层选择 */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">图层</div>
                    <div className="space-y-1">
                      {[
                        { id: 'satellite', name: '卫星图', icon: Eye },
                        { id: 'street', name: '街道图', icon: MapPin },
                        { id: 'terrain', name: '地形图', icon: Target },
                      ].map((layer) => {
                        const Icon = layer.icon;
                        return (
                          <Button
                            key={layer.id}
                            size="sm"
                            variant={layer.id === 'terrain' ? 'default' : 'outline'}
                            className="w-full justify-start text-xs h-8"
                          >
                            <Icon className="h-3 w-3 mr-1" />
                            {layer.name}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 过滤器 */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">过滤器</div>
                    <div className="space-y-1">
                      {[
                        { id: 'all', name: '全部', count: 20 },
                        { id: 'urgent', name: '紧急', count: 3 },
                        { id: 'medium', name: '中等', count: 5 },
                        { id: 'normal', name: '正常', count: 12 },
                      ].map((filter) => (
                        <Button
                          key={filter.id}
                          size="sm"
                          variant={filter.id === 'all' ? 'default' : 'outline'}
                          className="w-full justify-between text-xs h-8"
                        >
                          <span>{filter.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {filter.count}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* 显示控制 */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">显示</div>
                    <div className="space-y-1">
                      <Button size="sm" variant="default" className="w-full justify-start text-xs h-8">
                        <Eye className="h-3 w-3 mr-1" />
                        垃圾桶
                      </Button>
                      <Button size="sm" variant="default" className="w-full justify-start text-xs h-8">
                        <Eye className="h-3 w-3 mr-1" />
                        路线
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start text-xs h-8">
                        <EyeOff className="h-3 w-3 mr-1" />
                        交通
                      </Button>
                    </div>
                  </div>

                  {/* 缩放控制 */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">缩放</div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <ZoomIn className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        <ZoomOut className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 任务列表和统计信息 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TaskList />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  title="今日收集"
                  value="15/20"
                  icon={Truck}
                  color="bg-blue-600"
                  change="+2 较昨日"
                  changeType="positive"
                />
                <StatCard
                  title="路线效率"
                  value="87%"
                  icon={TrendingUp}
                  color="bg-green-600"
                  change="+5% 较上周"
                  changeType="positive"
                />
                <StatCard
                  title="节省时间"
                  value="45min"
                  icon={Clock}
                  color="bg-purple-600"
                  change="+12min 较昨日"
                  changeType="positive"
                />
                <StatCard
                  title="碳减排"
                  value="2.3kg"
                  icon={Zap}
                  color="bg-emerald-600"
                  change="+0.5kg 较昨日"
                  changeType="positive"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <OptimizationAnalysis
          metrics={optimizationMetrics}
          onExportReport={handleExportReport}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* 底部统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('routeOptimization.totalRouteLength')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8.5 km</p>
              </div>
              <Route className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('routeOptimization.estimatedCompletionTime')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2h 15m</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('routeOptimization.optimizationEfficiency')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('routeOptimization.carbonReduction')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2.3 kg</p>
              </div>
              <Zap className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 