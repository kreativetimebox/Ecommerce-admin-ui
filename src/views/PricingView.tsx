import type { FormEvent } from 'react';
import { usePricingViewModel } from '../viewmodels/usePricingViewModel';

export function PricingView({ token }: { token: string }) {
  const { data, products, form, setField, message, create } = usePricingViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    create();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Pricing</p>
          <h1>Price tiers</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <select required value={form.productId} onChange={(event) => setField('productId', event.target.value)}>
          <option value="">Select product…</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.sku} — {product.name}</option>
          ))}
        </select>
        <select value={form.type} onChange={(event) => setField('type', event.target.value)}>
          <option>B2C</option>
          <option>B2B</option>
          <option>WHOLESALE</option>
        </select>
        <input required type="number" min="0" step="0.01" placeholder="Amount" value={form.amount} onChange={(event) => setField('amount', event.target.value)} />
        <input required type="number" min="1" placeholder="From quantity" value={form.minimumQty} onChange={(event) => setField('minimumQty', event.target.value)} />
        <input type="number" min="1" placeholder="To quantity" value={form.maximumQty} onChange={(event) => setField('maximumQty', event.target.value)} />
        <button className="primary-action" type="submit">Add tier</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading price tiers...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Quantity range</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tier) => (
                <tr key={tier.id}>
                  <td>
                    {tier.product.name}
                    <small>{tier.product.sku}</small>
                  </td>
                  <td>{tier.type}</td>
                  <td>{tier.amount}</td>
                  <td>{tier.minimumQty} - {tier.maximumQty ?? 'up'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
