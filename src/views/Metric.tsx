export function Metric({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <article className="metric">
      <p>{label}</p>
      <strong>{value}</strong>
      {detail && <span>{detail}</span>}
    </article>
  );
}
