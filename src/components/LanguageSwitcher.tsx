/**
 * CSR Language Switcher Component - 客户端渲染语言切换器组件
 * Client-Side Rendered Language Switcher Component
 *
 * 此组件在客户端渲染，允许用户在支持的语言之间切换
 * This component is client-side rendered, allows users to switch between supported languages
 */
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  /**
   * 处理语言切换
   * @param newLocale 新的语言代码
   */
  const handleLanguageChange = (newLocale: string) => {
    // 移除当前语言前缀
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // 构建新的路径
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  /**
   * 获取下一个语言
   */
  const getNextLocale = (): Locale => {
    const currentIndex = routing.locales.indexOf(locale as Locale);
    return routing.locales[(currentIndex + 1) % routing.locales.length] as Locale;
  };

  const nextLocale = getNextLocale();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handleLanguageChange(nextLocale)}
      className="h-9 px-3"
      title={`Switch to ${nextLocale.toUpperCase()}`}
    >
      {locale.toUpperCase()}
    </Button>
  );
}
