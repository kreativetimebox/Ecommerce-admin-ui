import { useEffect, useState } from 'react';
import { inventoryRepository } from '../models/inventoryRepository';
import { productsRepository } from '../models/productsRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminInventory, AdminProduct, InventoryAdjustmentForm } from '../models/types';

const initialForm: InventoryAdjustmentForm = { productId: '', quantity: '0', type: 'RECEIPT' };

export function useInventoryViewModel(token: string) {
  const [data, setData] = useState<AdminInventory[] | null>(null);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState<InventoryAdjustmentForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return inventoryRepository.list(token).then(setData); }

  useEffect(() => {
    load().catch((error) => setMessage(errorMessage(error, 'Inventory is unavailable.')));
    productsRepository.list(token).then(setProducts).catch(() => {});
  }, [token]);

  function setField<K extends keyof InventoryAdjustmentForm>(field: K, value: InventoryAdjustmentForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function adjust() {
    try {
      await inventoryRepository.adjust(form, token);
      setMessage('Inventory adjusted.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Inventory adjustment failed.'));
    }
  }

  return { data, products, form, setField, message, adjust };
}
