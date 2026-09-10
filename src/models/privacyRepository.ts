import { api } from './apiClient';
import type { AdminPrivacyRequest } from './types';

export const privacyRepository = {
  async list(token: string) {
    const response = await api.get<AdminPrivacyRequest[]>('/privacy/requests/admin', undefined, token);
    return response.data;
  },
  async process(requestId: string, status: 'PROCESSING' | 'COMPLETED' | 'REJECTED', note: string | undefined, token: string) {
    await api.patch(`/privacy/requests/admin/${requestId}`, { status, note }, token);
  },
};
