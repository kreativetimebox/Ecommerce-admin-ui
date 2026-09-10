import { useEffect, useState } from 'react';
import { shippingRepository } from '../models/shippingRepository';
import { errorMessage } from '../models/errorMessage';
import type { ShippingRule, ShippingRuleForm } from '../models/types';

const initialForm: ShippingRuleForm = { zoneName: '', country: 'IN', region: '', rate: '', freeShippingThreshold: '', estimatedDaysMin: '3', estimatedDaysMax: '7' };

export function useShippingViewModel(token: string) {
  const [data, setData] = useState<ShippingRule[] | null>(null);
  const [form, setForm] = useState<ShippingRuleForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return shippingRepository.list(token).then(setData); }

  useEffect(() => { load().catch((error) => setMessage(errorMessage(error, 'Shipping rules are unavailable.'))); }, [token]);

  function setField<K extends keyof ShippingRuleForm>(field: K, value: ShippingRuleForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function create() {
    if (Number(form.estimatedDaysMax) < Number(form.estimatedDaysMin)) {
      setMessage('Maximum estimated days cannot be less than the minimum.');
      return;
    }
    try {
      await shippingRepository.create(form, token);
      setForm(initialForm);
      setMessage('Shipping rule created.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Shipping rule creation failed.'));
    }
  }

  async function toggleActive(rule: ShippingRule) {
    try {
      await shippingRepository.setActive(rule.id, !rule.active, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Could not update shipping rule.'));
    }
  }

  return { data, form, setField, message, create, toggleActive };
}
