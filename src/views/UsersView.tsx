import type { FormEvent } from 'react';
import { useUsersViewModel } from '../viewmodels/useUsersViewModel';

export function UsersView({ token }: { token: string }) {
  const { data, roles, form, setField, message, createUser, removeUser, assignRole, removeRole, toggleStatus } = useUsersViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    createUser();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Access control</p>
          <h1>Users &amp; roles</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <input required type="email" placeholder="Email" value={form.email} onChange={(event) => setField('email', event.target.value)} />
        <input required type="password" minLength={8} maxLength={100} placeholder="Password" value={form.password} onChange={(event) => setField('password', event.target.value)} />
        <input required maxLength={100} placeholder="First name" value={form.firstName} onChange={(event) => setField('firstName', event.target.value)} />
        <input required maxLength={100} placeholder="Last name" value={form.lastName} onChange={(event) => setField('lastName', event.target.value)} />
        <select value={form.type} onChange={(event) => setField('type', event.target.value as 'ADMIN' | 'CUSTOMER')}>
          <option value="ADMIN">Admin</option>
          <option value="CUSTOMER">Customer</option>
        </select>
        <button className="primary-action" type="submit">Add user</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data || !roles ? (
        <p className="loading">Loading users...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Roles</th>
                <th>Assign role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firstName} {user.lastName}
                    <small>{user.email}</small>
                  </td>
                  <td>{user.type}</td>
                  <td>{user.status}</td>
                  <td>
                    {user.roles.map((entry) => (
                      <span key={entry.role.id} className="role-chip">
                        {entry.role.name}
                        <button type="button" onClick={() => removeRole(user.id, entry.role.id)}>&times;</button>
                      </span>
                    ))}
                  </td>
                  <td>
                    <select className="role-select" defaultValue="" onChange={(event) => { if (event.target.value) { assignRole(user.id, event.target.value); event.target.value = ''; } }}>
                      <option value="" disabled>Select role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button className="btn" type="button" onClick={() => toggleStatus(user.id, user.status)}>{user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}</button>
                      <button className="btn btn-danger" type="button" onClick={() => removeUser(user.id)}>Delete</button>
                    </div>
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

