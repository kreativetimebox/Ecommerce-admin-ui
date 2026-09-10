import { api } from './apiClient';
import type { AdminPurchaseOrder, AdminInvoice } from './types';

export const b2bReportsRepository = {
  async purchaseOrders(token: string) {
    const response = await api.get<AdminPurchaseOrder[]>('/admin/purchase-orders', undefined, token);
    return response.data;
  },
  async invoices(token: string) {
    const response = await api.get<AdminInvoice[]>('/admin/invoices', undefined, token);
    return response.data;
  },
};
