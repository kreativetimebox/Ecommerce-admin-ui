import { api } from './apiClient';
import type { AdminPolicy, PolicyVersionForm } from './types';

export const policiesRepository = {
  async list(token: string) {
    const response = await api.get<AdminPolicy[]>('/admin/policies', undefined, token);
    return response.data;
  },
  async create(form: PolicyVersionForm, token: string) {
    await api.post('/admin/policies', form, token);
  },
  async publish(type: string, version: number, token: string) {
    await api.post(`/admin/policies/${type}/${version}/publish`, {}, token);
  },
  async unpublish(type: string, version: number, token: string) {
    await api.post(`/admin/policies/${type}/${version}/unpublish`, {}, token);
  },
};
