import type { FormEvent } from 'react';
import { useBrandsViewModel } from '../viewmodels/useBrandsViewModel';
import { toSlug } from '../models/slug';

export function BrandsView({ token }: { token: string }) {
  const { data, form, setField, message, create } = useBrandsViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    create();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Brands</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <input required maxLength={150} placeholder="Name" value={form.name} onChange={(event) => setField('name', event.target.value)} />
        <input required placeholder="slug (e.g. acme-tools)" value={form.slug} onChange={(event) => setField('slug', toSlug(event.target.value))} />
        <button className="primary-action" type="submit">Create brand</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading brands...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Slug</th></tr></thead>
            <tbody>
              {data.map((brand) => (
                <tr key={brand.id}><td>{brand.name}</td><td>{brand.slug}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
