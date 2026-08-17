import React, { useState } from 'react';
import MeetingManager from './pages/MeetingManager';

export default function App() {
  const [view, setView] = useState('meetings');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-slate-900 text-white px-8 py-3.5 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-lg tracking-wide">Zignuts AI Tracker</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('meetings')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              view === 'meetings' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-800'
            }`}
          >
            Meetings & Transcripts
          </button>
          <button
            onClick={() => setView('actions')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              view === 'actions' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-800'
            }`}
          >
            Action Items Tracker
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {view === 'meetings' ? (
          <MeetingManager />
        ) : (
          <div className="text-center p-10 text-gray-500">
            Action Tracker Board coming up next!
          </div>
        )}
      </main>
    </div>
  );
}