import { useAdminReturnsViewModel } from '../viewmodels/useAdminReturnsViewModel';

export function AdminReturnsView({ token }: { token: string }) {
  const { data, message, review, refund } = useAdminReturnsViewModel(token);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">After-sales</p>
          <h1>Returns &amp; refunds</h1>
        </div>
      </div>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading returns...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Order total</th>
                <th>Refund</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.user.firstName} {item.user.lastName}<small>{item.user.email}</small></td>
                  <td>{item.reason}</td>
                  <td><span className={`status status-${item.status.toLowerCase()}`}>{item.status.replaceAll('_', ' ')}</span></td>
                  <td>{item.order.currency} {item.order.total}</td>
                  <td>{item.refund ? `${item.refund.currency} ${item.refund.amount}` : '—'}</td>
                  <td>
                    {item.status === 'REQUESTED' && (
                      <div className="btn-group">
                        <button className="btn" type="button" onClick={() => review(item.id, 'APPROVED')}>Approve</button>
                        <button className="btn btn-danger" type="button" onClick={() => review(item.id, 'REJECTED')}>Reject</button>
                      </div>
                    )}
                    {item.status === 'APPROVED' && <button className="btn" type="button" onClick={() => refund(item.id)}>Process refund</button>}
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
