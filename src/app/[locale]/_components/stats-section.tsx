'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Recycle, MapPin, Truck, Trash2, RotateCcw } from 'lucide-react';

/**
 * 数据统计组件
 * 展示具体的KPI数据和可验证的案例
 */
export function StatsSection() {
  const t = useTranslations('HomePage');

  // KPI 核心数据
  const kpiStats = [
    {
      icon: Truck,
      value: '32%',
      label: t('stats.kpi.collection.label'),
      description: t('stats.kpi.collection.description'),
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      case: t('stats.kpi.collection.case'),
    },
    {
      icon: Trash2,
      value: '18%',
      label: t('stats.kpi.reduction.label'),
      description: t('stats.kpi.reduction.description'),
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      case: t('stats.kpi.reduction.case'),
    },
    {
      icon: RotateCcw,
      value: '40%',
      label: t('stats.kpi.recycling.label'),
      description: t('stats.kpi.recycling.description'),
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      case: t('stats.kpi.recycling.case'),
    },
  ];

  // 总体统计数据
  const overallStats = [
    {
      icon: TrendingUp,
      value: '85%',
      label: t('stats.efficiency'),
      description: t('stats.efficiencyDesc'),
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: Users,
      value: '10K+',
      label: t('stats.users'),
      description: t('stats.usersDesc'),
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Recycle,
      value: '2.5M',
      label: t('stats.waste'),
      description: t('stats.wasteDesc'),
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      icon: MapPin,
      value: '50+',
      label: t('stats.cities'),
      description: t('stats.citiesDesc'),
      color: 'text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="app-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('stats.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('stats.description')}</p>
        </div>

        {/* KPI 核心数据卡片 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t('stats.kpi.title')}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {kpiStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="pt-6">
                    <div className={`${stat.bgColor} rounded-2xl p-6 mb-4`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm">
                          <Icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                        <div className="text-right">
                          <h3 className="text-4xl font-bold mb-1">{stat.value}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {t('stats.kpi.verified')}
                          </Badge>
                        </div>
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{stat.label}</h4>
                      <div className="text-sm text-muted-foreground mb-3">{stat.description}</div>
                      <div className="text-xs text-muted-foreground italic border-t pt-2">{stat.case}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 总体统计数据 */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">{t('stats.overall.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {overallStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                    <h4 className="font-semibold text-lg mb-2">{stat.label}</h4>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
