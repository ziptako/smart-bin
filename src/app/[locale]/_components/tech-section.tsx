'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, Cloud, Smartphone, Database, Wifi, Shield, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * 技术规格组件
 * 可折叠的技术栈展示，默认收起状态
 */
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
          <h2 className="text-3xl font-bold mb-4">{t('tech.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('tech.description')}</p>

          {/* 折叠控制按钮 */}
          <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="flex items-center space-x-2">
            <span>{isExpanded ? t('tech.collapse') : t('tech.expand')}</span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* 可折叠的技术栈内容 */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {techCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className={`h-6 w-6 ${category.color}`} />
                      <h3>{category.title}</h3>
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
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
