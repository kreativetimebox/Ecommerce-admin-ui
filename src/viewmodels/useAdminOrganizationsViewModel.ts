import { useEffect, useState } from 'react';
import { organizationsRepository } from '../models/organizationsRepository';
import type { Organization } from '../models/types';

export function useAdminOrganizationsViewModel(token: string) {
  const [data, setData] = useState<Organization[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    organizationsRepository.list(token).then(setData).catch(() => setError('Organizations are unavailable.'));
  }, [token]);

  return { data, error };
}
