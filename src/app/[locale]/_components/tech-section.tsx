/**
 * CSR Tech Section Component - 客户端渲染技术规格组件
 * Client-Side Rendered Tech Section Component
 *
 * 此组件在客户端渲染，可折叠的技术栈展示，默认收起状态
 * This component is client-side rendered, collapsible tech stack display, collapsed by default
 */
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { TechCard } from '@/components/tech-card';
import { SectionHeader } from '@/components/section-header';
import { Cpu, Cloud, Smartphone, Database, Wifi, Shield, ChevronDown, ChevronUp } from 'lucide-react';
export function TechSection() {
  const t = useTranslations('HomePage');
  const [isExpanded, setIsExpanded] = useState(false);

  const techCategories = [
    {
      icon: Cpu,
      title: t('tech.iot.title'),
      description: t('tech.iot.description'),
      technologies: ['Arduino', 'Raspberry Pi', 'LoRaWAN', 'NB-IoT'],
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Cloud,
      title: t('tech.cloud.title'),
      description: t('tech.cloud.description'),
      technologies: ['AWS IoT', 'Azure', 'Docker', 'Kubernetes'],
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: Smartphone,
      title: t('tech.mobile.title'),
      description: t('tech.mobile.description'),
      technologies: ['React Native', 'Flutter', 'PWA', 'Push Notifications'],
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      icon: Database,
      title: t('tech.data.title'),
      description: t('tech.data.description'),
      technologies: ['MongoDB', 'InfluxDB', 'Apache Kafka', 'Redis'],
      color: 'text-orange-600 dark:text-orange-400',
    },
    {
      icon: Wifi,
      title: t('tech.ai.title'),
      description: t('tech.ai.description'),
      technologies: ['TensorFlow', 'PyTorch', 'Computer Vision', 'ML Pipeline'],
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      icon: Shield,
      title: t('tech.security.title'),
      description: t('tech.security.description'),
      technologies: ['OAuth 2.0', 'JWT', 'SSL/TLS', 'Data Encryption'],
      color: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="app-container">
        <div className="text-center mb-8">
          <SectionHeader title={t('tech.title')} description={t('tech.description')} size="lg" />

          {/* 折叠控制按钮 */}
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2"
            >
              <span>{isExpanded ? t('tech.collapse') : t('tech.expand')}</span>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* 可折叠的技术栈内容 */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {techCategories.map((category, index) => (
              <TechCard
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
                technologies={category.technologies}
                iconColor={category.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
