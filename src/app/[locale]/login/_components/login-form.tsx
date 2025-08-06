'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { LoginRequestDto } from '@/types/auth';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface LoginFormProps {
  onSubmit: (data: LoginRequestDto) => Promise<void>;
  loading?: boolean;
}

/**
 * 登录表单组件
 * 提供用户名/邮箱和密码输入，支持记住我功能
 */
export function LoginForm({ onSubmit, loading = false }: LoginFormProps) {
  const t = useTranslations('auth');
  const [formData, setFormData] = useState<LoginRequestDto>({
    username: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginRequestDto>>({});

  /**
   * 验证表单数据
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginRequestDto> = {};

    // 验证用户名/邮箱
    if (!formData.username.trim()) {
      newErrors.username = t('usernameRequired');
    } else if (formData.username.length < 3) {
      newErrors.username = t('usernameMinLength');
    }

    // 验证密码
    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('passwordMinLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 处理表单提交
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      // 错误处理由父组件负责
      console.error('Form submission error:', error);
    }
  };

  /**
   * 处理输入变化
   */
  const handleInputChange = (field: keyof LoginRequestDto, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 清除对应字段的错误
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 用户名/邮箱输入 */}
      <div>
        <Label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('usernameOrEmail')}
        </Label>
        <div className="mt-1">
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className={`${errors.username ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder={t('enterUsernameOrEmail')}
            disabled={loading}
          />
          {errors.username && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>}
        </div>
      </div>

      {/* 密码输入 */}
      <div>
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('password')}
        </Label>
        <div className="mt-1 relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`pr-10 ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder={t('enterPassword')}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            )}
          </button>
          {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
        </div>
      </div>

      {/* 记住我选项 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.remember}
            onCheckedChange={(checked) => handleInputChange('remember', checked as boolean)}
            disabled={loading}
          />
          <Label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            {t('rememberMe')}
          </Label>
        </div>
      </div>

      {/* 忘记密码链接 */}
      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t('forgotPassword')}
        </Link>
      </div>

      {/* 提交按钮 */}
      <div>
        <Button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              {t('signingIn')}
            </>
          ) : (
            t('signIn')
          )}
        </Button>
      </div>

      {/* 演示账号提示 */}
      {process.env.NEXT_PUBLIC_MOCK === 'true' && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">{t('demoAccounts')}:</p>
          <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
            <div>{t('adminAccount')}</div>
            <div>{t('userAccount')}</div>
          </div>
        </div>
      )}
    </form>
  );
}
