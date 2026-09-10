import { useAdminOrdersViewModel } from '../viewmodels/useAdminOrdersViewModel';

export function OrdersView({ token }: { token: string }) {
  const { data, error } = useAdminOrdersViewModel(token);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Fulfillment</p>
          <h1>Orders</h1>
        </div>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      {!error && !data && <p className="loading">Loading orders...</p>}
      {data && (
        <div className="table-wrap">
          <table>
            <caption className="sr-only">All platform orders</caption>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Items</th>
                <th>Total</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id.slice(0, 8)}</td>
                  <td>
                    {order.user.firstName} {order.user.lastName}
                    <small>{order.user.email}</small>
                  </td>
                  <td><span className={`status status-${order.status.toLowerCase()}`}>{order.status.replaceAll('_', ' ')}</span></td>
                  <td>{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
                  <td>{order.currency} {order.total}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
