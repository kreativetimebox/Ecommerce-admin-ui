import { api } from './apiClient';
import type { Organization } from './types';

export const organizationsRepository = {
  async list(token: string) {
    const response = await api.get<Organization[]>('/admin/organizations', undefined, token);
    return response.data;
  },
};
