import { useEffect, useState } from 'react';
import { adminNotificationsRepository } from '../models/adminNotificationsRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminNotification, BroadcastForm } from '../models/types';

const initialForm: BroadcastForm = { type: 'PROMOTION', title: '', body: '', allCustomers: true };

export function useAdminNotificationsViewModel(token: string) {
  const [data, setData] = useState<AdminNotification[] | null>(null);
  const [form, setForm] = useState<BroadcastForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return adminNotificationsRepository.list(token).then(setData); }

  useEffect(() => { load().catch((error) => setMessage(errorMessage(error, 'Notifications are unavailable.'))); }, [token]);

  function setField<K extends keyof BroadcastForm>(field: K, value: BroadcastForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function broadcast() {
    if (!form.allCustomers) {
      setMessage('Select "All customers" to send this broadcast — targeting specific customers is not supported yet.');
      return;
    }
    try {
      await adminNotificationsRepository.broadcast(form, token);
      setForm(initialForm);
      setMessage('Notification broadcast.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Broadcast failed.'));
    }
  }

  return { data, form, setField, message, broadcast };
}
