import { api } from './apiClient';
import type { AdminProduct, ProductForm } from './types';

export const productsRepository = {
  async list(token: string) {
    const response = await api.get<AdminProduct[]>('/admin/products', undefined, token);
    return response.data;
  },
  async create(form: ProductForm, token: string) {
    await api.post('/admin/products', form, token);
  },
  async setStatus(id: string, status: 'ACTIVE' | 'INACTIVE', token: string) {
    await api.patch('/admin/products/' + id, { status }, token);
  },
  async archive(id: string, token: string) {
    await api.post('/admin/products/' + id + '/archive', {}, token);
  },
  async remove(id: string, token: string) {
    await api.delete('/admin/products/' + id, token);
  },
  async uploadImage(productId: string, file: File, token: string) {
    const formData = new FormData();
    formData.append('file', file);
    await api.postForm('/admin/products/' + productId + '/images', formData, token);
  },
  async removeImage(productId: string, imageId: string, token: string) {
    await api.delete('/admin/products/' + productId + '/images/' + imageId, token);
  },
};
