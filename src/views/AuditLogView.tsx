import { useAuditLogViewModel } from '../viewmodels/useAuditLogViewModel';

export function AuditLogView({ token }: { token: string }) {
  const { data, error } = useAuditLogViewModel(token);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Compliance</p>
          <h1>Audit log</h1>
        </div>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      {!error && !data && <p className="loading">Loading audit log...</p>}
      {data && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Entity</th>
                <th>Actor</th>
                <th>Organization</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.action}</td>
                  <td>
                    {entry.entity}
                    {entry.entityId && <small>{entry.entityId.slice(0, 8)}</small>}
                  </td>
                  <td>{entry.actor?.email ?? 'system'}</td>
                  <td>{entry.organization?.name ?? '—'}</td>
                  <td>{new Date(entry.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
