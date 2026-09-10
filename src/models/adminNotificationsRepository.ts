import { api } from './apiClient';
import type { AdminNotification, BroadcastForm } from './types';

export const adminNotificationsRepository = {
  async list(token: string) {
    const response = await api.get<AdminNotification[]>('/notifications/admin/all', undefined, token);
    return response.data;
  },
  async broadcast(form: BroadcastForm, token: string) {
    await api.post('/notifications/admin/broadcast', form, token);
  },
};
