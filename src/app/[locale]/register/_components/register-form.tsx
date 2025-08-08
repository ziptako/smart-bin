'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RegisterRequestDto } from '@/types/auth';
import { checkUsernameAvailable, checkEmailAvailable } from '@/api/auth';
import { Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface RegisterFormProps {
  onSubmit: (data: RegisterRequestDto) => Promise<void>;
  loading?: boolean;
}

interface ValidationState {
  username: { checking: boolean; available: boolean | null; error?: string };
  email: { checking: boolean; available: boolean | null; error?: string };
}

/**
 * 注册表单组件
 * 提供用户注册功能，包含实时验证
 */
export function RegisterForm({ onSubmit, loading = false }: RegisterFormProps) {
  const t = useTranslations('auth');
  const [formData, setFormData] = useState<RegisterRequestDto>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterRequestDto>>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [validation, setValidation] = useState<ValidationState>({
    username: { checking: false, available: null },
    email: { checking: false, available: null },
  });

  // 防抖处理用户名和邮箱输入
  const debouncedUsername = useDebounce(formData.username, 500);
  const debouncedEmail = useDebounce(formData.email, 500);

  /**
   * 检查用户名可用性
   */
  useEffect(() => {
    if (debouncedUsername && debouncedUsername.length >= 3) {
      checkUsername(debouncedUsername);
    } else {
      setValidation((prev) => ({
        ...prev,
        username: { checking: false, available: null },
      }));
    }
  }, [debouncedUsername]);

  /**
   * 检查邮箱可用性
   */
  useEffect(() => {
    if (debouncedEmail && isValidEmail(debouncedEmail)) {
      checkEmail(debouncedEmail);
    } else {
      setValidation((prev) => ({
        ...prev,
        email: { checking: false, available: null },
      }));
    }
  }, [debouncedEmail]);

  /**
   * 检查用户名是否可用
   */
  const checkUsername = async (username: string) => {
    setValidation((prev) => ({
      ...prev,
      username: { checking: true, available: null },
    }));

    try {
      const available = await checkUsernameAvailable(username);
      setValidation((prev) => ({
        ...prev,
        username: { checking: false, available },
      }));
    } catch {
      setValidation((prev) => ({
        ...prev,
        username: { checking: false, available: null, error: '检查失败' },
      }));
    }
  };

  /**
   * 检查邮箱是否可用
   */
  const checkEmail = async (email: string) => {
    setValidation((prev) => ({
      ...prev,
      email: { checking: true, available: null },
    }));

    try {
      const available = await checkEmailAvailable(email);
      setValidation((prev) => ({
        ...prev,
        email: { checking: false, available },
      }));
    } catch {
      setValidation((prev) => ({
        ...prev,
        email: { checking: false, available: null, error: '检查失败' },
      }));
    }
  };

  /**
   * 验证邮箱格式
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * 验证密码强度
   */
  const getPasswordStrength = (password: string): { score: number; text: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
      { text: t('passwordWeak'), color: 'text-red-500' },
      { text: t('passwordFair'), color: 'text-orange-500' },
      { text: t('passwordGood'), color: 'text-yellow-500' },
      { text: t('passwordStrong'), color: 'text-green-500' },
      { text: t('passwordVeryStrong'), color: 'text-green-600' },
    ];

    return { score, ...levels[Math.min(score, 4)] };
  };

  /**
   * 验证表单数据
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterRequestDto> = {};

    // 验证用户名
    if (!formData.username.trim()) {
      newErrors.username = t('usernameRequired');
    } else if (formData.username.length < 3) {
      newErrors.username = t('usernameMinLength');
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = t('usernameInvalidFormat');
    } else if (validation.username.available === false) {
      newErrors.username = t('usernameNotAvailable');
    }

    // 验证邮箱
    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired');
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = t('emailInvalidFormat');
    } else if (validation.email.available === false) {
      newErrors.email = t('emailNotAvailable');
    }

    // 验证密码
    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('passwordMinLength');
    }

    // 验证确认密码
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwordMismatch');
    }

    // 验证手机号（可选）
    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = t('phoneInvalidFormat');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 处理表单提交
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !agreeToTerms) {
      if (!agreeToTerms) {
        alert(t('mustAgreeToTerms'));
      }
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  /**
   * 处理输入变化
   */
  const handleInputChange = (field: keyof RegisterRequestDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 清除对应字段的错误
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * 渲染验证状态图标
   */
  const renderValidationIcon = (field: 'username' | 'email') => {
    const state = validation[field];
    if (state.checking) {
      return <Loader2 className="h-4 w-4 animate-spin text-gray-400" />;
    }
    if (state.available === true) {
      return <Check className="h-4 w-4 text-green-500" />;
    }
    if (state.available === false) {
      return <X className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 用户名输入 */}
      <div>
        <Label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('username')} *
        </Label>
        <div className="mt-1 relative">
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className={`pr-10 ${errors.username ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder={t('enterUsername')}
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{renderValidationIcon('username')}</div>
          {errors.username && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>}
          {validation.username.available === true && (
            <p className="mt-1 text-sm text-green-600 dark:text-green-400">{t('usernameAvailable')}</p>
          )}
        </div>
      </div>

      {/* 邮箱输入 */}
      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('email')} *
        </Label>
        <div className="mt-1 relative">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`pr-10 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder={t('enterEmail')}
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{renderValidationIcon('email')}</div>
          {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
          {validation.email.available === true && (
            <p className="mt-1 text-sm text-green-600 dark:text-green-400">{t('emailAvailable')}</p>
          )}
        </div>
      </div>

      {/* 密码输入 */}
      <div>
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('password')} *
        </Label>
        <div className="mt-1 relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
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
        </div>
        {passwordStrength && (
          <div className="mt-1">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    passwordStrength.score === 1
                      ? 'bg-red-500 w-1/5'
                      : passwordStrength.score === 2
                        ? 'bg-orange-500 w-2/5'
                        : passwordStrength.score === 3
                          ? 'bg-yellow-500 w-3/5'
                          : passwordStrength.score === 4
                            ? 'bg-green-500 w-4/5'
                            : passwordStrength.score === 5
                              ? 'bg-green-600 w-full'
                              : 'w-0'
                  }`}
                />
              </div>
              <span className={`text-xs ${passwordStrength.color}`}>{passwordStrength.text}</span>
            </div>
          </div>
        )}
        {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
      </div>

      {/* 确认密码输入 */}
      <div>
        <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('confirmPassword')} *
        </Label>
        <div className="mt-1 relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`pr-10 ${errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder={t('enterConfirmPassword')}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={loading}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            )}
          </button>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* 手机号输入（可选） */}
      <div>
        <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('phone')} ({t('optional')})
        </Label>
        <div className="mt-1">
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder={t('enterPhone')}
            disabled={loading}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
        </div>
      </div>

      {/* 公司名称输入（可选） */}
      <div>
        <Label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('company')} ({t('optional')})
        </Label>
        <div className="mt-1">
          <Input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder={t('enterCompany')}
            disabled={loading}
          />
        </div>
      </div>

      {/* 同意条款 */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="agreeToTerms"
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          disabled={loading}
          className="mt-1"
        />
        <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer leading-5">
          {t('agreeToTermsPrefix')}{' '}
          <a href="/terms" target="_blank" className="text-blue-600 hover:text-blue-500 underline">
            {t('termsOfService')}
          </a>{' '}
          {t('andText')}{' '}
          <a href="/privacy" target="_blank" className="text-blue-600 hover:text-blue-500 underline">
            {t('privacyPolicy')}
          </a>
        </Label>
      </div>

      {/* 提交按钮 */}
      <div>
        <Button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !agreeToTerms}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              {t('creatingAccount')}
            </>
          ) : (
            t('createAccount')
          )}
        </Button>
      </div>
    </form>
  );
}
