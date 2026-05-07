import { useState } from 'react';
import type { ChecklistItem } from '../data/checklistData';

function FileUploadCell() {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <td className="p-2 border">
      <input
        type="file"
        multiple
        onChange={handleUpload}
        className="w-full text-sm"
      />
      <div className="text-xs mt-2 space-y-1">
        {files.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <span>{f.name}</span>
            <a
              href={f.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Open
            </a>
            <button
              onClick={() => removeFile(i)}
              className="text-red-600 underline cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </td>
  );
}

export default function ChecklistTable({
  data,
}: {
  data: ChecklistItem[];
}) {
  return (
    <table className="w-full text-sm border">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">Section</th>
          <th className="p-2 border">Team</th>
          <th className="p-2 border">Question</th>
          <th className="p-2 border">Answer</th>
          <th className="p-2 border">Evidence Upload</th>
          <th className="p-2 border">Owner</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          >
            <td className="p-2 border">{item.section}</td>
            <td className="p-2 border">{item.team}</td>
            <td className="p-2 border whitespace-pre-line">{item.question}</td>
            <td className="p-2 border">
              <input
                type="text"
                placeholder="Answer"
                className="w-full border rounded p-1"
              />
            </td>
            <FileUploadCell />
            <td className="p-2 border">
              <input
                type="text"
                placeholder="Owner"
                className="w-full border rounded p-1"
              />
            </td>
            <td className="p-2 border">
              <select className="w-full border rounded p-1">
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
