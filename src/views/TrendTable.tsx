import type { DashboardTrendPoint } from '../models/types';

export function TrendTable({ points }: { points: DashboardTrendPoint[] }) {
  if (points.length === 0) return <p className="trend-chart-empty">No trend data yet.</p>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Orders</th>
            <th>Revenue</th>
            <th>B2B orders</th>
            <th>B2B revenue</th>
            <th>Returns</th>
            <th>Refunds</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point) => (
            <tr key={point.date}>
              <td>{point.date}</td>
              <td>{point.orders}</td>
              <td>{point.revenue}</td>
              <td>{point.b2bOrders}</td>
              <td>{point.b2bRevenue}</td>
              <td>{point.returns}</td>
              <td>{point.refunds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
