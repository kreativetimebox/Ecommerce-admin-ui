import { api } from './apiClient';
import type { AdminBrand, BrandForm } from './types';

export const brandsRepository = {
  async list(token: string) {
    const response = await api.get<AdminBrand[]>('/admin/brands', undefined, token);
    return response.data;
  },
  async create(form: BrandForm, token: string) {
    await api.post('/admin/brands', form, token);
  },
};
