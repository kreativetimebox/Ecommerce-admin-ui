import { api } from './apiClient';
import type { AdminCategory, CategoryForm } from './types';

export const categoriesRepository = {
  async list(token: string) {
    const response = await api.get<AdminCategory[]>('/admin/categories', undefined, token);
    return response.data;
  },
  async create(form: CategoryForm, token: string) {
    await api.post('/admin/categories', { ...form, parentId: form.parentId || undefined }, token);
  },
};
