import { useApp } from '../context/AppContext';
import ToolDetailsSection from './sections/ToolDetailsSection';
import DemoSection from './sections/DemoSection';
import VendorQuestionnaireSection from './sections/VendorQuestionnaireSection';
import ITClearanceSection from './sections/ITClearanceSection';
import PartnerClearanceSection from './sections/PartnerClearanceSection';
import PilotSection from './sections/PilotSection';
import DTClearanceSection from './sections/DTClearanceSection';
import AIClearanceSection from './sections/AIClearanceSection';
import ToolMemoSection from './sections/ToolMemoSection';
import QCClearanceSection from './sections/QCClearanceSection';
import MSASection from './sections/MSASection';
import RolloutSection from './sections/RolloutSection';

const sections = [
  ToolDetailsSection,    // step 0
  DemoSection,           // step 1
  VendorQuestionnaireSection, // step 2
  ITClearanceSection,    // step 3
  PartnerClearanceSection, // step 4
  PilotSection,          // step 5
  DTClearanceSection,    // step 6
  AIClearanceSection,    // step 7
  ToolMemoSection,       // step 8
  QCClearanceSection,    // step 9
  MSASection,            // step 10
  RolloutSection,        // step 11
];

export default function ToolForm() {
  const { currentStep, nextStep } = useApp();

  const ActiveSection = sections[currentStep];

  return (
    <div className="bg-white p-6 rounded shadow max-h-[85vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Tool Workflow</h2>

      {ActiveSection && <ActiveSection />}

      {/* Navigation */}
      <div className="flex gap-2 mt-6">
        {currentStep < 11 && (
          <button
            onClick={nextStep}
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition-colors"
          >
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
