import type { FormEvent } from 'react';
import { useCategoriesViewModel } from '../viewmodels/useCategoriesViewModel';
import { toSlug } from '../models/slug';

export function CategoriesView({ token }: { token: string }) {
  const { data, form, setField, message, create } = useCategoriesViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    create();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Categories</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <input required maxLength={150} placeholder="Name" value={form.name} onChange={(event) => setField('name', event.target.value)} />
        <input required placeholder="slug (e.g. pipes-fittings)" value={form.slug} onChange={(event) => setField('slug', toSlug(event.target.value))} />
        <input placeholder="Description" value={form.description} onChange={(event) => setField('description', event.target.value)} />
        <select value={form.parentId} onChange={(event) => setField('parentId', event.target.value)}>
          <option value="">No parent category</option>
          {(data ?? []).map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button className="primary-action" type="submit">Create category</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading categories...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Slug</th><th>Parent</th></tr></thead>
            <tbody>
              {data.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{data.find((candidate) => candidate.id === category.parentId)?.name ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
