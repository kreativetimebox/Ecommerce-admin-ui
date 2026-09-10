import { useEffect, useState } from 'react';
import { b2bReportsRepository } from '../models/b2bReportsRepository';
import type { AdminInvoice, AdminPurchaseOrder } from '../models/types';

export function useB2BReportsViewModel(token: string) {
  const [purchaseOrders, setPurchaseOrders] = useState<AdminPurchaseOrder[] | null>(null);
  const [invoices, setInvoices] = useState<AdminInvoice[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([b2bReportsRepository.purchaseOrders(token), b2bReportsRepository.invoices(token)])
      .then(([pos, invoiceList]) => { setPurchaseOrders(pos); setInvoices(invoiceList); })
      .catch(() => setError('B2B reports are unavailable.'));
  }, [token]);

  return { purchaseOrders, invoices, error };
}
