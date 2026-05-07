import ChecklistTable from '../ChecklistTable';
import { qcChecklistData } from '../../data/checklistData';

export default function QCClearanceSection() {
  return (
    <div>
      <h3 className="font-bold mb-2">Section 10: QC Clearance</h3>
      <ChecklistTable data={qcChecklistData} />
    </div>
  );
}
