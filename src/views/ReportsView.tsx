import { useState } from 'react';
import { reportsRepository, REPORT_TYPES, type ReportType } from '../models/reportsRepository';

export function ReportsView({ token }: { token: string }) {
  const [message, setMessage] = useState('');

  async function download(type: ReportType) {
    try {
      await reportsRepository.download(type, token);
    } catch {
      setMessage('Report export failed.');
    }
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Insights</p>
          <h1>Reports</h1>
        </div>
      </div>
      <p>Export CSV reports (Excel-compatible) with the latest data for each area of the business.</p>
      {message && <p className="form-message">{message}</p>}
      <div className="toggle-list">
        {REPORT_TYPES.map((type) => (
          <div className="toggle-row" key={type}>
            <span style={{ textTransform: 'capitalize' }}>{type.replace('-', ' ')}</span>
            <button className="btn" type="button" onClick={() => download(type)}>Export CSV</button>
          </div>
        ))}
      </div>
    </>
  );
}
