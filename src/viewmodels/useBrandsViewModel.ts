import { useEffect, useState } from 'react';
import { brandsRepository } from '../models/brandsRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminBrand, BrandForm } from '../models/types';

const initialForm: BrandForm = { name: '', slug: '' };

export function useBrandsViewModel(token: string) {
  const [data, setData] = useState<AdminBrand[] | null>(null);
  const [form, setForm] = useState<BrandForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return brandsRepository.list(token).then(setData); }

  useEffect(() => { load().catch((error) => setMessage(errorMessage(error, 'Brands are unavailable.'))); }, [token]);

  function setField<K extends keyof BrandForm>(field: K, value: BrandForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function create() {
    try {
      await brandsRepository.create(form, token);
      setForm(initialForm);
      setMessage('Brand created.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Brand creation failed.'));
    }
  }

  return { data, form, setField, message, create };
}
