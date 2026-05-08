import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { stepsList } from '../data/checklistData';

function DonutIndicator({ step, currentStep }: { step: number; currentStep: number }) {
  let percent = 0;
  if (step < currentStep) percent = 100;
  else if (step === currentStep) percent = 50;

  return (
    <div
      className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[8px] text-gray-700 shrink-0"
      style={{
        background: `conic-gradient(#800000 ${percent}%, #e5e5e5 ${percent}%)`,
        transition: 'all 0.4s ease',
      }}
    >
      {percent}%
    </div>
  );
}

export default function Sidebar() {
  const { showForm, currentStep, goToStep, addTool, closeForm, selectedToolType } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectType = (type: 'new' | 'existing') => {
    setMenuOpen(false);
    addTool(type);
  };

  // Determine which steps to show based on tool type
  const hiddenSteps =
    selectedToolType === 'new' ? [2, 10] : []; // hide Vendor Questionnaire & MSA for new tools

  return (
    <div className="w-60 bg-white p-4 shadow h-screen flex flex-col shrink-0">
      {/* Add Tool Dropdown */}
      <div className="relative mb-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-[#800000] hover:bg-[#a00000] text-white w-full flex justify-between items-center px-4 py-2 rounded cursor-pointer transition-colors"
        >
          <span>+ Add Tool</span>
          <span>▼</span>
        </button>

        {menuOpen && (
          <div className="absolute left-0 w-full bg-white border rounded shadow mt-1 z-10">
            <div
              onClick={() => handleSelectType('new')}
              className="p-2 hover:bg-gray-100 border-b cursor-pointer"
            >
              New Tool development request
            </div>
            <div
              onClick={() => handleSelectType('existing')}
              className="p-2 hover:bg-gray-100 border-b cursor-pointer"
            >
              Request Tool Clearance
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Link */}
      <div
        onClick={closeForm}
        className="font-semibold cursor-pointer mb-4 hover:text-[#800000]"
      >
        Dashboard
      </div>

      {/* Workflow Steps */}
      {showForm && (
        <div className="flex-grow overflow-y-auto">
          <h3 className="font-bold mb-3">Workflow</h3>
          <div className="space-y-3 text-sm">
            {stepsList.map((label, i) => {
              if (hiddenSteps.includes(i)) return null;

              const isActive = i === currentStep;
              const isCompleted = i < currentStep;

              return (
                <div
                  key={i}
                  onClick={() => goToStep(i)}
                  className={`flex items-center gap-2.5 py-1.5 px-2 rounded-md cursor-pointer transition-all relative
                    ${isActive ? 'font-bold' : ''}
                    ${isCompleted ? '' : ''}
                    hover:bg-gray-100
                  `}
                  style={{
                    borderLeft: isActive
                      ? '4px solid #800000'
                      : isCompleted
                        ? '4px solid #22c55e'
                        : '4px solid transparent',
                  }}
                >
                  <DonutIndicator step={i} currentStep={currentStep} />
                  <span className={isActive ? 'text-[#800000]' : ''}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
