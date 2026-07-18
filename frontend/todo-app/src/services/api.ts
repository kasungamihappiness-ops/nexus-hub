/**
 * API Service - Handles all backend API communication
 * Features:
 * - Request/response interceptors
 * - Error handling
 * - Request timeout
 * - Automatic retry on failure
 * - Request cancellation
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

class ApiService {
  private baseUrl: string;
  private timeout: number;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.loadToken();
  }

  /**
   * Load auth token from localStorage
   */
  private loadToken() {
    try {
      this.token = localStorage.getItem('auth-token');
    } catch (error) {
      console.error('Error loading token:', error);
    }
  }

  /**
   * Set auth token
   */
  setToken(token: string) {
    this.token = token;
    try {
      localStorage.setItem('auth-token', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  /**
   * Clear auth token
   */
  clearToken() {
    this.token = null;
    try {
      localStorage.removeItem('auth-token');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  }

  /**
   * Make HTTP request with timeout and retry
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
    retryCount: number = 0
  ): Promise<ApiResponse<T>> {
    const maxRetries = options.retries || 3;
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.timeout);

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 401) {
        this.clearToken();
        throw new Error('Unauthorized - Please login again');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP ${response.status}`);
      }

      return data as ApiResponse<T>;
    } catch (error: any) {
      if (retryCount < maxRetries && (error.name === 'AbortError' || !navigator.onLine)) {
        console.warn(`Retry attempt ${retryCount + 1}/${maxRetries}`, error.message);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return this.request<T>(endpoint, options, retryCount + 1);
      }

      return {
        status: 'error',
        error: {
          code: 'REQUEST_FAILED',
          message: error.message || 'Request failed',
          details: error,
        },
      };
    }
  }

  /**
   * GET request
   */
  get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  /**
   * PUT request
   */
  put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  /**
   * DELETE request
   */
  delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }
}

export const apiService = new ApiService();
export default apiService;
