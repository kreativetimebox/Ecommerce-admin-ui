import { api } from './apiClient';
import type { TaxRule, TaxRuleForm } from './types';

export const taxRepository = {
  async list(token: string) {
    const response = await api.get<TaxRule[]>('/admin/taxes', undefined, token);
    return response.data;
  },
  async create(form: TaxRuleForm, token: string) {
    await api.post('/admin/taxes', { ...form, region: form.region || undefined }, token);
  },
  async setActive(id: string, active: boolean, token: string) {
    await api.patch(`/admin/taxes/${id}`, { active }, token);
  },
};
