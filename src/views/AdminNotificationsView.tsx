import type { FormEvent } from 'react';
import { useAdminNotificationsViewModel } from '../viewmodels/useAdminNotificationsViewModel';

export function AdminNotificationsView({ token }: { token: string }) {
  const { data, form, setField, message, broadcast } = useAdminNotificationsViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    broadcast();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Engagement</p>
          <h1>Notifications</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <select value={form.type} onChange={(event) => setField('type', event.target.value)}>
          <option>PROMOTION</option>
          <option>ACCOUNT</option>
          <option>ORDER_UPDATE</option>
        </select>
        <input required placeholder="Title" value={form.title} onChange={(event) => setField('title', event.target.value)} />
        <input required placeholder="Body" value={form.body} onChange={(event) => setField('body', event.target.value)} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
          <input type="checkbox" checked={form.allCustomers} onChange={(event) => setField('allCustomers', event.target.checked)} /> All customers
        </label>
        <button className="primary-action" type="submit">Broadcast</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading notifications...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Type</th><th>Title</th><th>Body</th><th>Sent</th></tr></thead>
            <tbody>
              {data.map((notification) => (
                <tr key={notification.id}>
                  <td>{notification.user.email}</td>
                  <td>{notification.type}</td>
                  <td>{notification.title}</td>
                  <td>{notification.body}</td>
                  <td>{new Date(notification.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
