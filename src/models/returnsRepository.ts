import { api } from './apiClient';
import type { AdminReturn } from './types';

export const returnsRepository = {
  async list(token: string) {
    const response = await api.get<AdminReturn[]>('/returns/admin', undefined, token);
    return response.data;
  },
  async review(returnId: string, status: 'APPROVED' | 'REJECTED', note: string | undefined, token: string) {
    await api.patch(`/returns/admin/${returnId}`, { status, note }, token);
  },
  async refund(returnId: string, token: string) {
    await api.post(`/returns/admin/${returnId}/refund`, { provider: 'RAZORPAY' }, token);
  },
};
