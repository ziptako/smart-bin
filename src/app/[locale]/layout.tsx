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

export const metadata: Metadata = {
  title: 'Smart Bin',
  description: 'Intelligent waste management system',
  icons: {
    icon: '/favicon.ico',
  },
};

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
