import { useB2BReportsViewModel } from '../viewmodels/useB2BReportsViewModel';

export function B2BReportsView({ token }: { token: string }) {
  const { purchaseOrders, invoices, error } = useB2BReportsViewModel(token);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">B2B</p>
          <h1>Purchase orders &amp; invoices</h1>
        </div>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      {!error && (!purchaseOrders || !invoices) && <p className="loading">Loading B2B reports...</p>}
      {purchaseOrders && (
        <div className="table-wrap">
          <table>
            <caption className="sr-only">Purchase orders</caption>
            <thead>
              <tr>
                <th>Number</th>
                <th>Organization</th>
                <th>Requested by</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po) => (
                <tr key={po.id}>
                  <td>{po.number}</td>
                  <td>{po.organization.name}</td>
                  <td>{po.requestedBy.firstName} {po.requestedBy.lastName}<small>{po.requestedBy.email}</small></td>
                  <td>{po.status}</td>
                  <td>{po.order.currency} {po.amount}</td>
                  <td>{po.dueAt ? new Date(po.dueAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {invoices && (
        <div className="table-wrap">
          <table>
            <caption className="sr-only">Invoices</caption>
            <thead>
              <tr>
                <th>Number</th>
                <th>Customer</th>
                <th>Order status</th>
                <th>Total</th>
                <th>Issued</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.number}</td>
                  <td>{invoice.order.user.email}</td>
                  <td>{invoice.order.status}</td>
                  <td>{invoice.order.currency} {invoice.order.total}</td>
                  <td>{new Date(invoice.issuedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
