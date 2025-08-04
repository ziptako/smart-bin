import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

/**
 * 根页面组件
 * 自动重定向到默认语言版本
 */
export default function RootPage() {
  // 重定向到默认语言
  redirect(`/${routing.defaultLocale}`);
}
