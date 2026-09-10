const REPORT_TYPES = ['orders', 'customers', 'products', 'returns', 'refunds', 'promo-usage', 'inventory'] as const;
export type ReportType = (typeof REPORT_TYPES)[number];
export { REPORT_TYPES };

export const reportsRepository = {
  async download(type: ReportType, token: string) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/v1';
    const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/admin/reports/${type}/export`, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error(`Report export failed with status ${response.status}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}-report.csv`;
    link.click();
    URL.revokeObjectURL(url);
  },
};
