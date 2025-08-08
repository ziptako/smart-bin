/**
 * Dashboard Layout Component - 后台布局组件
 * Dashboard Layout Component
 *
 * 为后台界面提供统一的布局结构，包括侧边栏和顶部导航
 * Provides unified layout structure for dashboard pages with sidebar and top navigation
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserInfo } from '@/types/auth';
import { DashboardSidebar } from './_components/dashboard-sidebar';
import { DashboardHeader } from './_components/dashboard-header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * 后台布局组件
 * Dashboard layout component with authentication check and role-based navigation
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * 检查用户认证状态
   * Check user authentication status
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfoStr = localStorage.getItem('userInfo');

    if (!token || !userInfoStr) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userInfoStr) as UserInfo;
      setUserInfo(user);
    } catch (error) {
      console.error('Failed to parse user info:', error);
      router.push('/login');
      return;
    }

    setLoading(false);
  }, [router]);

  /**
   * 处理退出登录
   * Handle logout
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* 侧边栏 */}
      <DashboardSidebar userInfo={userInfo} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航 */}
        <DashboardHeader userInfo={userInfo} onMenuClick={() => setSidebarOpen(true)} onLogout={handleLogout} />

        {/* 页面内容 */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</div>
        </main>
      </div>

      {/* 移动端侧边栏遮罩 */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
