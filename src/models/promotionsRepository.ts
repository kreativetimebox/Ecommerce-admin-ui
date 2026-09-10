import { api } from './apiClient';
import type { PromoCode, PromoCodeForm } from './types';

export const promotionsRepository = {
  async list(token: string) {
    const response = await api.get<PromoCode[]>('/admin/promo-codes', undefined, token);
    return response.data;
  },
  async create(form: PromoCodeForm, token: string) {
    await api.post('/admin/promo-codes', { ...form, startsAt: new Date(form.startsAt).toISOString(), expiresAt: new Date(form.expiresAt).toISOString() }, token);
  },
};
