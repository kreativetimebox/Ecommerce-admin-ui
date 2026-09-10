import { useEffect, useState } from 'react';
import { taxRepository } from '../models/taxRepository';
import { errorMessage } from '../models/errorMessage';
import type { TaxRule, TaxRuleForm } from '../models/types';

const initialForm: TaxRuleForm = { name: '', rate: '', country: 'IN', region: '' };

export function useTaxViewModel(token: string) {
  const [data, setData] = useState<TaxRule[] | null>(null);
  const [form, setForm] = useState<TaxRuleForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return taxRepository.list(token).then(setData); }

  useEffect(() => { load().catch((error) => setMessage(errorMessage(error, 'Tax rules are unavailable.'))); }, [token]);

  function setField<K extends keyof TaxRuleForm>(field: K, value: TaxRuleForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function create() {
    try {
      await taxRepository.create(form, token);
      setForm(initialForm);
      setMessage('Tax rule created.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Tax rule creation failed.'));
    }
  }

  async function toggleActive(rule: TaxRule) {
    try {
      await taxRepository.setActive(rule.id, !rule.active, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Could not update tax rule.'));
    }
  }

  return { data, form, setField, message, create, toggleActive };
}
