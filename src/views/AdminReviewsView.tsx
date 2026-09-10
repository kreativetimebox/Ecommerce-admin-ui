import { useAdminReviewsViewModel } from '../viewmodels/useAdminReviewsViewModel';

export function AdminReviewsView({ token }: { token: string }) {
  const { data, message, moderate } = useAdminReviewsViewModel(token);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Customer voice</p>
          <h1>Reviews</h1>
        </div>
      </div>
      {message && <p className="form-message">{message}</p>}
      {!data ? (
        <p className="loading">Loading reviews...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Product</th><th>Customer</th><th>Rating</th><th>Review</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {data.map((review) => (
                <tr key={review.id} className={review.reported ? 'review-flagged' : ''}>
                  <td>{review.product.name}<br /><small>{review.product.sku}</small></td>
                  <td>{review.user.email}</td>
                  <td>{review.rating} / 5</td>
                  <td>{review.title && <strong>{review.title}</strong>}<br />{review.body}{review.reported && <><br /><small>Reported: {review.reportReason}</small></>}</td>
                  <td><span className={`status ${review.approved ? '' : 'status-pending'}`}>{review.approved ? 'APPROVED' : 'PENDING'}</span></td>
                  <td className="btn-group">
                    <button className="btn" type="button" onClick={() => moderate(review.id, true)} disabled={review.approved}>Approve</button>
                    <button className="btn btn-danger" type="button" onClick={() => moderate(review.id, false)} disabled={!review.approved && !review.reported}>Reject</button>
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
