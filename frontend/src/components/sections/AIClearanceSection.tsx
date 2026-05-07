import ChecklistTable from '../ChecklistTable';
import { aiChecklistData } from '../../data/checklistData';

export default function AIClearanceSection() {
  return (
    <div>
      <h3 className="font-bold mb-2">Section 8: AI Clearance</h3>
      <ChecklistTable data={aiChecklistData} />
    </div>
  );
}
