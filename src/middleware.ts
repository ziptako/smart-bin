import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
/**
 * Next.js中间件，用于处理国际化路由
 * 自动检测用户语言偏好并重定向到对应的语言版本
 */
export default createMiddleware(routing);
 
export const config = {
  // 匹配所有路径，除了以下路径：
  // - api路由
  // - _next静态文件
  // - _vercel内部文件
  // - 图标和图片文件
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};