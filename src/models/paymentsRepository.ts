import { api } from './apiClient';
import type { AdminPayment } from './types';

export const paymentsRepository = {
  async list(token: string) {
    const response = await api.get<AdminPayment[]>('/admin/payments', undefined, token);
    return response.data;
  },
};
