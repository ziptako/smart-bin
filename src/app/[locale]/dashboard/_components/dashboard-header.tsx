/**
 * Dashboard Header Component - 后台顶部导航组件
 * Dashboard Header Component
 *
 * 提供搜索、通知、用户菜单等功能
 * Provides search, notifications, user menu and other features
 */
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { UserInfo } from '@/types/auth';
import { cn } from '@/lib/utils';
import { Search, Bell, Menu, Settings, User, LogOut, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface DashboardHeaderProps {
  userInfo: UserInfo;
  onMenuClick: () => void;
  onLogout: () => void;
}

/**
 * 获取角色对应的配色主题
 * Get color theme based on user role
 */
function getRoleTheme(role: string) {
  if (role === 'officer' || role === 'admin') {
    return {
      primary: 'bg-blue-600 text-white',
      accent: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    };
  } else if (role === 'cleaner') {
    return {
      primary: 'bg-green-600 text-white',
      accent: 'text-green-600 dark:text-green-400',
      badge: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    };
  }

  return {
    primary: 'bg-gray-600 text-white',
    accent: 'text-gray-600 dark:text-gray-400',
    badge: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
  };
}

/**
 * 后台顶部导航组件
 * Dashboard header component with search, notifications and user menu
 */
export function DashboardHeader({ userInfo, onMenuClick, onLogout }: DashboardHeaderProps) {
  const t = useTranslations('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const theme = getRoleTheme(userInfo.role);

  const roleTitle = userInfo.role === 'officer' || userInfo.role === 'admin' ? t('officer.title') : t('cleaner.title');

  // 模拟通知数量
  const notificationCount = 3;

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* 左侧：移动端菜单按钮和搜索 */}
        <div className="flex items-center flex-1">
          {/* 移动端菜单按钮 */}
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t('menu')}</span>
          </Button>

          {/* 搜索框 */}
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* 右侧：通知、设置、用户菜单 */}
        <div className="flex items-center space-x-2">
          {/* 语言切换器 */}
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          {/* 主题切换 */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* 通知按钮 */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notificationCount}
              </Badge>
            )}
            <span className="sr-only">{t('notifications')}</span>
          </Button>

          {/* 用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.username} />
                  <AvatarFallback className={cn(theme.primary)}>
                    {userInfo.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userInfo.nickname || userInfo.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userInfo.email}</p>
                  <Badge variant="secondary" className={cn('w-fit mt-1', theme.badge)}>
                    {roleTitle}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{t('profile')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t('settings')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>{t('help')}</span>
              </DropdownMenuItem>

              {/* 移动端显示的额外选项 */}
              <div className="sm:hidden">
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center w-full">
                    <span className="mr-2">🌐</span>
                    <LanguageSwitcher />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center w-full">
                    <span className="mr-2">🎨</span>
                    <ThemeToggle />
                  </div>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600 dark:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
