import { useEffect, useState } from 'react';
import { reviewsRepository } from '../models/reviewsRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminReview } from '../models/types';

export function useAdminReviewsViewModel(token: string) {
  const [data, setData] = useState<AdminReview[] | null>(null);
  const [message, setMessage] = useState('');

  function load() { return reviewsRepository.list(token).then(setData); }

  useEffect(() => { load().catch((error) => setMessage(errorMessage(error, 'Reviews are unavailable.'))); }, [token]);

  async function moderate(id: string, approved: boolean) {
    try {
      await reviewsRepository.moderate(id, approved, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Review could not be moderated.'));
    }
  }

  return { data, message, moderate };
}
