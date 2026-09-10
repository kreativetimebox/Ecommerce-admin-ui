import { api } from './apiClient';
import type { AdminInventory, InventoryAdjustmentForm } from './types';

export const inventoryRepository = {
  async list(token: string) {
    const response = await api.get<AdminInventory[]>('/admin/inventory', undefined, token);
    return response.data;
  },
  async adjust(form: InventoryAdjustmentForm, token: string) {
    await api.post('/admin/inventory/adjust', { ...form, quantity: Number(form.quantity) }, token);
  },
};
