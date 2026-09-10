import { api } from './apiClient';
import type { SystemSetting } from './types';

export const settingsRepository = {
  async list(token: string) {
    const response = await api.get<SystemSetting[]>('/admin/settings', undefined, token);
    return response.data;
  },
  async update(key: string, value: unknown, token: string) {
    await api.post(`/admin/settings/${encodeURIComponent(key)}`, { value }, token);
  },
};
