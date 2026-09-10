import type { FormEvent } from 'react';
import { useSettingsViewModel } from '../viewmodels/useSettingsViewModel';

export function SettingsView({ token }: { token: string }) {
  const { data, message, key, setKey, value, setValue, save } = useSettingsViewModel(token);

  function submit(event: FormEvent) {
    event.preventDefault();
    save();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Platform</p>
          <h1>System settings</h1>
        </div>
      </div>
      <form className="inline-form" onSubmit={submit}>
        <input required placeholder="Setting key (e.g. site.maintenanceMode)" value={key} onChange={(event) => setKey(event.target.value)} />
        <input required placeholder="Value (plain text or JSON)" value={value} onChange={(event) => setValue(event.target.value)} />
        <button className="primary-action" type="submit">Save setting</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading settings...</p>
      ) : data.length === 0 ? (
        <p className="loading">No settings configured yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Key</th><th>Value</th><th>Updated</th></tr></thead>
            <tbody>
              {data.map((setting) => (
                <tr key={setting.key}>
                  <td>{setting.key}</td>
                  <td>{JSON.stringify(setting.value)}</td>
                  <td>{new Date(setting.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
