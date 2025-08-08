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
    },
    '/dashboard': {
      en: '/dashboard',
      zh: '/dashboard'
    },
    '/dashboard/officer': {
      en: '/dashboard/officer',
      zh: '/dashboard/officer'
    },
    '/dashboard/cleaner': {
      en: '/dashboard/cleaner',
      zh: '/dashboard/cleaner'
    },
    '/dashboard/officer/bins': {
      en: '/dashboard/officer/bins',
      zh: '/dashboard/officer/bins'
    },
    '/dashboard/officer/routes': {
      en: '/dashboard/officer/routes',
      zh: '/dashboard/officer/routes'
    },
    '/dashboard/officer/analytics': {
      en: '/dashboard/officer/analytics',
      zh: '/dashboard/officer/analytics'
    },
    '/dashboard/officer/reports': {
      en: '/dashboard/officer/reports',
      zh: '/dashboard/officer/reports'
    },
    '/dashboard/officer/maintenance': {
      en: '/dashboard/officer/maintenance',
      zh: '/dashboard/officer/maintenance'
    },
    '/dashboard/officer/alerts': {
      en: '/dashboard/officer/alerts',
      zh: '/dashboard/officer/alerts'
    },
    '/dashboard/cleaner/tasks': {
      en: '/dashboard/cleaner/tasks',
      zh: '/dashboard/cleaner/tasks'
    },
    '/dashboard/cleaner/schedule': {
      en: '/dashboard/cleaner/schedule',
      zh: '/dashboard/cleaner/schedule'
    },
    '/dashboard/cleaner/history': {
      en: '/dashboard/cleaner/history',
      zh: '/dashboard/cleaner/history'
    },
    '/dashboard/cleaner/profile': {
      en: '/dashboard/cleaner/profile',
      zh: '/dashboard/cleaner/profile'
    },
    '/dashboard/cleaner/locations': {
      en: '/dashboard/cleaner/locations',
      zh: '/dashboard/cleaner/locations'
    },
    '/dashboard/cleaner/checkin': {
      en: '/dashboard/cleaner/checkin',
      zh: '/dashboard/cleaner/checkin'
    }
  }
});
 
export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];