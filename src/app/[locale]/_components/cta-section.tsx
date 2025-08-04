'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Mail, Github, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function CTASection() {
  const t = useTranslations('HomePage');

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{t('cta.description')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('cta.contact.title')}</h3>
              <p className="opacity-90 mb-4">{t('cta.contact.description')}</p>
              <Button variant="secondary" className="w-full">
                {t('cta.contact.action')}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('cta.github.title')}</h3>
              <p className="opacity-90 mb-4">{t('cta.github.description')}</p>
              <Button variant="secondary" className="w-full">
                {t('cta.github.action')}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('cta.community.title')}</h3>
              <p className="opacity-90 mb-4">{t('cta.community.description')}</p>
              <Button variant="secondary" className="w-full">
                {t('cta.community.action')}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/about">
              {t('cta.learnMore')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
