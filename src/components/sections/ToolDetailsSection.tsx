import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function ToolDetailsSection() {
  const { currentToolIndex, tools, saveTool } = useApp();
  const tool = currentToolIndex !== null ? tools[currentToolIndex] : null;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [requestor, setRequestor] = useState('');
  const [practice, setPractice] = useState('');

  useEffect(() => {
    if (tool) {
      setName(tool.name || '');
      setCompany(tool.company || '');
      setRequestor(tool.requestor || '');
      setPractice(tool.practice || '');
    } else {
      setName('');
      setCompany('');
      setRequestor('');
      setPractice('');
    }
  }, [tool]);

  const handleSave = () => {
    if (!name) {
      alert('Tool Name is required');
      return;
    }
    saveTool({ name, company, requestor, practice });
    alert('Saved successfully!');
  };

  return (
    <div>
      <h3 className="font-bold mb-2">Section 1: Tool Details</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        placeholder="Tool Name"
      />
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        placeholder="Company Name"
      />
      <input
        value={requestor}
        onChange={(e) => setRequestor(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        placeholder="Requestor Name"
      />
      <input
        value={practice}
        onChange={(e) => setPractice(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        placeholder="Practice Area"
      />
      <button
        onClick={handleSave}
        className="bg-[#800000] text-white px-4 py-2 rounded w-full mt-2 cursor-pointer hover:bg-[#a00000] transition-colors"
      >
        Save
      </button>
    </div>
  );
}
