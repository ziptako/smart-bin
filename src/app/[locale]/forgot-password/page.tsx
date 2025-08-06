'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

/**
 * 忘记密码页面组件
 * 提供邮箱验证和密码重置功能
 */
export default function ForgotPasswordPage() {
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  /**
   * 处理忘记密码表单提交
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch {
      setError(t('resetPasswordFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex">
        {/* 左侧介绍区域 - 桌面端显示 */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 flex-col justify-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6">{t('resetEmailSent')}</h1>
            <p className="text-xl mb-8 text-blue-100">{t('resetEmailDescription')}</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>{t('secureReset')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>{t('quickProcess')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>{t('emailSupport')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧成功消息区域 */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('resetEmailSent')}</h2>
              <p className="text-gray-600 mb-6">{t('resetEmailSentMessage', { email })}</p>
            </div>

            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>{t('checkSpamFolder')}</AlertDescription>
            </Alert>

            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/login">{t('backToLogin')}</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
              >
                {t('resendEmail')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* 左侧介绍区域 - 桌面端显示 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 flex-col justify-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">{t('resetPassword')}</h1>
          <p className="text-xl mb-8 text-blue-100">{t('resetPasswordDescription')}</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>{t('secureReset')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>{t('quickProcess')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>{t('emailSupport')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧表单区域 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* 移动端标题 */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('resetPassword')}</h1>
            <p className="text-gray-600">{t('resetPasswordDescription')}</p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">{t('resetPassword')}</CardTitle>
              <CardDescription>{t('enterEmailForReset')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t('sending') : t('sendResetEmail')}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="ghost" asChild>
              <Link href="/login" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backToLogin')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
