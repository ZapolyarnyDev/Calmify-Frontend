import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { AuthService } from '@/service/authService';
import { Logger } from '@/utils/logger';

export const api = axios.create({
  baseURL: 'http://localhost:8095/api',
  withCredentials: true,
});

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (token: string | null = null) => {
  failedQueue.forEach(cb => cb(token!));
  failedQueue = [];
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = AuthService.getAccessToken();
  if (token && config.headers) {
    Logger.info("Authorization header has been added");
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(api(originalRequest));
            } else {
              reject('No headers');
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post<{ data: string }>('/v0/token/refresh');
        const newAccessToken = response.data.data;

        AuthService.setAccessToken(newAccessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(newAccessToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(null);
        Logger.error('Refresh token failed', err);
        AuthService.logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
