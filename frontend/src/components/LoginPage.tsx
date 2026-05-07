import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(username, password)) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[360px] max-w-[92vw]">
        <h2 className="text-2xl font-bold text-[#800000] text-center mb-6">
          KNAV Tool Clearance Hub
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md text-sm outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md text-sm outline-none"
          />
          <button
            type="submit"
            className="bg-[#800000] text-white py-2.5 rounded-md text-sm font-semibold cursor-pointer hover:bg-[#a00000] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
