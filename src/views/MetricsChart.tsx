import type { MetricRow } from './MetricsTable';

function numericValue(value: string | number): number {
  if (typeof value === 'number') return value;
  const match = value.match(/-?\d+(\.\d+)?/g);
  return match ? Number(match[match.length - 1]) : 0;
}

export function BarGroup({ title, rows, color }: { title: string; rows: MetricRow[]; color: string }) {
  if (rows.length === 0) return null;
  const max = Math.max(1, ...rows.map((row) => numericValue(row.value)));

  return (
    <div className="metrics-bar-group">
      <p className="trend-chart-label">{title}</p>
      {rows.map((row) => {
        const value = numericValue(row.value);
        const percent = Math.max(2, (value / max) * 100);
        return (
          <div className="metrics-bar-row" key={row.label}>
            <span className="metrics-bar-label">{row.label}</span>
            <div className="metrics-bar-track">
              <div className="metrics-bar-fill" style={{ width: `${percent}%`, background: color }} />
            </div>
            <span className="metrics-bar-value">{row.value}</span>
          </div>
        );
      })}
    </div>
  );
}

// Splits metrics into currency vs. count groups so wildly different scales aren't plotted on the same axis.
export function MetricsChart({ rows }: { rows: MetricRow[] }) {
  const currencyRows = rows.filter((row) => typeof row.value === 'string' && /[A-Za-z]/.test(row.value));
  const countRows = rows.filter((row) => !currencyRows.includes(row));

  return (
    <div className="metrics-chart-grid">
      <BarGroup title="Revenue metrics" rows={currencyRows} color="#2563eb" />
      <BarGroup title="Count metrics" rows={countRows} color="#059669" />
    </div>
  );
}
