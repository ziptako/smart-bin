/**
 * CSR CTA Section Component - 客户端渲染行动号召区块组件
 * Client-Side Rendered Call-to-Action Section Component
 *
 * 此组件在客户端渲染，展示行动号召内容和联系方式
 * This component is client-side rendered, displays call-to-action content and contact information
 */
'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CTACard } from '@/components/cta-card';
import { SectionHeader } from '@/components/section-header';
import { ArrowRight, Mail, ExternalLink, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function CTASection() {
  const t = useTranslations('HomePage');

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative app-container">
        <div className="mb-16">
          <SectionHeader
            title={t('cta.title')}
            description={t('cta.description')}
            size="lg"
            className="text-white [&_p]:opacity-90"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <CTACard
            icon={Mail}
            title={t('cta.contact.title')}
            description={t('cta.contact.description')}
            actionText={t('cta.contact.action')}
          />

          <CTACard
            icon={ExternalLink}
            title={t('cta.github.title')}
            description={t('cta.github.description')}
            actionText={t('cta.github.action')}
          />

          <CTACard
            icon={MessageCircle}
            title={t('cta.community.title')}
            description={t('cta.community.description')}
            actionText={t('cta.community.action')}
          />
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
