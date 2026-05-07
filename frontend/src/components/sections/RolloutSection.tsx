import { useState } from 'react';

interface RolloutRow {
  enabled: boolean;
  date: string;
  comments: string;
  revisedDate: string;
  signedOff: boolean;
  signOffInitials: string;
}

const defaultRows: RolloutRow[] = [
  { enabled: false, date: '', comments: '', revisedDate: '', signedOff: false, signOffInitials: '' },
  { enabled: false, date: '', comments: '', revisedDate: '', signedOff: false, signOffInitials: '' },
  { enabled: false, date: '', comments: '', revisedDate: '', signedOff: false, signOffInitials: '' },
  { enabled: false, date: '', comments: '', revisedDate: '', signedOff: false, signOffInitials: '' },
];

const phaseLabels = ['1', '2', '3', 'Full-roll out'];

export default function RolloutSection() {
  const [rows, setRows] = useState<RolloutRow[]>(defaultRows);

  const toggleRow = (index: number) => {
    setRows((prev) =>
      prev.map((r, i) =>
        i === index ? { ...r, enabled: !r.enabled } : r
      )
    );
  };

  const updateRow = (index: number, field: keyof RolloutRow, value: string) => {
    setRows((prev) =>
      prev.map((r, i) =>
        i === index ? { ...r, [field]: value } : r
      )
    );
  };

  const signOff = (index: number) => {
    const userName = 'User';
    const initials = userName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    setRows((prev) =>
      prev.map((r, i) =>
        i === index ? { ...r, signedOff: true, signOffInitials: initials } : r
      )
    );
  };

  return (
    <div>
      <h3 className="font-bold mb-4">Section 12: Rollout</h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Phases</th>
              <th className="border p-2">Applicability</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Comments</th>
              <th className="border p-2">Revised Dates, if any</th>
              <th className="border p-2">Sign off - DT team</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className={`border p-2 text-center ${i === 3 ? 'font-semibold' : ''}`}>
                  {phaseLabels[i]}
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={row.enabled}
                    onChange={() => toggleRow(i)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="date"
                    className={`w-full border p-1 rounded ${!row.enabled ? 'bg-gray-200' : ''}`}
                    disabled={!row.enabled}
                    value={row.date}
                    onChange={(e) => updateRow(i, 'date', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className={`w-full border p-1 rounded ${!row.enabled ? 'bg-gray-200' : ''}`}
                    disabled={!row.enabled}
                    value={row.comments}
                    onChange={(e) => updateRow(i, 'comments', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="date"
                    className={`w-full border p-1 rounded ${!row.enabled ? 'bg-gray-200' : ''}`}
                    disabled={!row.enabled}
                    value={row.revisedDate}
                    onChange={(e) => updateRow(i, 'revisedDate', e.target.value)}
                  />
                </td>
                <td className="border p-2 text-center">
                  {row.signedOff ? (
                    <span className="font-semibold text-green-700">
                      {row.signOffInitials}
                    </span>
                  ) : (
                    <button
                      onClick={() => signOff(i)}
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs cursor-pointer disabled:opacity-50"
                      disabled={!row.enabled}
                    >
                      Sign Off
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subscription Update */}
      <div className="mt-8">
        <h4 className="font-semibold mb-3">Subscription Update (GRCHub)</h4>
        <table className="w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Question</th>
              <th className="p-2 border">Answer</th>
              <th className="p-2 border">Evidence Upload</th>
              <th className="p-2 border">Owner</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">
                Has the subscription been updated in GRCHub?
              </td>
              <td className="p-2 border">
                <select className="border p-2 w-full rounded">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </td>
              <td className="p-2 border">
                <input type="file" className="w-full text-sm" />
              </td>
              <td className="p-2 border">
                <input
                  type="text"
                  className="border p-2 w-full rounded"
                  placeholder="Owner name"
                />
              </td>
              <td className="p-2 border">
                <select className="border p-2 w-full rounded">
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
