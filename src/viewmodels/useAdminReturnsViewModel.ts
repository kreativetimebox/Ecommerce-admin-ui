import { useEffect, useState } from 'react';
import { returnsRepository } from '../models/returnsRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminReturn } from '../models/types';

export function useAdminReturnsViewModel(token: string) {
  const [data, setData] = useState<AdminReturn[] | null>(null);
  const [message, setMessage] = useState('');

  function load() { return returnsRepository.list(token).then(setData); }

  useEffect(() => {
    load().catch((error) => setMessage(errorMessage(error, 'Returns are unavailable.')));
  }, [token]);

  async function review(returnId: string, status: 'APPROVED' | 'REJECTED') {
    try {
      await returnsRepository.review(returnId, status, undefined, token);
      setMessage('Return reviewed.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Return could not be reviewed.'));
    }
  }

  async function refund(returnId: string) {
    try {
      await returnsRepository.refund(returnId, token);
      setMessage('Refund processed.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Refund could not be processed.'));
    }
  }

  return { data, message, review, refund };
}
