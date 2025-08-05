'use client';

import { useTranslations } from 'next-intl';
import { ScenarioCard } from '@/components/scenario-card';
import { SectionHeader } from '@/components/section-header';
import { AlertTriangle, Thermometer, Eye } from 'lucide-react';

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
        <div className="mb-16">
          <SectionHeader title={t('scenarios.title')} description={t('scenarios.description')} size="lg" />
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {scenarios.map((scenario, index) => (
            <ScenarioCard
              key={index}
              icon={scenario.icon}
              scenario={scenario.scenario}
              problem={scenario.problem}
              solution={scenario.solution}
              accuracy={scenario.accuracy}
              iconColor={scenario.color}
              bgColor={scenario.bgColor}
              borderColor={scenario.borderColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
