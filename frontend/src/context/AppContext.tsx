import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Tool, FilterType } from '../utils/types';

const API_URL = import.meta.env.VITE_API_URL || 'https://us-api.knavcpa.com/api/toolmgmt2';

interface AppContextType {
  isLoggedIn: boolean;
  userName: string;
  tools: Tool[];
  currentToolIndex: number | null;
  currentStep: number;
  filter: FilterType;
  selectedToolType: 'new' | 'existing';
  showForm: boolean;
  loading: boolean;

  login: (username: string, password: string) => boolean;
  logout: () => void;
  setFilter: (f: FilterType) => void;
  addTool: (type: 'new' | 'existing') => void;
  openTool: (index: number) => void;
  closeForm: () => void;
  saveTool: (data: Partial<Tool>) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true'
  );
  const [userName, setUserName] = useState(
    () => localStorage.getItem('userName') || ''
  );
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentToolIndex, setCurrentToolIndex] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedToolType, setSelectedToolType] = useState<'new' | 'existing'>('new');
  const [showForm, setShowForm] = useState(false);

  // Load tools from server on mount
  useEffect(() => {
    if (isLoggedIn) fetchTools();
  }, [isLoggedIn]);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/tools`);
      const data = await res.json();
      setTools(data);
    } catch (err) {
      console.error('Failed to fetch tools:', err);
      // Fallback to localStorage if server unreachable
      try {
        setTools(JSON.parse(localStorage.getItem('tools') || '[]'));
      } catch { setTools([]); }
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback((username: string, password: string): boolean => {
    if (
      (username === 'admin' && password === 'admin') ||
      (username === 'knav' && password === 'knav')
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', username);
      setIsLoggedIn(true);
      setUserName(username);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    setTools([]);
  }, []);

  const addTool = useCallback((type: 'new' | 'existing') => {
    setSelectedToolType(type);
    setCurrentToolIndex(null);
    setCurrentStep(0);
    setShowForm(true);
  }, []);

  const openTool = useCallback((index: number) => {
    setCurrentToolIndex(index);
    setCurrentStep(tools[index]?.step || 0);
    setShowForm(true);
  }, [tools]);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setCurrentToolIndex(null);
  }, []);

  const saveTool = useCallback(async (data: Partial<Tool>) => {
    try {
      if (currentToolIndex === null) {
        // CREATE new tool
        const newTool = {
          name: data.name || '',
          company: data.company || '',
          requestor: data.requestor || '',
          practice: data.practice || '',
          type: selectedToolType,
          step: 0,
        };
        const res = await fetch(`${API_URL}/api/tools`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTool),
        });
        const result = await res.json();
        setTools(prev => {
          const next = [...prev, result.tool];
          setCurrentToolIndex(next.length - 1);
          return next;
        });
      } else {
        // UPDATE existing tool
        const tool = tools[currentToolIndex];
        await fetch(`${API_URL}/api/tools/${tool.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        setTools(prev =>
          prev.map((t, i) => i === currentToolIndex ? { ...t, ...data } : t)
        );
      }
    } catch (err) {
      console.error('Failed to save tool:', err);
      // Fallback: update local state only
      setTools(prev => {
        const next = currentToolIndex === null
          ? [...prev, { name: data.name||'', company: data.company||'', requestor: data.requestor||'', practice: data.practice||'', type: selectedToolType, step: 0 }]
          : prev.map((t, i) => i === currentToolIndex ? { ...t, ...data } : t);
        localStorage.setItem('tools', JSON.stringify(next));
        return next;
      });
    }
  }, [currentToolIndex, selectedToolType, tools]);

  const goToStep = useCallback(async (step: number) => {
    setCurrentStep(step);
    if (currentToolIndex !== null) {
      const tool = tools[currentToolIndex];
      try {
        await fetch(`${API_URL}/api/tools/${tool.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ step }),
        });
      } catch (err) {
        console.error('Failed to update step:', err);
      }
      setTools(prev =>
        prev.map((t, i) => i === currentToolIndex ? { ...t, step } : t)
      );
    }
  }, [currentToolIndex, tools]);

  const nextStep = useCallback(async () => {
    if (currentToolIndex === null) return;
    const newStep = Math.min(currentStep + 1, 11);
    setCurrentStep(newStep);
    const tool = tools[currentToolIndex];
    try {
      await fetch(`${API_URL}/api/tools/${tool.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: newStep }),
      });
    } catch (err) {
      console.error('Failed to update step:', err);
    }
    setTools(prev =>
      prev.map((t, i) => i === currentToolIndex ? { ...t, step: newStep } : t)
    );
  }, [currentToolIndex, currentStep, tools]);

  return (
    <AppContext.Provider value={{
      isLoggedIn, userName, tools, currentToolIndex, currentStep,
      filter, selectedToolType, showForm, loading,
      login, logout, setFilter, addTool, openTool,
      closeForm, saveTool, goToStep, nextStep,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
