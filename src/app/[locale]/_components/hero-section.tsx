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
      <section className="relative py-2 lg:py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20" />
        <div className="relative app-container">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-3 md:mb-4 mx-auto">
              🌱 {t('badge')}
            </Badge>
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6">
              {t('title')}
              <span className="text-green-600 dark:text-green-400"> {t('titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
              {t('description')}
            </p>

            {/* 产品对比图 */}
            <div className="mb-8 md:mb-12 max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
                {/* 传统方式 */}
                <div className="relative">
                  <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-4 md:p-6 border-2 border-red-200 dark:border-red-800">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
                        {t('comparison.traditional.title')}
                      </h3>
                      <div
                        className="relative mx-auto w-16 h-20 md:w-24 md:h-32 bg-gray-400 rounded-lg overflow-hidden"
                        role="img"
                        aria-label={t('comparison.traditional.alt')}
                      >
                        <div className="absolute bottom-0 w-full h-full bg-red-500 opacity-80"></div>
                        <div className="absolute top-1 md:top-2 left-1 md:left-2 right-1 md:right-2 text-white text-xs font-bold">
                          {t('comparison.traditional.status')}
                        </div>
                      </div>
                    </div>
                    <ul className="text-xs md:text-sm text-red-600 dark:text-red-400 space-y-1">
                      <li>• {t('comparison.traditional.issues.unpredictable')}</li>
                      <li>• {t('comparison.traditional.issues.inefficient')}</li>
                      <li>• {t('comparison.traditional.issues.costly')}</li>
                      <li>• {t('comparison.traditional.issues.pollution')}</li>
                    </ul>
                  </div>
                </div>

                {/* Smart Bin */}
                <div className="relative">
                  <div className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-4 md:p-6 border-2 border-green-200 dark:border-green-800">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
                        {t('comparison.smart.title')}
                      </h3>
                      <div
                        className="relative mx-auto w-16 h-20 md:w-24 md:h-32 bg-gray-200 rounded-lg overflow-hidden border-2 border-green-500"
                        role="img"
                        aria-label={t('comparison.smart.alt')}
                      >
                        <div className="absolute bottom-0 w-full h-3/4 bg-green-500 opacity-60"></div>
                        <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-1 md:top-2 left-1 md:left-2 right-1 md:right-2 text-green-700 text-xs font-bold">
                          75%
                        </div>
                      </div>
                    </div>
                    <ul className="text-xs md:text-sm text-green-600 dark:text-green-400 space-y-1">
                      <li>• {t('comparison.smart.benefits.monitoring')}</li>
                      <li>• {t('comparison.smart.benefits.scheduling')}</li>
                      <li>• {t('comparison.smart.benefits.cost')}</li>
                      <li>• {t('comparison.smart.benefits.carbon')}</li>
                    </ul>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {t('comparison.smart.badge')}
                  </div>
                </div>
              </div>

              {/* 箭头指示 */}
              <div className="text-center mt-4 md:mt-6">
                <ArrowRight className="mx-auto h-6 w-6 md:h-8 md:w-8 text-green-600 dark:text-green-400" />
                <p className="text-xs md:text-sm text-muted-foreground mt-2">{t('comparison.result')}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button size="default" className="md:text-lg md:px-8">
                {t('getStarted')}
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button variant="outline" size="default" className="md:text-lg md:px-8" asChild>
                <Link href="/about">{t('learnMore')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 bg-background">
        <div className="app-container">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">{t('features.title')}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t('features.description')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg md:text-xl">{t('features.monitoring.title')}</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  {t('features.monitoring.description')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg md:text-xl">{t('features.optimization.title')}</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  {t('features.optimization.description')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <Recycle className="h-5 w-5 md:h-6 md:w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg md:text-xl">{t('features.categorization.title')}</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  {t('features.categorization.description')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <Leaf className="h-5 w-5 md:h-6 md:w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-lg md:text-xl">{t('features.tracking.title')}</CardTitle>
                <CardDescription className="text-sm md:text-base">{t('features.tracking.description')}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <Smartphone className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-lg md:text-xl">{t('features.mobile.title')}</CardTitle>
                <CardDescription className="text-sm md:text-base">{t('features.mobile.description')}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <Zap className="h-5 w-5 md:h-6 md:w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle className="text-lg md:text-xl">{t('features.ai.title')}</CardTitle>
                <CardDescription className="text-sm md:text-base">{t('features.ai.description')}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
