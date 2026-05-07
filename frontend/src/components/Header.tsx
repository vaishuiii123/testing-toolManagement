import { useApp } from '../context/AppContext';

export default function Header() {
  const { userName, logout } = useApp();

  return (
    <div className="bg-[#800000] text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg">KNAV Tool Clearance Hub</div>
      <div className="text-right">
        <div>
          <b>{userName || 'User'}</b>
        </div>
        <button onClick={logout} className="text-xs underline cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  );
}
