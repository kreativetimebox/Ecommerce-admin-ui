import type { FormEvent } from 'react';
import { useTaxViewModel } from '../viewmodels/useTaxViewModel';

export function TaxesView({ token }: { token: string }) {
  const { data, form, setField, message, create, toggleActive } = useTaxViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    create();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Finance</p>
          <h1>Taxes</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <input required maxLength={100} placeholder="Name (e.g. GST)" value={form.name} onChange={(event) => setField('name', event.target.value)} />
        <input required type="number" min="0" step="0.01" placeholder="Rate % (e.g. 18.00)" value={form.rate} onChange={(event) => setField('rate', event.target.value)} />
        <input required placeholder="Country (ISO-2)" maxLength={2} value={form.country} onChange={(event) => setField('country', event.target.value.toUpperCase())} />
        <input placeholder="Region (optional)" value={form.region} onChange={(event) => setField('region', event.target.value)} />
        <button className="primary-action" type="submit">Create tax rule</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading tax rules...</p>
      ) : (
        <div className="toggle-list">
          {data.map((tax) => (
            <div className="toggle-row" key={tax.id}>
              <span>{tax.name} — {tax.rate}% ({tax.country}{tax.region ? `/${tax.region}` : ''})</span>
              <button className="btn" type="button" onClick={() => toggleActive(tax)}>{tax.active ? 'Deactivate' : 'Activate'}</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
