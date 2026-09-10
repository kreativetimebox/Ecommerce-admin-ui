import { useAdminOrganizationsViewModel } from '../viewmodels/useAdminOrganizationsViewModel';

export function OrganizationsView({ token }: { token: string }) {
  const { data, error } = useAdminOrganizationsViewModel(token);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">B2B accounts</p>
          <h1>Organizations</h1>
        </div>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      {!error && !data && <p className="loading">Loading organizations...</p>}
      {data && (
        <div className="organization-grid">
          {data.map((organization) => (
            <article className="organization" key={organization.id}>
              <div>
                <p className="eyebrow">{organization.status}</p>
                <h2>{organization.name}</h2>
              </div>
              <strong>{organization.memberships.length}</strong>
              <span>members</span>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
