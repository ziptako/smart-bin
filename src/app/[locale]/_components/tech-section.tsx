'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Cloud, Smartphone, Database, Wifi, Shield } from 'lucide-react';

export function TechSection() {
  const t = useTranslations('HomePage');

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
    <section className="py-20 bg-background">
      <div className="app-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('tech.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('tech.description')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
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
    </section>
  );
}
