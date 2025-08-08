import { apiRequest } from '@/lib/request';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  ForgotPasswordRequestDto,
  ResetPasswordRequestDto,
  ChangePasswordRequestDto,
  VerificationCodeRequestDto,
  UserInfo,
} from '@/types/auth';
import {
  mockLogin,
  mockRegister,
  mockGetUserInfo,
  mockRefreshToken,
  shouldUseMock,
} from '@/lib/mock';

/**
 * 用户登录
 */
export const login = async (data: LoginRequestDto): Promise<LoginResponseDto> => {
  if (shouldUseMock()) {
    return await mockLogin(data.username, data.password);
  }
  
  const response = await apiRequest.post<LoginResponseDto>('/auth/login', data);
  return response.data;
};

/**
 * 用户注册
 */
export const register = async (data: RegisterRequestDto): Promise<RegisterResponseDto> => {
  if (shouldUseMock()) {
    return await mockRegister(
      data.username,
      data.email,
      data.password,
      data.phone,
      data.company
    );
  }
  
  const response = await apiRequest.post<RegisterResponseDto>('/auth/register', data);
  return response.data;
};

/**
 * 获取用户信息
 */
export const getUserInfo = async (): Promise<UserInfo> => {
  if (shouldUseMock()) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('未找到令牌');
    }
    return await mockGetUserInfo(token);
  }
  
  const response = await apiRequest.get<UserInfo>('/auth/user');
  return response.data;
};

/**
 * 刷新令牌
 */
export const refreshToken = async (data: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> => {
  if (shouldUseMock()) {
    const result = await mockRefreshToken(data.refreshToken);
    return {
      ...result,
      tokenType: 'Bearer',
      expiresIn: 3600,
    };
  }
  
  const response = await apiRequest.post<RefreshTokenResponseDto>('/auth/refresh', data);
  return response.data;
};

/**
 * 用户登出
 */
export const logout = async (): Promise<void> => {
  if (shouldUseMock()) {
    // Mock环境下直接清除本地存储
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userInfo');
    }
    return;
  }
  
  try {
    await apiRequest.post('/auth/logout');
  } finally {
    // 无论请求是否成功，都清除本地存储
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userInfo');
    }
  }
};

/**
 * 忘记密码
 */
export const forgotPassword = async (data: ForgotPasswordRequestDto): Promise<void> => {
  if (shouldUseMock()) {
    // Mock环境下模拟发送邮件
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Mock: 密码重置邮件已发送到 ${data.email}`);
    return;
  }
  
  await apiRequest.post('/auth/forgot-password', data);
};

/**
 * 重置密码
 */
export const resetPassword = async (data: ResetPasswordRequestDto): Promise<void> => {
  if (shouldUseMock()) {
    // Mock环境下模拟重置密码
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Mock: 密码重置成功');
    return;
  }
  
  await apiRequest.post('/auth/reset-password', data);
};

/**
 * 修改密码
 */
export const changePassword = async (data: ChangePasswordRequestDto): Promise<void> => {
  if (shouldUseMock()) {
    // Mock环境下模拟修改密码
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Mock: 密码修改成功');
    return;
  }
  
  await apiRequest.post('/auth/change-password', data);
};

/**
 * 发送验证码
 */
export const sendVerificationCode = async (data: VerificationCodeRequestDto): Promise<void> => {
  if (shouldUseMock()) {
    // Mock环境下模拟发送验证码
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Mock: 验证码已发送到 ${data.contact}`);
    return;
  }
  
  await apiRequest.post('/auth/send-verification-code', data);
};

/**
 * 验证邮箱
 */
export const verifyEmail = async (token: string): Promise<void> => {
  if (shouldUseMock()) {
    // Mock环境下模拟邮箱验证
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Mock: 邮箱验证成功');
    return;
  }
  
  await apiRequest.post('/auth/verify-email', { token });
};

/**
 * 检查用户名是否可用
 */
export const checkUsernameAvailable = async (username: string): Promise<boolean> => {
  if (shouldUseMock()) {
    // Mock环境下检查用户名
    await new Promise(resolve => setTimeout(resolve, 300));
    const unavailableUsernames = ['admin', 'user', 'test', 'demo'];
    return !unavailableUsernames.includes(username.toLowerCase());
  }
  
  const response = await apiRequest.get<boolean>(`/auth/check-username/${username}`);
  return response.data;
};

/**
 * 检查邮箱是否可用
 */
export const checkEmailAvailable = async (email: string): Promise<boolean> => {
  if (shouldUseMock()) {
    // Mock环境下检查邮箱
    await new Promise(resolve => setTimeout(resolve, 300));
    const unavailableEmails = ['admin@smartbin.com', 'user@example.com'];
    return !unavailableEmails.includes(email.toLowerCase());
  }
  
  const response = await apiRequest.get<boolean>(`/auth/check-email/${email}`);
  return response.data;
};