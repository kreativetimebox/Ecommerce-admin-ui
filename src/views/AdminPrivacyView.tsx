import { useAdminPrivacyViewModel } from '../viewmodels/useAdminPrivacyViewModel';

export function AdminPrivacyView({ token }: { token: string }) {
  const { data, message, process } = useAdminPrivacyViewModel(token);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Compliance</p>
          <h1>Privacy requests</h1>
        </div>
      </div>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading privacy requests...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Type</th>
                <th>Status</th>
                <th>Requested</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((request) => (
                <tr key={request.id}>
                  <td>{request.user.firstName} {request.user.lastName}<small>{request.user.email}</small></td>
                  <td>{request.type.replaceAll('_', ' ')}</td>
                  <td>{request.status}</td>
                  <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td>
                    {request.status === 'PENDING' && (
                      <div className="btn-group">
                        <button className="btn" type="button" onClick={() => process(request.id, 'PROCESSING')}>Start</button>
                        <button className="btn btn-danger" type="button" onClick={() => process(request.id, 'REJECTED')}>Reject</button>
                      </div>
                    )}
                    {request.status === 'PROCESSING' && <button className="btn" type="button" onClick={() => process(request.id, 'COMPLETED')}>Complete</button>}
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
