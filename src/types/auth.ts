/**
 * 登录请求DTO
 */
export interface LoginRequestDto {
  /** 用户名或邮箱 */
  username: string;
  /** 密码 */
  password: string;
  /** 记住我 */
  remember?: boolean;
}

/**
 * 登录响应DTO
 */
export interface LoginResponseDto {
  /** 访问令牌 */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken: string;
  /** 令牌类型 */
  tokenType: string;
  /** 过期时间（秒） */
  expiresIn: number;
  /** 用户信息 */
  userInfo: UserInfo;
}

/**
 * 注册请求DTO
 */
export interface RegisterRequestDto {
  /** 用户名 */
  username: string;
  /** 邮箱 */
  email: string;
  /** 密码 */
  password: string;
  /** 确认密码 */
  confirmPassword: string;
  /** 手机号 */
  phone?: string;
  /** 公司名称 */
  company?: string;
  /** 验证码 */
  verificationCode?: string;
}

/**
 * 注册响应DTO
 */
export interface RegisterResponseDto {
  /** 用户ID */
  userId: string;
  /** 用户名 */
  username: string;
  /** 邮箱 */
  email: string;
  /** 注册时间 */
  createdAt: string;
}

/**
 * 用户信息
 */
export interface UserInfo {
  /** 用户ID */
  id: string;
  /** 用户名 */
  username: string;
  /** 邮箱 */
  email: string;
  /** 头像URL */
  avatar?: string;
  /** 昵称 */
  nickname?: string;
  /** 手机号 */
  phone?: string;
  /** 公司名称 */
  company?: string;
  /** 角色 */
  role: string;
  /** 状态 */
  status: 'active' | 'inactive' | 'pending';
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
}

/**
 * 刷新令牌请求DTO
 */
export interface RefreshTokenRequestDto {
  /** 刷新令牌 */
  refreshToken: string;
}

/**
 * 刷新令牌响应DTO
 */
export interface RefreshTokenResponseDto {
  /** 新的访问令牌 */
  accessToken: string;
  /** 新的刷新令牌 */
  refreshToken: string;
  /** 令牌类型 */
  tokenType: string;
  /** 过期时间（秒） */
  expiresIn: number;
}

/**
 * 忘记密码请求DTO
 */
export interface ForgotPasswordRequestDto {
  /** 邮箱 */
  email: string;
}

/**
 * 重置密码请求DTO
 */
export interface ResetPasswordRequestDto {
  /** 重置令牌 */
  token: string;
  /** 新密码 */
  newPassword: string;
  /** 确认新密码 */
  confirmPassword: string;
}

/**
 * 修改密码请求DTO
 */
export interface ChangePasswordRequestDto {
  /** 当前密码 */
  currentPassword: string;
  /** 新密码 */
  newPassword: string;
  /** 确认新密码 */
  confirmPassword: string;
}

/**
 * 验证码请求DTO
 */
export interface VerificationCodeRequestDto {
  /** 邮箱或手机号 */
  contact: string;
  /** 验证码类型 */
  type: 'email' | 'sms';
  /** 用途 */
  purpose: 'register' | 'login' | 'reset_password' | 'change_phone' | 'change_email';
}