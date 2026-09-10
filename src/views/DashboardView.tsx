import { useState } from 'react';
import { useDashboardViewModel } from '../viewmodels/useDashboardViewModel';
import { Metric } from './Metric';
import { BarGroup } from './MetricsChart';
import { MetricsTable, type MetricRow } from './MetricsTable';
import { DonutChart } from './DonutChart';
import { TrendChart } from './TrendChart';
import { TrendTable } from './TrendTable';

export function DashboardView({ token }: { token: string }) {
  const { data, trends, error } = useDashboardViewModel(token);
  const [metricsView, setMetricsView] = useState<'grid' | 'table'>('grid');
  const [trendView, setTrendView] = useState<'bar' | 'line' | 'table'>('line');

  if (error) return <p className="error" role="alert">{error}</p>;
  if (!data) return <p className="loading">Loading dashboard...</p>;

  const metricRows: MetricRow[] = [
    { label: 'Total revenue', value: `${data.currency} ${data.revenue}`, detail: 'All non-cancelled orders' },
    { label: "Today's sales", value: `${data.currency} ${data.todaySales}`, detail: 'Since midnight' },
    { label: 'Monthly sales', value: `${data.currency} ${data.monthlySales}`, detail: 'Current calendar month' },
    { label: 'Orders', value: data.orders, detail: `${data.pendingOrders} pending` },
    { label: 'Completed orders', value: data.completedOrders, detail: 'Delivered' },
    { label: 'Cancelled orders', value: data.cancelledOrders, detail: 'All time' },
    { label: 'Returns', value: data.returns, detail: 'All time' },
    { label: 'Refunds', value: data.refunds, detail: 'Completed' },
    { label: 'Customers', value: data.customers, detail: 'Active B2C accounts' },
    { label: 'Organizations', value: data.organizations, detail: 'Active B2B accounts' },
    { label: 'Products', value: data.products, detail: 'Active catalog items' },
    { label: 'Low-stock products', value: data.lowStockProducts, detail: 'At or below threshold' },
    { label: 'Inventory', value: data.inventory.available, detail: `${data.inventory.reserved} reserved` },
  ];

  const inProgressOrders = Math.max(0, data.orders - data.completedOrders - data.cancelledOrders - data.pendingOrders);
  const orderStatusSegments = [
    { label: 'Completed', value: data.completedOrders, color: '#059669' },
    { label: 'Pending', value: data.pendingOrders, color: '#d97706' },
    { label: 'In progress', value: inProgressOrders, color: '#2563eb' },
    { label: 'Cancelled', value: data.cancelledOrders, color: '#dc2626' },
  ];

  const revenueTotal = trends?.series.reduce((sum, point) => sum + point.revenue, 0) ?? 0;
  const b2bRevenueTotal = trends?.series.reduce((sum, point) => sum + point.b2bRevenue, 0) ?? 0;
  const revenueSplitRows: MetricRow[] = [
    { label: 'B2C revenue (30d)', value: `${data.currency} ${(revenueTotal - b2bRevenueTotal).toFixed(2)}` },
    { label: 'B2B revenue (30d)', value: `${data.currency} ${b2bRevenueTotal.toFixed(2)}` },
  ];

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Good morning, admin.</h1>
        </div>
        <span className="date-stamp">Live metrics</span>
      </div>
      <div className="trend-toggle btn-group">
        <button className={`btn ${metricsView === 'grid' ? 'active' : ''}`} type="button" onClick={() => setMetricsView('grid')}>Grid</button>
        <button className={`btn ${metricsView === 'table' ? 'active' : ''}`} type="button" onClick={() => setMetricsView('table')}>Table</button>
      </div>
      {metricsView === 'grid' ? (
        <div className="metrics">
          {metricRows.map((row) => <Metric key={row.label} label={row.label} value={row.value} detail={row.detail} />)}
        </div>
      ) : (
        <MetricsTable rows={metricRows} />
      )}

      <div className="analytics-grid">
        <div className="trend-chart">
          <p className="trend-chart-label">Order status breakdown</p>
          <DonutChart segments={orderStatusSegments} />
        </div>
        <BarGroup title="Revenue by channel (last 30 days)" rows={revenueSplitRows} color="#7c3aed" />
      </div>

      {trends && trends.series.length > 0 && (
        <>
          <div className="trend-toggle btn-group">
            <button className={`btn ${trendView === 'line' ? 'active' : ''}`} type="button" onClick={() => setTrendView('line')}>Line graph</button>
            <button className={`btn ${trendView === 'bar' ? 'active' : ''}`} type="button" onClick={() => setTrendView('bar')}>Bars</button>
            <button className={`btn ${trendView === 'table' ? 'active' : ''}`} type="button" onClick={() => setTrendView('table')}>Table</button>
          </div>
          <div className="trend-panel">
            {trendView === 'table' ? (
              <TrendTable points={trends.series} />
            ) : (
              <div className="charts-grid">
                <TrendChart points={trends.series} valueKey="revenue" label="Revenue trend (30 days)" color="#2563eb" mode={trendView} />
                <TrendChart points={trends.series} valueKey="orders" label="Order trend (30 days)" color="#059669" mode={trendView} />
                <TrendChart points={trends.series} valueKey="b2bRevenue" label="B2B sales trend (30 days)" color="#7c3aed" mode={trendView} />
                <TrendChart points={trends.series} valueKey="returns" label="Returns trend (30 days)" color="#dc2626" mode={trendView} />
                <TrendChart points={trends.series} valueKey="refunds" label="Refunds trend (30 days)" color="#ea580c" mode={trendView} />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
