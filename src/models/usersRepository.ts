import { api } from './apiClient';
import type { AdminUser, AdminRole, CreateUserForm } from './types';

export const usersRepository = {
  async list(token: string) {
    const response = await api.get<AdminUser[]>('/admin/users', undefined, token);
    return response.data;
  },
  async listRoles(token: string) {
    const response = await api.get<AdminRole[]>('/admin/roles', undefined, token);
    return response.data;
  },
  async create(input: CreateUserForm, token: string) {
    const response = await api.post<AdminUser>('/admin/users', input, token);
    return response.data;
  },
  async remove(userId: string, token: string) {
    await api.delete(`/admin/users/${userId}`, token);
  },
  async assignRole(userId: string, roleId: string, token: string) {
    await api.post(`/admin/users/${userId}/roles`, { roleId }, token);
  },
  async removeRole(userId: string, roleId: string, token: string) {
    await api.delete(`/admin/users/${userId}/roles/${roleId}`, token);
  },
  async updateStatus(userId: string, status: string, token: string) {
    await api.patch(`/admin/users/${userId}/status`, { status }, token);
  },
};
