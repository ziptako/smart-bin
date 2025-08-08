/**
 * Conditional Navbar Component - 条件渲染导航栏组件
 * Conditional Navbar Component
 *
 * 根据当前路径判断是否显示导航栏
 * Conditionally renders navbar based on current path
 */
'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navbar';

/**
 * 条件渲染导航栏组件
 * 在登录后的dashboard页面不显示navbar
 * Conditionally renders navbar - hides navbar on dashboard pages after login
 */
export function ConditionalNavbar() {
  const pathname = usePathname();

  // 检查是否在dashboard路径下
  // Check if current path is under dashboard
  const isDashboardPath = pathname.includes('/dashboard');

  // 检查是否在登录或注册页面
  // Check if current path is login or register page
  const isAuthPath = pathname.includes('/login') || pathname.includes('/register');

  // 如果在dashboard页面或认证页面，不显示navbar
  // Don't show navbar on dashboard or auth pages
  if (isDashboardPath || isAuthPath) {
    return null;
  }

  // 其他页面显示navbar
  // Show navbar on other pages
  return <Navbar />;
}
