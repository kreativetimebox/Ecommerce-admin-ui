import type { FormEvent } from 'react';
import { usePoliciesViewModel } from '../viewmodels/usePoliciesViewModel';

export function AdminPoliciesView({ token }: { token: string }) {
  const { data, form, setField, message, create, publish, unpublish, policyTypes } = usePoliciesViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    create();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Legal</p>
          <h1>Policies</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <select value={form.type} onChange={(event) => setField('type', event.target.value)}>
          {policyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
        <input required maxLength={200} placeholder="Title" value={form.title} onChange={(event) => setField('title', event.target.value)} />
        <input required type="date" value={form.effectiveAt} onChange={(event) => setField('effectiveAt', event.target.value)} />
        <textarea
          required
          placeholder="Policy content (Markdown or plain text)"
          value={form.content}
          onChange={(event) => setField('content', event.target.value)}
          style={{ width: '100%', minHeight: '120px', padding: '.7rem', border: '1px solid #cfd6d3', background: '#f7f8f5' }}
        />
        <button className="primary-action" type="submit">Create draft version</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading policies...</p>
      ) : (
        data.map((policy) => (
          <div className="table-wrap" key={policy.id} style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ padding: '1rem', margin: 0 }}>{policy.title} <small>({policy.type})</small></h2>
            {policy.versions.map((version) => (
              <div className="policy-version" key={version.id}>
                <span>v{version.version} — effective {new Date(version.effectiveAt).toLocaleDateString()} — {version.published ? 'PUBLISHED' : 'DRAFT'}</span>
                <div className="btn-group" style={{ marginTop: '.5rem' }}>
                  {!version.published
                    ? <button className="btn" type="button" onClick={() => publish(policy.type, version.version)}>Publish</button>
                    : <button className="btn btn-danger" type="button" onClick={() => unpublish(policy.type, version.version)}>Unpublish</button>}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </>
  );
}
