'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Recycle, Smartphone, BarChart3, MapPin, Leaf, Zap } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function HeroSection() {
  const t = useTranslations('HomePage');

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20" />
        <div className="relative app-container">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 mx-auto">
              🌱 {t('badge')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {t('title')}
              <span className="text-green-600 dark:text-green-400"> {t('titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t('description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                {t('getStarted')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                <Link href="/about">{t('learnMore')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="app-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('features.description')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>{t('features.monitoring.title')}</CardTitle>
                <CardDescription>{t('features.monitoring.description')}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>{t('features.optimization.title')}</CardTitle>
                <CardDescription>{t('features.optimization.description')}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Recycle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>{t('features.categorization.title')}</CardTitle>
                <CardDescription>{t('features.categorization.description')}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>{t('features.tracking.title')}</CardTitle>
                <CardDescription>{t('features.tracking.description')}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>{t('features.mobile.title')}</CardTitle>
                <CardDescription>{t('features.mobile.description')}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle>{t('features.ai.title')}</CardTitle>
                <CardDescription>{t('features.ai.description')}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
