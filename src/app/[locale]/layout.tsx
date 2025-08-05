import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const seoData = {
    zh: {
      title: '节省47%清运成本、降低35%碳排的智能垃圾桶 | Smart Bin',
      description:
        '智能垃圾桶系统，通过IoT传感器和AI算法实现实时监控、智能调度，为城市和企业提供高效环保的废物管理解决方案。已服务上海浦东、新加坡樟宜机场等知名客户。',
      keywords: '智能垃圾桶,废物管理,IoT传感器,智能调度,环保科技,碳减排,清运优化',
    },
    en: {
      title: 'Save 47% Collection Costs, Reduce 35% Carbon Emissions | Smart Bin',
      description:
        'Smart waste management system with IoT sensors and AI algorithms for real-time monitoring and intelligent scheduling. Serving renowned clients like Shanghai Pudong Government and Singapore Changi Airport.',
      keywords:
        'smart bin,waste management,IoT sensors,intelligent scheduling,environmental technology,carbon reduction,collection optimization',
    },
  };

  const currentSeo = seoData[locale as keyof typeof seoData] || seoData.en;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    keywords: currentSeo.keywords,
    authors: [{ name: 'Smart Bin Team' }],
    creator: 'Smart Bin',
    publisher: 'Smart Bin',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `https://smart-bin.com/${locale}`,
      title: currentSeo.title,
      description: currentSeo.description,
      siteName: 'Smart Bin',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? 'Smart Bin 智能垃圾桶系统' : 'Smart Bin Intelligent Waste Management System',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentSeo.title,
      description: currentSeo.description,
      images: ['/og-image.jpg'],
      creator: '@smartbin',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * 根布局组件，支持国际化
 * 为每个语言版本提供翻译消息和字体配置
 */
export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  // 确保locale是有效的
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // 获取当前语言的翻译消息
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main>{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
