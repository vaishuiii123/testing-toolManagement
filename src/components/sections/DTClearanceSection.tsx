import ChecklistTable from '../ChecklistTable';
import { dtChecklistData } from '../../data/checklistData';

export default function DTClearanceSection() {
  return (
    <div>
      <h3 className="font-bold mb-2">Section 7: DT Clearance</h3>
      <ChecklistTable data={dtChecklistData} />
    </div>
  );
}
