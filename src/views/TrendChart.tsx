import type { DashboardTrendPoint } from '../models/types';

// Lightweight dependency-free SVG bar/line chart for dashboard trend visualization.
export function TrendChart({ points, valueKey, label, color, mode = 'bar' }: { points: DashboardTrendPoint[]; valueKey: keyof DashboardTrendPoint; label: string; color: string; mode?: 'bar' | 'line' }) {
  if (points.length === 0) return <p className="trend-chart-empty">No trend data yet.</p>;

  const width = 640;
  const height = 160;
  const bottomPadding = 22;
  const topPadding = 18;
  const plotHeight = height - bottomPadding - topPadding;
  const slotGap = 10;
  const maxSlotWidth = 56;
  const slotWidth = Math.min(maxSlotWidth, (width - slotGap * (points.length - 1)) / points.length);
  const usedWidth = slotWidth * points.length + slotGap * (points.length - 1);
  const startX = Math.max(0, (width - usedWidth) / 2);
  const values = points.map((point) => Number(point[valueKey]));
  const max = Math.max(1, ...values);
  const showValueLabels = points.length <= 14;
  const showEveryLabel = points.length <= 7;
  const centerX = (index: number) => startX + index * (slotWidth + slotGap) + slotWidth / 2;
  const pointY = (value: number) => height - bottomPadding - (max > 0 ? (value / max) * plotHeight : 0);
  const linePath = values.map((value, index) => `${index === 0 ? 'M' : 'L'}${centerX(index)},${pointY(value)}`).join(' ');
  const areaPath = `${linePath} L${centerX(values.length - 1)},${height - bottomPadding} L${centerX(0)},${height - bottomPadding} Z`;

  return (
    <div className="trend-chart">
      <p className="trend-chart-label">{label}</p>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${label} trend ${mode === 'line' ? 'line graph' : 'bar chart'}`} width="100%" height={height}>
        <line x1={0} y1={height - bottomPadding} x2={width} y2={height - bottomPadding} stroke="#dfe4e1" strokeWidth={1} />
        {mode === 'line' && (
          <>
            <path d={areaPath} fill={color} opacity={0.12} stroke="none" />
            <path d={linePath} fill="none" stroke={color} strokeWidth={2} />
          </>
        )}
        {points.map((point, index) => {
          const value = values[index] ?? 0;
          const x = startX + index * (slotWidth + slotGap);
          const y = pointY(value);
          return (
            <g key={point.date}>
              {mode === 'bar' ? (
                <rect x={x} y={y} width={slotWidth} height={Math.max(height - bottomPadding - y, value > 0 ? 2 : 0)} fill={color} rx={2}>
                  <title>{`${point.date}: ${value}`}</title>
                </rect>
              ) : (
                <circle cx={centerX(index)} cy={y} r={3.5} fill={color}>
                  <title>{`${point.date}: ${value}`}</title>
                </circle>
              )}
              {showValueLabels && value > 0 && (
                <text className="trend-chart-value" x={x + slotWidth / 2} y={y - 8} textAnchor="middle">{value}</text>
              )}
              {showEveryLabel && (
                <text className="trend-chart-value" x={x + slotWidth / 2} y={height - 6} textAnchor="middle">{point.date.slice(5)}</text>
              )}
            </g>
          );
        })}
      </svg>
      {!showEveryLabel && (
        <div className="trend-chart-range">
          <span>{points[0]?.date}</span>
          <span>{points[points.length - 1]?.date}</span>
        </div>
      )}
    </div>
  );
}
