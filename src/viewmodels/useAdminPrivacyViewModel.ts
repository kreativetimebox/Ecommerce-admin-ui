import { useEffect, useState } from 'react';
import { privacyRepository } from '../models/privacyRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminPrivacyRequest } from '../models/types';

export function useAdminPrivacyViewModel(token: string) {
  const [data, setData] = useState<AdminPrivacyRequest[] | null>(null);
  const [message, setMessage] = useState('');

  function load() { return privacyRepository.list(token).then(setData); }

  useEffect(() => {
    load().catch((error) => setMessage(errorMessage(error, 'Privacy requests are unavailable.')));
  }, [token]);

  async function process(requestId: string, status: 'PROCESSING' | 'COMPLETED' | 'REJECTED') {
    try {
      await privacyRepository.process(requestId, status, undefined, token);
      setMessage('Privacy request updated.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Privacy request could not be updated.'));
    }
  }

  return { data, message, process };
}
