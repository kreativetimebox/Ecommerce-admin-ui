import { api } from './apiClient';
import type { AdminOrder, Page } from './types';

export const ordersRepository = {
  async list(token: string) {
    const response = await api.get<Page<AdminOrder>>('/admin/orders', { page: 1, pageSize: 50 }, token);
    return response.data;
  },
};
