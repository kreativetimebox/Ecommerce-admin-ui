import { useEffect, useState } from 'react';
import { promotionsRepository } from '../models/promotionsRepository';
import { errorMessage } from '../models/errorMessage';
import type { PromoCode, PromoCodeForm } from '../models/types';

const initialForm: PromoCodeForm = { code: '', type: 'PERCENTAGE', value: '', startsAt: '', expiresAt: '', customerType: 'B2C' };

export function usePromotionsViewModel(token: string) {
  const [data, setData] = useState<PromoCode[] | null>(null);
  const [form, setForm] = useState<PromoCodeForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return promotionsRepository.list(token).then(setData); }

  useEffect(() => {
    load().catch((error) => setMessage(errorMessage(error, 'Promo codes are unavailable.')));
  }, [token]);

  function setField<K extends keyof PromoCodeForm>(field: K, value: PromoCodeForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function create() {
    if (form.expiresAt && form.startsAt && new Date(form.expiresAt) <= new Date(form.startsAt)) {
      setMessage('Expiry must be after the start date.');
      return;
    }
    if (form.type === 'PERCENTAGE' && Number(form.value) > 100) {
      setMessage('Percentage cannot exceed 100.');
      return;
    }
    try {
      await promotionsRepository.create(form, token);
      setMessage('Promo code created.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Promo code creation failed.'));
    }
  }

  return { data, form, setField, message, create };
}
