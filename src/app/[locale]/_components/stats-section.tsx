'use client';

import { useTranslations } from 'next-intl';
import { StatCard } from '@/components/stat-card';
import { SectionHeader } from '@/components/section-header';
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
        <div className="mb-16">
          <SectionHeader title={t('stats.title')} description={t('stats.description')} size="lg" />
        </div>

        {/* KPI 核心数据卡片 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t('stats.kpi.title')}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {kpiStats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                case={stat.case}
                badge={t('stats.kpi.verified')}
                iconColor={stat.color}
                bgColor={stat.bgColor}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              />
            ))}
          </div>
        </div>

        {/* 总体统计数据 */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">{t('stats.overall.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {overallStats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                iconColor={stat.color}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
