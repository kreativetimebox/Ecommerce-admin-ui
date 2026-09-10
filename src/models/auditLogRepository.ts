import { api } from './apiClient';
import type { AuditLog, Page } from './types';

export const auditLogRepository = {
  async list(token: string) {
    const response = await api.get<Page<AuditLog>>('/admin/audit-logs', { page: 1, pageSize: 50 }, token);
    return response.data;
  },
};
