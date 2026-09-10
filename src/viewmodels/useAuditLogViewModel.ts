import { useEffect, useState } from 'react';
import { auditLogRepository } from '../models/auditLogRepository';
import type { AuditLog, Page } from '../models/types';

export function useAuditLogViewModel(token: string) {
  const [data, setData] = useState<Page<AuditLog> | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    auditLogRepository.list(token).then(setData).catch(() => setError('Audit logs are unavailable.'));
  }, [token]);

  return { data, error };
}
