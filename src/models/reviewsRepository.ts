import { api } from './apiClient';
import type { AdminReview } from './types';

export const reviewsRepository = {
  async list(token: string) {
    const response = await api.get<AdminReview[]>('/reviews/admin/all', undefined, token);
    return response.data;
  },
  async moderate(id: string, approved: boolean, token: string) {
    await api.patch(`/reviews/admin/${id}`, { approved }, token);
  },
};
