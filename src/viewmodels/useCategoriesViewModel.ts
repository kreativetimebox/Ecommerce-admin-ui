import { useEffect, useState } from 'react';
import { categoriesRepository } from '../models/categoriesRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminCategory, CategoryForm } from '../models/types';

const initialForm: CategoryForm = { name: '', slug: '', description: '', parentId: '' };

export function useCategoriesViewModel(token: string) {
  const [data, setData] = useState<AdminCategory[] | null>(null);
  const [form, setForm] = useState<CategoryForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return categoriesRepository.list(token).then(setData); }

  useEffect(() => { load().catch((error) => setMessage(errorMessage(error, 'Categories are unavailable.'))); }, [token]);

  function setField<K extends keyof CategoryForm>(field: K, value: CategoryForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function create() {
    try {
      await categoriesRepository.create(form, token);
      setForm(initialForm);
      setMessage('Category created.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Category creation failed.'));
    }
  }

  return { data, form, setField, message, create };
}
