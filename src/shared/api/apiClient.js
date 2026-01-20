import axios from 'axios';

// API Base URL - uses environment variable or defaults based on environment
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Alarms API
export const alarmsAPI = {
  getAll: () => apiClient.get('/alarms'),
  getById: (id) => apiClient.get(`/alarms/${id}`),
  create: (data) => apiClient.post('/alarms', data),
  update: (id, data) => apiClient.put(`/alarms/${id}`, data),
  delete: (id) => apiClient.delete(`/alarms/${id}`),
};

// Users API
export const usersAPI = {
  getAll: () => apiClient.get('/users'),
  getById: (id) => apiClient.get(`/users/${id}`),
  create: (data) => apiClient.post('/users', data),
  update: (id, data) => apiClient.put(`/users/${id}`, data),
  delete: (id) => apiClient.delete(`/users/${id}`),
  search: (query) => apiClient.get('/users', { params: { search: query } }),
};

// NC Files API
export const ncFilesAPI = {
  getAll: () => apiClient.get('/nc-files'),
  getById: (id) => apiClient.get(`/nc-files/${id}`),
  create: (data) => apiClient.post('/nc-files', data),
  delete: (id) => apiClient.delete(`/nc-files/${id}`),
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/nc-files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Reports API
export const reportsAPI = {
  getAll: () => apiClient.get('/reports'),
  getById: (id) => apiClient.get(`/reports/${id}`),
  generate: (data) => apiClient.post('/reports/generate', data),
  download: (id) => apiClient.get(`/reports/${id}/download`, { responseType: 'blob' }),
};

// Settings API
export const settingsAPI = {
  get: () => apiClient.get('/settings'),
  update: (data) => apiClient.put('/settings', data),
};

// Auth API
export const authAPI = {
  login: (username, password) => 
    apiClient.post('/auth/login', { username, password }),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: () => apiClient.post('/auth/refresh'),
  changePassword: (oldPassword, newPassword) =>
    apiClient.post('/auth/change-password', { oldPassword, newPassword }),
};

// Health check
export const healthAPI = {
  check: () => apiClient.get('/health'),
};

export default apiClient;
