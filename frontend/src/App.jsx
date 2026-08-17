import React, { useState } from 'react';
import AgentWorkspace from './pages/AgentWorkspace';
import ManagerDashboard from './pages/ManagerDashboard';

export default function App() {
  const [view, setView] = useState('agent');

  return (
    
      
        
          SupportAI Platform
        
        
           setView('agent')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              view === 'agent' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-800'
            }`}
          >
            Agent Workspace
          
           setView('manager')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              view === 'manager' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-800'
            }`}
          >
            Manager Analytics
          
        
      

      
        {view === 'agent' ?  : }
      
    
  );
}