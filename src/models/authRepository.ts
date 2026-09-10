import { api } from './apiClient';
import { tokenStorage } from './tokenStorage';
import type { AuthResponse } from './types';

export const authRepository = {
  async login(email: string, password: string) {
    const response = await api.post<AuthResponse>('/auth/admin/login', { email, password });
    tokenStorage.set(response.data.tokens.accessToken);
    return response.data;
  },
};
