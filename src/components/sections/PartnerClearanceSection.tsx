import { useApp } from '../../context/AppContext';

export default function PartnerClearanceSection() {
  const { selectedToolType } = useApp();

  const decisionOptions =
    selectedToolType === 'existing'
      ? ['Procure the Tool', 'Get the Quotation', 'Not Approved']
      : ['Develop the Tool', 'Further Evaluation Required', 'Not Approved'];

  return (
    <div>
      <h3 className="font-bold mb-2">Section 5: Partner Clearance</h3>

      <div className="mb-4">
        <label className="font-semibold">Practice Area Partner Name</label>
        <select className="border p-2 w-full mt-1 rounded">
          <option value="">Select Partner</option>
          <option>Partner 1</option>
          <option>Partner 2</option>
          <option>Partner 3</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="font-semibold">Partner Approval Decision</label>
        <select className="border p-2 w-full mt-1 rounded">
          <option value="">Select Decision</option>
          {decisionOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="font-semibold">Comments (Optional)</label>
        <textarea
          className="border p-2 w-full mt-1 rounded"
          rows={3}
          placeholder="Enter any additional remarks if required"
        />
      </div>
    </div>
  );
}
