import { useEffect, useState } from 'react';
import { policiesRepository } from '../models/policiesRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminPolicy, PolicyVersionForm } from '../models/types';

const POLICY_TYPES = ['PRIVACY', 'COOKIE', 'TERMS', 'RETURN', 'REFUND', 'SHIPPING', 'CANCELLATION', 'TERMS_OF_SALE', 'B2B_TERMS', 'PAYMENT_TERMS'];
const initialForm: PolicyVersionForm = { type: POLICY_TYPES[0]!, title: '', content: '', effectiveAt: new Date().toISOString().slice(0, 10) };

export function usePoliciesViewModel(token: string) {
  const [data, setData] = useState<AdminPolicy[] | null>(null);
  const [form, setForm] = useState<PolicyVersionForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return policiesRepository.list(token).then(setData); }

  useEffect(() => { load().catch((error) => setMessage(errorMessage(error, 'Policies are unavailable.'))); }, [token]);

  function setField<K extends keyof PolicyVersionForm>(field: K, value: PolicyVersionForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function create() {
    try {
      await policiesRepository.create(form, token);
      setForm({ ...initialForm, type: form.type });
      setMessage('Policy version created as a draft.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Policy version creation failed.'));
    }
  }

  async function publish(type: string, version: number) {
    try {
      await policiesRepository.publish(type, version, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Policy version could not be published.'));
    }
  }

  async function unpublish(type: string, version: number) {
    try {
      await policiesRepository.unpublish(type, version, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Policy version could not be unpublished.'));
    }
  }

  return { data, form, setField, message, create, publish, unpublish, policyTypes: POLICY_TYPES };
}
