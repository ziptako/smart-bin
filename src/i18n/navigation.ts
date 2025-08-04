import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

/**
 * 创建国际化导航工具
 * 提供支持多语言的Link、redirect和useRouter等功能
 */
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);