import { useEffect, useState } from 'react';
import { ordersRepository } from '../models/ordersRepository';
import type { AdminOrder, Page } from '../models/types';

export function useAdminOrdersViewModel(token: string) {
  const [data, setData] = useState<Page<AdminOrder> | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    ordersRepository.list(token).then(setData).catch(() => setError('Orders are unavailable.'));
  }, [token]);

  return { data, error };
}
