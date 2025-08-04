'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Recycle, MapPin } from 'lucide-react';

export function StatsSection() {
  const t = useTranslations('HomePage');

  const stats = [
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="font-semibold text-lg mb-2">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
