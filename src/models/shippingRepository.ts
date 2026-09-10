import { api } from './apiClient';
import type { ShippingRule, ShippingRuleForm } from './types';

export const shippingRepository = {
  async list(token: string) {
    const response = await api.get<ShippingRule[]>('/admin/shipping-rules', undefined, token);
    return response.data;
  },
  async create(form: ShippingRuleForm, token: string) {
    await api.post('/admin/shipping-rules', {
      zoneName: form.zoneName,
      country: form.country || undefined,
      region: form.region || undefined,
      rate: form.rate,
      freeShippingThreshold: form.freeShippingThreshold || undefined,
      estimatedDaysMin: Number(form.estimatedDaysMin),
      estimatedDaysMax: Number(form.estimatedDaysMax),
    }, token);
  },
  async setActive(id: string, active: boolean, token: string) {
    await api.patch(`/admin/shipping-rules/${id}`, { active }, token);
  },
};
