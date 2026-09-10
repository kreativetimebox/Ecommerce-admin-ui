import { api } from './apiClient';
import type { PriceTier, PriceTierForm } from './types';

export const pricingRepository = {
  async list(token: string) {
    const response = await api.get<PriceTier[]>('/admin/prices', undefined, token);
    return response.data;
  },
  async create(form: PriceTierForm, token: string) {
    await api.post('/admin/prices', { ...form, minimumQty: Number(form.minimumQty), maximumQty: form.maximumQty ? Number(form.maximumQty) : undefined }, token);
  },
};
