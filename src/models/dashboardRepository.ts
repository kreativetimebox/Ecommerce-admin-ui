import { api } from './apiClient';
import type { Dashboard, DashboardTrends } from './types';

export const dashboardRepository = {
  async get(token: string) {
    const response = await api.get<Dashboard>('/admin/dashboard', undefined, token);
    return response.data;
  },
  async trends(token: string, days = 30) {
    const response = await api.get<DashboardTrends>('/admin/dashboard/trends', { days: String(days) }, token);
    return response.data;
  },
};
