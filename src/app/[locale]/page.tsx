/**
 * SSG Home Page Component with ISR - 静态生成首页组件（增量静态再生）
 * Static Site Generated Home Page Component with Incremental Static Regeneration
 *
 * 此组件使用SSG+ISR模式，每小时重新验证一次，提供最佳性能和SEO
 * This component uses SSG+ISR mode, revalidates every hour for optimal performance and SEO
 * ROI计算器作为客户端组件动态加载
 * ROI Calculator is dynamically loaded as a client component
 */
import { HeroSection } from './_components/hero-section';
import { ScenarioSection } from './_components/scenario-section';
import { StatsSection } from './_components/stats-section';
import { TechSection } from './_components/tech-section';
import { CTASection } from './_components/cta-section';
import { TrustSection } from './_components/trust-section';
import { DeveloperSection } from './_components/developer-section';
import dynamic from 'next/dynamic';
import { routing } from '@/i18n/routing';

// 动态导入ROI计算器组件
const ROICalculator = dynamic(
  () => import('./_components/roi-calculator').then((mod) => ({ default: mod.ROICalculator })),
  {
    loading: () => (
      <div className="py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
        <div className="app-container text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    ),
  },
);

// ISR配置：每小时重新验证
export const revalidate = 3600; // 1小时 = 3600秒

// 为所有支持的语言生成静态页面
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ScenarioSection />
      <StatsSection />
      <ROICalculator />
      <TrustSection />
      <TechSection />
      <DeveloperSection />
      <CTASection />
    </div>
  );
}
