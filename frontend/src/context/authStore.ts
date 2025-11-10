import { create } from 'zustand';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.login(email, password);

      if (response.success && response.data) {
        localStorage.setItem('token', response.data.token);
        set({
          user: response.data.user,
          token: response.data.token,
          isLoading: false
        });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message || 'Login failed',
        isLoading: false
      });
      throw error;
    }
  },

  register: async (email: string, username: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.register(email, username, password);

      if (response.success && response.data) {
        localStorage.setItem('token', response.data.token);
        set({
          user: response.data.user,
          token: response.data.token,
          isLoading: false
        });
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message || 'Registration failed',
        isLoading: false
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, token: null });
  },

  loadUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ user: null, token: null });
      return;
    }

    try {
      set({ isLoading: true });
      const response = await authService.getProfile();
      if (response.success) {
        set({ user: response.data, isLoading: false });
      }
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isLoading: false });
    }
  },

  clearError: () => set({ error: null })
}));
