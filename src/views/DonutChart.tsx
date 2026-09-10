export type DonutSegment = { label: string; value: number; color: string };

// Lightweight dependency-free SVG donut chart (no external charting library).
export function DonutChart({ segments, size = 180 }: { segments: DonutSegment[]; size?: number }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  let offset = 0;

  return (
    <div className="donut-chart">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label="Order status breakdown">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#e3e6e1" strokeWidth={20} />
        {total > 0 && segments.map((segment) => {
          if (segment.value <= 0) return null;
          const share = segment.value / total;
          const dash = share * circumference;
          const circle = (
            <circle
              key={segment.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={20}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${center} ${center})`}
            >
              <title>{`${segment.label}: ${segment.value} (${Math.round(share * 100)}%)`}</title>
            </circle>
          );
          offset += dash;
          return circle;
        })}
        <text x={center} y={center - 4} textAnchor="middle" className="donut-total">{total}</text>
        <text x={center} y={center + 16} textAnchor="middle" className="donut-total-label">Total</text>
      </svg>
      <ul className="donut-legend">
        {segments.map((segment) => (
          <li key={segment.label}>
            <span className="donut-swatch" style={{ background: segment.color }} />
            {segment.label} — {segment.value}{total > 0 ? ` (${Math.round((segment.value / total) * 100)}%)` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
