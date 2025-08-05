'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Thermometer, Eye, ArrowRight } from 'lucide-react';

/**
 * 场景解决方案组件
 * 展示具体场景-痛点-解决方案的三段式卡片
 */
export function ScenarioSection() {
  const t = useTranslations('HomePage');

  const scenarios = [
    {
      icon: AlertTriangle,
      scenario: t('scenarios.overflow.scenario'),
      problem: t('scenarios.overflow.problem'),
      solution: t('scenarios.overflow.solution'),
      accuracy: '98%',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200 dark:border-red-800',
    },
    {
      icon: Thermometer,
      scenario: t('scenarios.odor.scenario'),
      problem: t('scenarios.odor.problem'),
      solution: t('scenarios.odor.solution'),
      accuracy: '95%',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
    },
    {
      icon: Eye,
      scenario: t('scenarios.sorting.scenario'),
      problem: t('scenarios.sorting.problem'),
      solution: t('scenarios.sorting.solution'),
      accuracy: '92%',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="app-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('scenarios.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('scenarios.description')}</p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <Card
                key={index}
                className={`border-2 ${scenario.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <CardHeader className={`${scenario.bgColor} rounded-t-lg`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                        <Icon className={`h-6 w-6 ${scenario.color}`} />
                      </div>
                      <CardTitle className="text-lg">
                        <h3>{scenario.scenario}</h3>
                      </CardTitle>
                    </div>
                    <Badge variant="secondary" className={`${scenario.color} font-bold`}>
                      {scenario.accuracy}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* 痛点 */}
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">痛点</h4>
                      <p className="text-sm text-muted-foreground">{scenario.problem}</p>
                    </div>

                    {/* 箭头 */}
                    <div className="flex justify-center">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* 解决方案 */}
                    <div>
                      <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">解决方案</h4>
                      <p className="text-sm text-foreground font-medium">{scenario.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
