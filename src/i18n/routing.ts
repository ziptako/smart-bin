import {defineRouting} from 'next-intl/routing';
 
/**
 * 定义应用支持的语言路由配置
 * 包括支持的语言列表、默认语言和路径前缀设置
 */
export const routing = defineRouting({
  // 支持的语言列表
  locales: ['en', 'zh'],
 
  // 默认语言
  defaultLocale: 'en',
  
  // 路径前缀设置
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      zh: '/about'
    },
    '/login': {
      en: '/login',
      zh: '/login'
    },
    '/register': {
      en: '/register',
      zh: '/register'
    },
    '/forgot-password': {
      en: '/forgot-password',
      zh: '/forgot-password'
    },
    '/terms': {
      en: '/terms',
      zh: '/terms'
    },
    '/privacy': {
      en: '/privacy',
      zh: '/privacy'
    }
  }
});
 
export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];