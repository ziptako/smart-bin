/**
 * Dashboard Sidebar Component - 后台侧边栏组件
 * Dashboard Sidebar Component
 *
 * 根据用户角色显示不同的导航菜单
 * Displays different navigation menus based on user role
 */
'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { UserInfo } from '@/types/auth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Trash2,
  Route,
  BarChart3,
  FileText,
  Settings,
  AlertTriangle,
  CheckSquare,
  MapPin,
  History,
  Calendar,
  UserCheck,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardSidebarProps {
  userInfo: UserInfo;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 获取用户角色对应的导航菜单
 * Get navigation menu items based on user role
 */
function getNavigationItems(role: string, t: (key: string) => string) {
  if (role === 'officer' || role === 'admin') {
    return [
      {
        name: t('officer.dashboard'),
        href: '/dashboard/officer' as const,
        icon: LayoutDashboard,
      },
      {
        name: t('officer.binManagement'),
        href: '/dashboard/officer/bins' as const,
        icon: Trash2,
      },
      {
        name: t('officer.routeOptimization'),
        href: '/dashboard/officer/routes' as const,
        icon: Route,
      },
      {
        name: t('officer.analytics'),
        href: '/dashboard/officer/analytics' as const,
        icon: BarChart3,
      },
      {
        name: t('officer.reports'),
        href: '/dashboard/officer/reports' as const,
        icon: FileText,
      },
      {
        name: t('officer.maintenance'),
        href: '/dashboard/officer/maintenance' as const,
        icon: Settings,
      },
      {
        name: t('officer.alerts'),
        href: '/dashboard/officer/alerts' as const,
        icon: AlertTriangle,
      },
    ];
  } else if (role === 'cleaner') {
    return [
      {
        name: t('cleaner.dashboard'),
        href: '/dashboard/cleaner' as const,
        icon: LayoutDashboard,
      },
      {
        name: t('cleaner.tasks'),
        href: '/dashboard/cleaner/tasks' as const,
        icon: CheckSquare,
      },
      {
        name: t('cleaner.locations'),
        href: '/dashboard/cleaner/locations' as const,
        icon: MapPin,
      },
      {
        name: t('cleaner.history'),
        href: '/dashboard/cleaner/history' as const,
        icon: History,
      },
      {
        name: t('cleaner.schedule'),
        href: '/dashboard/cleaner/schedule' as const,
        icon: Calendar,
      },
      {
        name: t('cleaner.profile'),
        href: '/dashboard/cleaner/profile' as const,
        icon: UserCheck,
      },
    ];
  }

  return [
    {
      name: t('dashboard'),
      href: '/dashboard' as const,
      icon: LayoutDashboard,
    },
  ];
}

/**
 * 获取角色对应的配色主题
 * Get color theme based on user role
 */
function getRoleTheme(role: string) {
  if (role === 'officer' || role === 'admin') {
    return {
      primary: 'bg-blue-600 text-white',
      primaryHover: 'hover:bg-blue-700',
      secondary: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
      accent: 'text-blue-600 dark:text-blue-400',
      gradient: 'from-blue-600 to-blue-700',
    };
  } else if (role === 'cleaner') {
    return {
      primary: 'bg-green-600 text-white',
      primaryHover: 'hover:bg-green-700',
      secondary: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
      accent: 'text-green-600 dark:text-green-400',
      gradient: 'from-green-600 to-green-700',
    };
  }

  return {
    primary: 'bg-gray-600 text-white',
    primaryHover: 'hover:bg-gray-700',
    secondary: 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300',
    accent: 'text-gray-600 dark:text-gray-400',
    gradient: 'from-gray-600 to-gray-700',
  };
}

/**
 * 后台侧边栏组件
 * Dashboard sidebar component with role-based navigation
 */
export function DashboardSidebar({ userInfo, isOpen, onClose }: DashboardSidebarProps) {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const navigationItems = getNavigationItems(userInfo.role, t);
  const theme = getRoleTheme(userInfo.role);

  const roleTitle = userInfo.role === 'officer' || userInfo.role === 'admin' ? t('officer.title') : t('cleaner.title');

  return (
    <>
      {/* 桌面端侧边栏 */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4">
              <div
                className={cn(
                  'w-8 h-8 rounded-lg bg-gradient-to-br',
                  theme.gradient,
                  'flex items-center justify-center',
                )}
              >
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Smart Bin</p>
                <p className={cn('text-xs', theme.accent)}>{roleTitle}</p>
              </div>
            </div>

            {/* 导航菜单 */}
            <nav className="mt-8 flex-1 px-2 space-y-1 overflow-y-auto">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? cn(theme.secondary)
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 flex-shrink-0 h-5 w-5',
                        isActive
                          ? theme.accent
                          : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* 用户头像和信息 - 移动到底部 */}
            <div className="mt-auto px-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.username} />
                  <AvatarFallback className={cn(theme.primary)}>
                    {userInfo.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {userInfo.nickname || userInfo.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 移动端侧边栏 */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex flex-col h-full">
          {/* 移动端头部 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-lg bg-gradient-to-br',
                  theme.gradient,
                  'flex items-center justify-center',
                )}
              >
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">Smart Bin</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* 移动端导航菜单 */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? cn(theme.secondary)
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 flex-shrink-0 h-5 w-5',
                      isActive
                        ? theme.accent
                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 移动端用户信息 - 移动到底部 */}
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userInfo.avatar} alt={userInfo.username} />
                <AvatarFallback className={cn(theme.primary)}>
                  {userInfo.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {userInfo.nickname || userInfo.username}
                </p>
                <p className={cn('text-xs', theme.accent)}>{roleTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
