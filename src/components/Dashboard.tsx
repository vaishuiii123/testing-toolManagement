import { useApp } from '../context/AppContext';
import { stepsList } from '../data/checklistData';
import type { FilterType } from '../utils/types';

const filterButtons: { label: string; value: FilterType; color: string }[] = [
  { label: 'All', value: 'all', color: 'bg-gray-200' },
  { label: 'In Progress', value: 'progress', color: 'bg-blue-200' },
  { label: 'Completed', value: 'completed', color: 'bg-green-200' },
  { label: 'Not Started', value: 'new', color: 'bg-gray-400 text-white' },
];

export default function Dashboard() {
  // ✅ added deleteTool here
  const { tools, filter, setFilter, openTool, deleteTool } = useApp();

  const handleEdit = (index: number) => {
  console.log("Edit clicked:", tools[index]);

  // For now, reuse same form
  openTool(index);
};

  const filtered = tools.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return t.step >= 11;
    if (filter === 'progress') return t.step > 0 && t.step < 11;
    if (filter === 'new') return t.step === 0;
    return true;
  });

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-4 flex gap-2">
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value)}
            className={`px-4 py-2 rounded cursor-pointer transition-colors ${btn.color} ${
              filter === btn.value ? 'ring-2 ring-[#800000]' : ''
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Tools Table */}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Tool</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Step</th>
            <th className="p-2 text-left">Progress</th>
            <th className="p-2 text-left">%</th>
            <th className="p-2 text-left">Action</th>
             <th className="p-2 text-left">Graph</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-400">
                No tools found. Click "+ Add Tool" to get started.
              </td>
            </tr>
          )}

          {filtered.map((t, i) => {
            const percent = Math.round((t.step / 11) * 100);
            const originalIndex = i;

            return (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <b>{t.name || 'Untitled'}</b>
                </td>

                <td className="p-2 capitalize">{t.type}</td>

                <td className="p-2">
                  {stepsList[t.step] || 'Complete'}
                </td>

                <td className="p-2">
                  <div className="w-full bg-gray-200 h-3 rounded">
                    <div
                      className="bg-[#800000] h-3 rounded transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </td>

                <td className="p-2">{percent}%</td>

                {/* ✅ UPDATED ACTION COLUMN */}
                <td className="p-2 flex gap-2">
                  {/* View Button */}
                  <button
                    onClick={() => openTool(originalIndex)}
                    className="bg-[#800000] text-white px-3 py-1 rounded cursor-pointer hover:bg-[#a00000] transition-colors text-sm"
                  >
                    View
                  </button>
                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(originalIndex)}
                  className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700 transition-colors text-sm"
                >
                  Edit
                </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this tool?")) {
                        deleteTool(originalIndex);
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}