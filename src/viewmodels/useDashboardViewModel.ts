import { useEffect, useState } from 'react';
import { dashboardRepository } from '../models/dashboardRepository';
import type { Dashboard, DashboardTrends } from '../models/types';

export function useDashboardViewModel(token: string) {
  const [data, setData] = useState<Dashboard | null>(null);
  const [trends, setTrends] = useState<DashboardTrends | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    dashboardRepository.get(token).then(setData).catch(() => setError('Dashboard data is unavailable. Confirm the API and database are running.'));
    dashboardRepository.trends(token, 30).then(setTrends).catch(() => undefined);
  }, [token]);

  return { data, trends, error };
}
