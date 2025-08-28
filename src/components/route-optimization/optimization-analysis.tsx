/**
 * Optimization Analysis Component - 路线优化分析组件
 * Optimization Analysis Component
 *
 * 显示路线优化的详细分析数据，包括效率提升、时间节省、碳排放减少等
 * Displays detailed route optimization analysis including efficiency improvements, time savings, carbon emission reductions
 */
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Route,
  Zap,
  Fuel,
  DollarSign,
  BarChart3,
  Calendar,
  Target,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptimizationMetrics {
  distanceSaved: number;
  timeSaved: number;
  fuelSaved: number;
  carbonReduced: number;
  efficiencyGain: number;
  costSavings: number;
}

interface OptimizationAnalysisProps {
  metrics: OptimizationMetrics;
  onExportReport: () => void;
  onViewDetails: () => void;
}

export function OptimizationAnalysis({
  metrics,
  onExportReport,
  onViewDetails,
}: OptimizationAnalysisProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  const timeframes = [
    { id: 'today', name: '今日', icon: Calendar },
    { id: 'week', name: '本周', icon: BarChart3 },
    { id: 'month', name: '本月', icon: TrendingUp },
  ];

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'text-green-600';
    if (efficiency >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEfficiencyIcon = (efficiency: number) => {
    if (efficiency >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (efficiency >= 60) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* 时间范围选择 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">优化分析</h3>
        <div className="flex space-x-2">
          {timeframes.map((timeframe) => {
            const Icon = timeframe.icon;
            return (
              <Button
                key={timeframe.id}
                size="sm"
                variant={selectedTimeframe === timeframe.id ? 'default' : 'outline'}
                onClick={() => setSelectedTimeframe(timeframe.id)}
              >
                <Icon className="h-3 w-3 mr-1" />
                {timeframe.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* 主要指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">距离节省</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {metrics.distanceSaved}km
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  <TrendingDown className="h-3 w-3 inline mr-1" />
                  较优化前
                </p>
              </div>
              <Route className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">时间节省</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {metrics.timeSaved}min
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  <TrendingDown className="h-3 w-3 inline mr-1" />
                  较优化前
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">燃油节省</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {metrics.fuelSaved}L
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  <TrendingDown className="h-3 w-3 inline mr-1" />
                  较优化前
                </p>
              </div>
              <Fuel className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">碳减排</p>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                  {metrics.carbonReduced}kg
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  <TrendingDown className="h-3 w-3 inline mr-1" />
                  较优化前
                </p>
              </div>
              <Zap className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">成本节省</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  ${metrics.costSavings}
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                  <TrendingDown className="h-3 w-3 inline mr-1" />
                  较优化前
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">效率提升</p>
                <p className={cn("text-2xl font-bold", getEfficiencyColor(metrics.efficiencyGain))}>
                  {metrics.efficiencyGain}%
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  较优化前
                </p>
              </div>
              <Target className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详细分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 效率趋势 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              效率趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">当前效率</span>
                <div className="flex items-center space-x-2">
                  {getEfficiencyIcon(metrics.efficiencyGain)}
                  <span className={cn("font-semibold", getEfficiencyColor(metrics.efficiencyGain))}>
                    {metrics.efficiencyGain}%
                  </span>
                </div>
              </div>
              <Progress value={metrics.efficiencyGain} className="h-2" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">目标</p>
                  <p className="text-lg font-semibold text-green-600">90%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">平均</p>
                  <p className="text-lg font-semibold text-blue-600">85%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">最低</p>
                  <p className="text-lg font-semibold text-red-600">75%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 优化建议 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              优化建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    路线优化效果良好
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    当前路线比传统路线节省了 {metrics.timeSaved} 分钟
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    建议调整收集时间
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    避开交通高峰期可进一步提升效率
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    关注高优先级垃圾桶
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    优先处理紧急状态的垃圾桶
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 操作按钮 */}
      <div className="flex space-x-4">
        <Button onClick={onViewDetails} className="flex-1">
          <BarChart3 className="h-4 w-4 mr-2" />
          查看详细报告
        </Button>
        <Button variant="outline" onClick={onExportReport}>
          <Target className="h-4 w-4 mr-2" />
          导出分析报告
        </Button>
      </div>
    </div>
  );
} 