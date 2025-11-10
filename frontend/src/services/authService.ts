import api from './api';
import { AuthResponse } from '../types';

export const authService = {
  async register(email: string, username: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/register', { email, username, password });
    return response.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  async updateProfile(username: string) {
    const response = await api.put('/auth/profile', { username });
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  }
};
