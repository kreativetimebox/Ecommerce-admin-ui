import { useEffect, useState } from 'react';
import { paymentsRepository } from '../models/paymentsRepository';
import type { AdminPayment } from '../models/types';

export function usePaymentsViewModel(token: string) {
  const [data, setData] = useState<AdminPayment[] | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    paymentsRepository.list(token).then(setData).catch(() => setMessage('Payments are unavailable.'));
  }, [token]);

  return { data, message };
}
