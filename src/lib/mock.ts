import {LoginResponseDto, RegisterResponseDto, UserInfo} from '@/types/auth';

/**
 * Mock用户数据
 */
const mockUsers = [
    {
        id: '1',
        username: 'admin',
        email: 'admin@smartbin.com',
        password: 'admin123',
        avatar: '/avatars/admin.png',
        nickname: '管理员',
        phone: '13800138000',
        company: 'Smart Bin科技有限公司',
        role: 'admin',
        status: 'active' as const,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: '2',
        username: 'cleaner',
        email: 'cleaner@example.com',
        password: 'cleaner123',
        avatar: '/avatars/user.png',
        nickname: '智洁专员',
        phone: '13900139000',
        company: '清洁服务公司',
        role: 'cleaner',
        status: 'active' as const,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
    },
];

/**
 * 生成Mock令牌
 */
const generateMockToken = (userId: string): string => {
    if (typeof window === 'undefined') {
        // 服务端环境返回简单的mock token
        return `mock-token-${userId}-${Date.now()}`;
    }

    const header = btoa(JSON.stringify({alg: 'HS256', typ: 'JWT'}));
    const payload = btoa(JSON.stringify({
        userId,
        exp: Math.floor(Date.now() / 1000) + 3600 // 1小时后过期
    }));
    const signature = btoa(`mock-signature-${userId}`);
    return `${header}.${payload}.${signature}`;
};

/**
 * 延迟函数，模拟网络请求
 */
const delay = (ms: number = 1000): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Mock登录API
 */
export const mockLogin = async (username: string, password: string): Promise<LoginResponseDto> => {
    await delay(800); // 模拟网络延迟

    const user = mockUsers.find(u =>
        (u.username === username || u.email === username) && u.password === password
    );

    if (!user) {
        throw new Error('用户名或密码错误');
    }

    if (user.status !== 'active') {
        throw new Error('账户已被禁用，请联系管理员');
    }

    const accessToken = generateMockToken(user.id);
    const refreshToken = generateMockToken(`refresh-${user.id}`);

    const userInfo: UserInfo = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        nickname: user.nickname,
        phone: user.phone,
        company: user.company,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };

    return {
        accessToken,
        refreshToken,
        tokenType: 'Bearer',
        expiresIn: 3600,
        userInfo,
    };
};

/**
 * Mock注册API
 */
export const mockRegister = async (
    username: string,
    email: string,
    password: string,
    phone?: string,
    company?: string
): Promise<RegisterResponseDto> => {
    await delay(1200); // 模拟网络延迟

    // 检查用户名是否已存在
    const existingUser = mockUsers.find(u => u.username === username || u.email === email);
    if (existingUser) {
        if (existingUser.username === username) {
            throw new Error('用户名已存在');
        }
        if (existingUser.email === email) {
            throw new Error('邮箱已被注册');
        }
    }

    // 创建新用户
    const newUser = {
        id: (mockUsers.length + 1).toString(),
        username,
        email,
        password,
        avatar: '/avatars/default.png',
        nickname: username,
        phone: phone || '',
        company: company || '',
        role: 'user',
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    return {
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
    };
};

/**
 * Mock获取用户信息API
 */
export const mockGetUserInfo = async (token: string): Promise<UserInfo> => {
    await delay(500);

    // 简单的token解析（实际项目中应该使用jwt库）
    if (typeof window === 'undefined') {
        throw new Error('服务端环境无法解析令牌');
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
        throw new Error('用户不存在');
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        nickname: user.nickname,
        phone: user.phone,
        company: user.company,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

/**
 * Mock刷新令牌API
 */
export const mockRefreshToken = async (refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string
}> => {
    await delay(300);

    if (typeof window === 'undefined') {
        throw new Error('服务端环境无法解析令牌');
    }

    const payload = JSON.parse(atob(refreshToken.split('.')[1]));
    const userId = payload.userId.replace('refresh-', '');

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
        throw new Error('用户不存在');
    }

    return {
        accessToken: generateMockToken(userId),
        refreshToken: generateMockToken(`refresh-${userId}`),
    };
};

/**
 * 检查是否使用Mock数据
 */
export const shouldUseMock = (): boolean => {
    return process.env.NEXT_PUBLIC_MOCK === 'true';
};