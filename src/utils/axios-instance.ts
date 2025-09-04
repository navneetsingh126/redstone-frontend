import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export const axiosInstance = axios.create({
  baseURL: CONFIG.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh and errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${CONFIG.apiBaseUrl}/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ----------------------------------------------------------------------

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/users/api/token/',
    refresh: '/token/refresh/',
    logout: '/token/logout/',
  },
  users: {
    list: '/users/',
    create: '/users/',
    detail: (id: string) => `/users/${id}/`,
    update: (id: string) => `/users/${id}/`,
    delete: (id: string) => `/users/${id}/`,
  },
  cities: {
    list: '/core/cities/',
    create: '/core/cities/',
    detail: (id: number) => `/core/cities/${id}/`,
    update: (id: number) => `/core/cities/${id}/`,
    delete: (id: number) => `/core/cities/${id}/`,
  },
} as const;
