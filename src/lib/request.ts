import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * 请求响应接口
 */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

/**
 * 请求配置接口
 */
export interface RequestConfig extends AxiosRequestConfig {
  skipErrorHandler?: boolean;
}

/**
 * 创建axios实例
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 添加token到请求头
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // 添加请求时间戳
      config.headers['X-Request-Time'] = Date.now().toString();

      console.log('Request:', {
        url: config.url,
        method: config.method,
        data: config.data,
        params: config.params,
      });

      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      console.log('Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });

      const { data } = response;
      
      // 检查业务状态码
      if (data.code !== 200) {
        const error = new Error(data.message || '请求失败') as Error & { code: number };
        error.code = data.code;
        return Promise.reject(error);
      }

      return response;
    },
    (error) => {
      console.error('Response Error:', error);

      // 处理HTTP状态码错误
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 401:
            // 未授权，清除token并跳转到登录页
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              localStorage.removeItem('userInfo');
              window.location.href = '/login';
            }
            break;
          case 403:
            console.error('权限不足');
            break;
          case 404:
            console.error('请求的资源不存在');
            break;
          case 500:
            console.error('服务器内部错误');
            break;
          default:
            console.error(`请求失败: ${status}`);
        }
        
        const errorMessage = data?.message || `请求失败: ${status}`;
        return Promise.reject(new Error(errorMessage));
      } else if (error.request) {
        // 网络错误
        return Promise.reject(new Error('网络连接失败，请检查网络设置'));
      } else {
        // 其他错误
        return Promise.reject(error);
      }
    }
  );

  return instance;
};

// 创建请求实例
const request = createAxiosInstance();

/**
 * 通用请求方法
 */
export const apiRequest = {
  /**
   * GET请求
   */
  get: <T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request.get(url, config).then(res => res.data);
  },

  /**
   * POST请求
   */
  post: <T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request.post(url, data, config).then(res => res.data);
  },

  /**
   * PUT请求
   */
  put: <T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request.put(url, data, config).then(res => res.data);
  },

  /**
   * DELETE请求
   */
  delete: <T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request.delete(url, config).then(res => res.data);
  },

  /**
   * PATCH请求
   */
  patch: <T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request.patch(url, data, config).then(res => res.data);
  },
};

export default request;