import { useEffect, useState } from 'react';
import { pricingRepository } from '../models/pricingRepository';
import { productsRepository } from '../models/productsRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminProduct, PriceTier, PriceTierForm } from '../models/types';

const initialForm: PriceTierForm = { productId: '', type: 'B2C', amount: '', minimumQty: '1', maximumQty: '' };

export function usePricingViewModel(token: string) {
  const [data, setData] = useState<PriceTier[] | null>(null);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState<PriceTierForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return pricingRepository.list(token).then(setData); }

  useEffect(() => {
    load().catch((error) => setMessage(errorMessage(error, 'Prices are unavailable.')));
    productsRepository.list(token).then(setProducts).catch(() => {});
  }, [token]);

  function setField<K extends keyof PriceTierForm>(field: K, value: PriceTierForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function create() {
    try {
      await pricingRepository.create(form, token);
      setMessage('Price tier created.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Price tier creation failed.'));
    }
  }

  return { data, products, form, setField, message, create };
}
