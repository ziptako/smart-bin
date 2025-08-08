/**
 * SSR About Page Component - 服务端渲染关于页面组件
 * Server-Side Rendered About Page Component
 *
 * 此组件在服务端渲染，展示智能垃圾桶系统的详细信息
 * This component is server-side rendered, displays detailed information about the smart bin system
 */
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
export default function About() {
  const tNav = useTranslations('Navigation');
  const tAbout = useTranslations('AboutPage');

  return (
    <div className="min-h-screen py-8">
      <div className="app-container max-w-4xl">
        <nav className="mb-8">
          <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
            ← {tNav('home')}
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-6">{tAbout('title')}</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">{tAbout('description')}</p>

          <h2 className="text-2xl font-semibold mb-4">{tAbout('features')}</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>{tAbout('featuresList.monitoring')}</li>
            <li>{tAbout('featuresList.optimization')}</li>
            <li>{tAbout('featuresList.categorization')}</li>
            <li>{tAbout('featuresList.tracking')}</li>
            <li>{tAbout('featuresList.mobile')}</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">{tAbout('technology')}</h2>
          <ul className="list-disc pl-6">
            <li>Next.js 15 with App Router</li>
            <li>TypeScript for type safety</li>
            <li>Tailwind CSS for styling</li>
            <li>next-intl for internationalization</li>
            <li>IoT sensors for data collection</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
