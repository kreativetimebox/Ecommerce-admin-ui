import { useEffect, useState } from 'react';
import { productsRepository } from '../models/productsRepository';
import { categoriesRepository } from '../models/categoriesRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminCategory, AdminProduct, ProductForm } from '../models/types';

const initialForm: ProductForm = { sku: '', name: '', slug: '', categoryId: '', status: 'ACTIVE' };

export function useProductsViewModel(token: string) {
  const [data, setData] = useState<AdminProduct[] | null>(null);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return productsRepository.list(token).then(setData); }

  useEffect(() => {
    load().catch((error) => setMessage(errorMessage(error, 'Products are unavailable.')));
    categoriesRepository.list(token).then(setCategories).catch(() => {});
  }, [token]);

  function setField<K extends keyof ProductForm>(field: K, value: ProductForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function create() {
    try {
      await productsRepository.create(form, token);
      setForm(initialForm);
      setMessage(form.status === 'ACTIVE' ? 'Product created and published to the storefront and apps.' : 'Product created as a draft. Publish it to make it visible to customers.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Product creation failed.'));
    }
  }

  async function archive(id: string) {
    try {
      await productsRepository.archive(id, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Product could not be archived.'));
    }
  }

  async function removeProduct(id: string) {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    try {
      await productsRepository.remove(id, token);
      setMessage('Product deleted.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Product could not be deleted. It may have existing orders — archive it instead.'));
    }
  }

  async function uploadImage(productId: string, file: File) {
    try {
      await productsRepository.uploadImage(productId, file, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Image upload failed.'));
    }
  }

  async function removeImage(productId: string, imageId: string) {
    try {
      await productsRepository.removeImage(productId, imageId, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Image could not be removed.'));
    }
  }

  async function setStatus(id: string, status: 'ACTIVE' | 'INACTIVE') {
    try {
      await productsRepository.setStatus(id, status, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Product status could not be updated.'));
    }
  }

  return { data, categories, form, setField, message, create, archive, removeProduct, setStatus, uploadImage, removeImage };
}
