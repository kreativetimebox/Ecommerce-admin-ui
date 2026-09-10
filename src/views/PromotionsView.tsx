import type { FormEvent } from 'react';
import { usePromotionsViewModel } from '../viewmodels/usePromotionsViewModel';

export function PromotionsView({ token }: { token: string }) {
  const { data, form, setField, message, create } = usePromotionsViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    create();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Promotions</p>
          <h1>Promo codes</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <input required maxLength={50} placeholder="Code" value={form.code} onChange={(event) => setField('code', event.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''))} />
        <select value={form.type} onChange={(event) => setField('type', event.target.value)}>
          <option>PERCENTAGE</option>
          <option>FIXED_AMOUNT</option>
        </select>
        <input required type="number" min="0" step="0.01" placeholder="Value" value={form.value} onChange={(event) => setField('value', event.target.value)} />
        <input required type="datetime-local" value={form.startsAt} onChange={(event) => setField('startsAt', event.target.value)} />
        <input required type="datetime-local" value={form.expiresAt} onChange={(event) => setField('expiresAt', event.target.value)} />
        <select value={form.customerType} onChange={(event) => setField('customerType', event.target.value)}>
          <option>B2C</option>
          <option>B2B</option>
        </select>
        <button className="primary-action" type="submit">Create code</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading promo codes...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Value</th>
                <th>Audience</th>
                <th>Uses</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              {data.map((promo) => (
                <tr key={promo.id}>
                  <td>{promo.code}</td>
                  <td>{promo.type}</td>
                  <td>{promo.value}</td>
                  <td>{promo.customerType}</td>
                  <td>{promo.usageCount}</td>
                  <td>{new Date(promo.expiresAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
