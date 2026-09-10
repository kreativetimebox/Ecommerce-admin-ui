import type { FormEvent } from 'react';
import { useInventoryViewModel } from '../viewmodels/useInventoryViewModel';

export function InventoryView({ token }: { token: string }) {
  const { data, products, form, setField, message, adjust } = useInventoryViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    adjust();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Stock control</p>
          <h1>Inventory</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <select required value={form.productId} onChange={(event) => setField('productId', event.target.value)}>
          <option value="">Select product…</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.sku} — {product.name}</option>
          ))}
        </select>
        <input required type="number" placeholder="Quantity" value={form.quantity} onChange={(event) => setField('quantity', event.target.value)} />
        <select value={form.type} onChange={(event) => setField('type', event.target.value)}>
          <option value="RECEIPT">Receipt</option>
          <option value="ADJUSTMENT">Adjustment</option>
          <option value="DAMAGE">Damage</option>
          <option value="RETURN">Return</option>
        </select>
        <button className="primary-action" type="submit">Adjust stock</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading inventory...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Available</th>
                <th>Reserved</th>
                <th>Returned</th>
                <th>Damaged</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.product.name}
                    <small>{item.product.sku}</small>
                  </td>
                  <td>{item.available}</td>
                  <td>{item.reserved}</td>
                  <td>{item.returned}</td>
                  <td>{item.damaged}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
