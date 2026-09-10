import { usePaymentsViewModel } from '../viewmodels/usePaymentsViewModel';

export function PaymentsView({ token }: { token: string }) {
  const { data, message } = usePaymentsViewModel(token);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Finance</p>
          <h1>Payments</h1>
        </div>
      </div>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading payments...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order</th><th>Customer</th><th>Provider</th><th>Status</th><th>Amount</th><th>Reference</th><th>Date</th></tr></thead>
            <tbody>
              {data.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.order.id.slice(0, 8)}</td>
                  <td>{payment.order.user.email}</td>
                  <td>{payment.provider}</td>
                  <td><span className={`status status-${payment.status.toLowerCase()}`}>{payment.status}</span></td>
                  <td>{payment.currency} {payment.amount}</td>
                  <td>{payment.providerRef ?? '—'}</td>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
