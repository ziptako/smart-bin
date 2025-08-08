/**
 * Dashboard Index Page - 后台首页
 * Dashboard Index Page
 *
 * 根据用户角色自动重定向到对应的后台界面
 * Automatically redirects to the appropriate dashboard based on user role
 */
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserInfo } from '@/types/auth';

/**
 * 后台首页组件
 * Dashboard index component with role-based redirection
 */
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // 检查用户信息并重定向到对应的角色页面
    const userInfoStr = localStorage.getItem('userInfo');

    if (!userInfoStr) {
      router.push('/login');
      return;
    }

    try {
      const userInfo = JSON.parse(userInfoStr) as UserInfo;
      const userRole = userInfo.role;

      // 根据角色重定向
      if (userRole === 'officer' || userRole === 'admin') {
        router.push('/dashboard/officer');
      } else if (userRole === 'cleaner') {
        router.push('/dashboard/cleaner');
      } else {
        // 未知角色，重定向到登录页面
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to parse user info:', error);
      router.push('/login');
    }
  }, [router]);

  // 显示加载状态
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
