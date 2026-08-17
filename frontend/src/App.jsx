import React, { useState } from 'react';
import MeetingManager from './pages/MeetingManager';
import ActionTracker from './pages/ActionTracker';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  // If the user is not logged in, show ONLY the login screen
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // If they are logged in, show the main application
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-slate-900 text-white px-8 py-3.5 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-lg tracking-wide">Zignuts AI Tracker</span>
        </div>
        <div className="flex space-x-2 items-center">
          <button
            onClick={() => setView('dashboard')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${view === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setView('meetings')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${view === 'meetings' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            Meetings
          </button>
          <button
            onClick={() => setView('actions')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${view === 'actions' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            Action Tracker
          </button>
          
          {/* User Profile and Logout */}
          <div className="h-6 w-px bg-slate-700 mx-2"></div>
          <span className="text-xs text-gray-400 mr-3">{userEmail}</span>
          <button 
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {view === 'dashboard' && <Dashboard />}
        {view === 'meetings' && <MeetingManager />}
        {view === 'actions' && <ActionTracker />}
      </main>
    </div>
  );
}