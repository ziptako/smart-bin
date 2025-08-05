import { HeroSection } from './_components/hero-section';
import { ScenarioSection } from './_components/scenario-section';
import { StatsSection } from './_components/stats-section';
import { TechSection } from './_components/tech-section';
import { CTASection } from './_components/cta-section';
import { ROICalculator } from './_components/roi-calculator';
import { TrustSection } from './_components/trust-section';
import { DeveloperSection } from './_components/developer-section';

/**
 * 首页组件，支持国际化
 * 展示智能垃圾桶系统的主要信息和功能
 */
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
