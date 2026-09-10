import type { FormEvent } from 'react';
import { useProductsViewModel } from '../viewmodels/useProductsViewModel';
import { toSlug } from '../models/slug';
import { apiOrigin } from '../models/apiClient';

export function ProductsView({ token }: { token: string }) {
  const { data, categories, form, setField, message, create, archive, removeProduct, setStatus, uploadImage, removeImage } = useProductsViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    create();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Products</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <input required maxLength={100} placeholder="SKU" value={form.sku} onChange={(event) => setField('sku', event.target.value)} />
        <input required maxLength={255} placeholder="Name" value={form.name} onChange={(event) => setField('name', event.target.value)} />
        <input required placeholder="slug (e.g. pvc-pipe)" value={form.slug} onChange={(event) => setField('slug', toSlug(event.target.value))} />
        <select required value={form.categoryId} onChange={(event) => setField('categoryId', event.target.value)}>
          <option value="">Select category…</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
          <input type="checkbox" checked={form.status === 'ACTIVE'} onChange={(event) => setField('status', event.target.checked ? 'ACTIVE' : 'INACTIVE')} />
          Publish immediately (visible on storefront &amp; apps)
        </label>
        <button className="primary-action" type="submit">Create product</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading products...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Stock</th>
                <th>Photos</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product.id}>
                  <td>{product.sku}</td>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td><span className={`status status-${product.status.toLowerCase()}`}>{product.status}</span></td>
                  <td>{product.inventories.reduce((sum, item) => sum + item.available, 0)}</td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', alignItems: 'center' }}>
                      {product.images.map((image) => (
                        <div key={image.id} style={{ position: 'relative' }}>
                          <img src={apiOrigin + image.url} alt={image.altText ?? ''} style={{ width: 40, height: 40, objectFit: 'cover', border: '1px solid #cfd6d3' }} />
                          <button
                            type="button"
                            aria-label="Remove image"
                            onClick={() => removeImage(product.id, image.id)}
                            style={{ position: 'absolute', top: -6, right: -6, width: 16, height: 16, lineHeight: '14px', padding: 0, border: '1px solid #b45135', borderRadius: '50%', background: '#f7f4ec', color: '#b45135', fontSize: '.65rem' }}
                          >×</button>
                        </div>
                      ))}
                      <label className="btn" style={{ cursor: 'pointer' }}>
                        +
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          style={{ display: 'none' }}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) uploadImage(product.id, file);
                            event.target.value = '';
                          }}
                        />
                      </label>
                    </div>
                  </td>
                  <td className="btn-group">
                    {product.status !== 'ARCHIVED' && (
                      <button className="btn" type="button" onClick={() => setStatus(product.id, product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}>
                        {product.status === 'ACTIVE' ? 'Unpublish' : 'Publish'}
                      </button>
                    )}
                    {product.status !== 'ARCHIVED' && <button className="btn btn-danger" type="button" onClick={() => archive(product.id)}>Archive</button>}
                    <button className="btn btn-danger" type="button" onClick={() => removeProduct(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
