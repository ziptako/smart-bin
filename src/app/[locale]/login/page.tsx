/**
 * CSR Login Page Component - 客户端渲染登录页面组件
 * Client-Side Rendered Login Page Component
 *
 * 此组件在客户端渲染，提供用户登录功能，支持国际化
 * This component is client-side rendered, provides user login functionality with internationalization support
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LoginForm } from './_components/login-form';
import { LoginRequestDto } from '@/types/auth';
import { login } from '@/api/auth';
import { Link } from '@/i18n/navigation';
export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  /**
   * 处理登录提交
   */
  const handleLogin = async (data: LoginRequestDto) => {
    try {
      setLoading(true);
      setError('');

      const response = await login(data);

      // 保存登录信息到本地存储
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('userInfo', JSON.stringify(response.userInfo));

      // 根据用户角色跳转到不同的后台界面
      const userRole = response.userInfo.role;
      let redirectUrl = new URLSearchParams(window.location.search).get('redirect');

      if (!redirectUrl) {
        // 根据角色确定默认跳转页面
        if (userRole === 'officer' || userRole === 'admin') {
          redirectUrl = '/dashboard/officer';
        } else if (userRole === 'cleaner') {
          redirectUrl = '/dashboard/cleaner';
        } else {
          redirectUrl = '/dashboard';
        }
      }

      router.push(redirectUrl);
    } catch (err: unknown) {
      console.error('Login error:', err);
      const errorMessage = err instanceof Error ? err.message : t('loginFailed');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* 左侧品牌介绍区域 - 桌面端显示，移动端隐藏 */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 p-12 flex-col justify-center">
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">SB</span>
                </div>
                <span className="text-3xl font-bold text-white">Smart Bin</span>
              </div>
            </Link>

            <h1 className="text-4xl font-bold text-white mb-6">{t('welcomeBack')}</h1>
            <p className="text-xl text-blue-100 mb-8">{t('loginDescription')}</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-blue-100">{t('feature1')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-blue-100">{t('feature2')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-blue-100">{t('feature3')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧表单区域 */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* 移动端品牌标识 */}
            <div className="text-center lg:hidden">
              <Link href="/" className="inline-block">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">SB</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">Smart Bin</span>
                </div>
              </Link>
            </div>

            {/* 页面标题 */}
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t('signInToAccount')}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {t('orText')}{' '}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t('createNewAccount')}
                </Link>
              </p>
            </div>

            {/* 登录表单 */}
            <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-lg">
              {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <LoginForm onSubmit={handleLogin} loading={loading} />
            </div>

            {/* 页面底部链接 */}
            <div className="text-center space-y-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('bySigningIn')}{' '}
                <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                  {t('termsOfService')}
                </Link>{' '}
                {t('andText')}{' '}
                <Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                  {t('privacyPolicy')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
