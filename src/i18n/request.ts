import {getRequestConfig} from 'next-intl/server';
import {routing, type Locale} from './routing';
 
/**
 * 配置next-intl的请求处理
 * 根据当前locale加载对应的翻译文件
 */
export default getRequestConfig(async ({requestLocale}) => {
  // This can correspond to the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});