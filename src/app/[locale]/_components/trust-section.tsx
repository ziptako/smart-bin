/**
 * CSR Trust Section Component - 客户端渲染信任链组件
 * Client-Side Rendered Trust Section Component
 *
 * 此组件在客户端渲染，展示客户案例、认证证书和第三方测试报告
 * This component is client-side rendered, displays customer cases, certifications and third-party test reports
 */
'use client';

import { useTranslations } from 'next-intl';
import { CustomerCaseCard } from '@/components/customer-case-card';
import { SectionHeader } from '@/components/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Shield, Award } from 'lucide-react';
export function TrustSection() {
  const t = useTranslations('HomePage');

  // 客户案例数据
  const customers = [
    {
      name: '上海浦东新区政府',
      nameEn: 'Shanghai Pudong Government',
      logo: '/customers/pudong.svg',
      deployment: '2024年3月',
      bins: '1,200+',
      result: '清运成本降低35%',
    },
    {
      name: '新加坡樟宜机场',
      nameEn: 'Singapore Changi Airport',
      logo: '/customers/changi.svg',
      deployment: '2024年1月',
      bins: '800+',
      result: '旅客满意度提升28%',
    },
    {
      name: '深圳南山科技园',
      nameEn: 'Shenzhen Nanshan Tech Park',
      logo: '/customers/nanshan.svg',
      deployment: '2023年11月',
      bins: '600+',
      result: '回收率提升42%',
    },
    {
      name: '北京朝阳CBD',
      nameEn: 'Beijing Chaoyang CBD',
      logo: '/customers/chaoyang.svg',
      deployment: '2023年9月',
      bins: '900+',
      result: '运维效率提升50%',
    },
  ];

  // 认证证书数据
  const certifications = [
    {
      name: 'SGS环保认证',
      nameEn: 'SGS Environmental Certification',
      issuer: 'SGS',
      date: '2024年2月',
      pdfUrl: '/certificates/sgs-environmental.pdf',
      icon: Shield,
    },
    {
      name: 'ISO 27001信息安全',
      nameEn: 'ISO 27001 Information Security',
      issuer: 'BSI',
      date: '2024年1月',
      pdfUrl: '/certificates/iso27001.pdf',
      icon: Shield,
    },
    {
      name: 'CE产品认证',
      nameEn: 'CE Product Certification',
      issuer: 'TÜV',
      date: '2023年12月',
      pdfUrl: '/certificates/ce-certification.pdf',
      icon: Award,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* 标题 */}
        <div className="mb-12">
          <SectionHeader title={t('trust.title')} description={t('trust.description')} size="lg" />
        </div>

        {/* 客户案例墙 */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">{t('trust.customers.title')}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customers.map((customer, index) => (
              <CustomerCaseCard
                key={index}
                name={customer.name}
                deployment={customer.deployment}
                bins={customer.bins}
                result={customer.result}
                deploymentLabel={t('trust.customers.deployment')}
                binsLabel={t('trust.customers.bins')}
                className="hover:shadow-lg transition-shadow"
              />
            ))}
          </div>
        </div>

        {/* 认证证书 */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">{t('trust.certifications.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                    </div>

                    <h4 className="font-semibold mb-2">{cert.name}</h4>
                    <div className="text-sm text-muted-foreground mb-4">
                      <div>
                        {t('trust.certifications.issuer')}: {cert.issuer}
                      </div>
                      <div>
                        {t('trust.certifications.date')}: {cert.date}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(cert.pdfUrl, '_blank')}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t('trust.certifications.download')}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 第三方测试报告 */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-blue-600 mr-2" />
                <h4 className="text-xl font-semibold">{t('trust.reports.title')}</h4>
              </div>
              <p className="text-muted-foreground mb-6">{t('trust.reports.description')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => window.open('/reports/performance-test-2024.pdf', '_blank')}>
                  <Download className="mr-2 h-4 w-4" />
                  {t('trust.reports.performance')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('/reports/environmental-impact-2024.pdf', '_blank')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('trust.reports.environmental')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
