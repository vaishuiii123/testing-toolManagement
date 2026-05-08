import { useApp } from './context/AppContext';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ToolForm from './components/ToolForm';
import './App.css';

function MainApp() {
  const { showForm } = useApp();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto">
          {showForm ? <ToolForm /> : <Dashboard />}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { isLoggedIn } = useApp();
  return isLoggedIn ? <MainApp /> : <LoginPage />;
}
