import { useState } from 'react';

function TestCaseCard({ number }: { number: number }) {
  return (
    <div className="border p-4 rounded bg-gray-50 mb-4">
      <h4 className="font-semibold mb-3">Test Case {number}</h4>
      <input
        type="text"
        className="w-full border p-2 mb-2 rounded"
        placeholder="Pilot Team Member Names"
      />
      <div className="mb-2">
        <label className="text-sm font-medium">Raw Data Used</label>
        <input type="file" className="w-full text-sm border p-1 rounded" />
      </div>
      <div className="mb-2">
        <label className="text-sm font-medium">Output Files</label>
        <input type="file" className="w-full text-sm border p-1 rounded" />
      </div>
      <textarea
        className="w-full border p-2 mb-2 rounded"
        placeholder="Recommendation / Feedback"
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Other Comments"
      />
    </div>
  );
}

export default function PilotSection() {
  const [testCaseCount, setTestCaseCount] = useState(3);

  return (
    <div>
      <h3 className="font-bold mb-4">Section 6: Pilot</h3>

      {Array.from({ length: testCaseCount }, (_, i) => (
        <TestCaseCard key={i} number={i + 1} />
      ))}

      <button
        onClick={() => setTestCaseCount((c) => c + 1)}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition-colors"
      >
        + Add Additional Test Case
      </button>

      <div className="mt-5">
        <label className="font-semibold">
          Overall Comments (considering all the undergone test cases)
        </label>
        <textarea className="border p-2 w-full mt-2 rounded" rows={4} />
      </div>
    </div>
  );
}
