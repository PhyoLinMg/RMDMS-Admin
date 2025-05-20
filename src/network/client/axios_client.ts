import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refresh_token } from '../auth/network_login';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class AxiosClient {
  private static instance: AxiosClient;
  private axiosInstance: AxiosInstance;
  private isRefreshing: boolean = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
    config: CustomAxiosRequestConfig;
  }> = [];

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient();
    }
    return AxiosClient.instance;
  }

  private processQueue(error: any = null, token: string | null = null): void {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        
        if (error.response?.status === 401 && !originalRequest?._retry) {
          if (this.isRefreshing) {
            // If token refresh is in progress, add request to queue
            return new Promise((resolve, reject) => {
              console.log("pushing again");
              this.failedQueue.push({ resolve, reject, config: originalRequest });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const tokens = await refresh_token();
            console.log(tokens);
            localStorage.setItem('accessToken', tokens.access_token);
            localStorage.setItem('refreshToken', tokens.refresh_token);
            
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`;
            this.processQueue(null, tokens.access_token);
            
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = typeof axiosError.response?.data === 'object' && axiosError.response?.data !== null
          ? (axiosError.response.data as { message?: string }).message
          : undefined;
        return new Error(errorMessage || 'An error occurred');
      } else if (axiosError.request) {
        // The request was made but no response was received
        return new Error("No response received from server.");
      }
    }
    // Something happened in setting up the request that triggered an Error
    return new Error('An unexpected error occurred');
  }
}

export const axiosClient = AxiosClient.getInstance();
