import ChecklistTable from '../ChecklistTable';
import { itChecklistData } from '../../data/checklistData';

export default function ITClearanceSection() {
  return (
    <div>
      <h3 className="font-bold mb-2">Section 4: IT Clearance</h3>
      <ChecklistTable data={itChecklistData} />
    </div>
  );
}
