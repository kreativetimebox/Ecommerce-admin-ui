import { useEffect, useState } from 'react';
import { settingsRepository } from '../models/settingsRepository';
import { errorMessage } from '../models/errorMessage';
import type { SystemSetting } from '../models/types';

export function useSettingsViewModel(token: string) {
  const [data, setData] = useState<SystemSetting[] | null>(null);
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  function load() { return settingsRepository.list(token).then(setData); }

  useEffect(() => { load().catch((error) => setMessage(errorMessage(error, 'Settings are unavailable.'))); }, [token]);

  async function save() {
    try {
      let parsed: unknown = value;
      try { parsed = JSON.parse(value); } catch { /* keep as plain string */ }
      await settingsRepository.update(key, parsed, token);
      setKey('');
      setValue('');
      setMessage('Setting saved.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Setting could not be saved.'));
    }
  }

  return { data, message, key, setKey, value, setValue, save };
}
