/**
 * CSR Register Page Component - 客户端渲染注册页面组件
 * Client-Side Rendered Register Page Component
 *
 * 此组件在客户端渲染，提供用户注册功能，支持国际化
 * This component is client-side rendered, provides user registration functionality with internationalization support
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { RegisterForm } from './_components/register-form';
import { RegisterRequestDto } from '@/types/auth';
import { register } from '@/api/auth';
import { Link } from '@/i18n/navigation';
export default function RegisterPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  /**
   * 处理注册提交
   */
  const handleRegister = async (data: RegisterRequestDto) => {
    try {
      setLoading(true);
      setError('');

      await register(data);

      setSuccess(true);

      // 注册成功后延迟跳转到登录页
      setTimeout(() => {
        router.push('/login?message=registration-success');
      }, 2000);
    } catch (err: unknown) {
      console.error('Register error:', err);
      const errorMessage = err instanceof Error ? err.message : t('registrationFailed');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-lg">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('registrationSuccessful')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t('registrationSuccessMessage')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{t('redirectingToLogin')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* 左侧品牌介绍区域 - 桌面端显示，移动端隐藏 */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-pink-700 dark:from-purple-800 dark:to-pink-900 p-12 flex-col justify-center">
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xl">SB</span>
                </div>
                <span className="text-3xl font-bold text-white">Smart Bin</span>
              </div>
            </Link>

            <h1 className="text-4xl font-bold text-white mb-6">{t('joinUs')}</h1>
            <p className="text-xl text-purple-100 mb-8">{t('registerDescription')}</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-purple-100">{t('registerFeature1')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-purple-100">{t('registerFeature2')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-purple-100">{t('registerFeature3')}</span>
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
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t('createAccount')}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {t('orText')}{' '}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t('signInToExistingAccount')}
                </Link>
              </p>
            </div>

            {/* 注册表单 */}
            <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-lg">
              {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <RegisterForm onSubmit={handleRegister} loading={loading} />
            </div>

            {/* 页面底部链接 */}
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('byCreatingAccount')}{' '}
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
