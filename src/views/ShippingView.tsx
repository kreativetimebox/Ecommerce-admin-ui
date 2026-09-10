import type { FormEvent } from 'react';
import { useShippingViewModel } from '../viewmodels/useShippingViewModel';

export function ShippingView({ token }: { token: string }) {
  const { data, form, setField, message, create, toggleActive } = useShippingViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    create();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Fulfillment</p>
          <h1>Shipping</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <input required maxLength={150} placeholder="Zone name" value={form.zoneName} onChange={(event) => setField('zoneName', event.target.value)} />
        <input required placeholder="Country (ISO-2)" maxLength={2} value={form.country} onChange={(event) => setField('country', event.target.value.toUpperCase())} />
        <input placeholder="Region (optional)" value={form.region} onChange={(event) => setField('region', event.target.value)} />
        <input required type="number" min="0" step="0.01" placeholder="Rate" value={form.rate} onChange={(event) => setField('rate', event.target.value)} />
        <input type="number" min="0" step="0.01" placeholder="Free shipping above" value={form.freeShippingThreshold} onChange={(event) => setField('freeShippingThreshold', event.target.value)} />
        <input required type="number" min="0" step="1" placeholder="Min days" value={form.estimatedDaysMin} onChange={(event) => setField('estimatedDaysMin', event.target.value)} />
        <input required type="number" min="0" step="1" placeholder="Max days" value={form.estimatedDaysMax} onChange={(event) => setField('estimatedDaysMax', event.target.value)} />
        <button className="primary-action" type="submit">Create shipping rule</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading shipping rules...</p>
      ) : (
        <div className="toggle-list">
          {data.map((rule) => (
            <div className="toggle-row" key={rule.id}>
              <span>{rule.zoneName} ({rule.country}{rule.region ? `/${rule.region}` : ''}) — {rule.rate} · {rule.estimatedDaysMin}-{rule.estimatedDaysMax} days{rule.freeShippingThreshold ? ` · free above ${rule.freeShippingThreshold}` : ''}</span>
              <button className="btn" type="button" onClick={() => toggleActive(rule)}>{rule.active ? 'Deactivate' : 'Activate'}</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
