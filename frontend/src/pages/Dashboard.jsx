import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalMeetings: 0,
    totalActions: 0,
    openActions: 0,
    completedActions: 0,
  });
  const [recentMeetings, setRecentMeetings] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const meetings = await api.getMeetings();
      const actions = await api.getActionItems();

      setStats({
        totalMeetings: meetings.length,
        totalActions: actions.length,
        openActions: actions.filter(a => a.status === 'Open' || a.status === 'In Progress').length,
        completedActions: actions.filter(a => a.status === 'Completed').length,
      });
      
      // Grab only the 3 most recent meetings
      setRecentMeetings(meetings.slice(0, 3));
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Meetings</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalMeetings}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Action Items</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalActions}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Open/In Progress Tasks</p>
          <p className="text-3xl font-bold text-amber-500 mt-2">{stats.openActions}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Completed Tasks</p>
          <p className="text-3xl font-bold text-emerald-500 mt-2">{stats.completedActions}</p>
        </div>
      </div>

      {/* Recent Meetings Preview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recently Added Meetings</h3>
        <div className="space-y-3">
          {recentMeetings.map(m => (
            <div key={m.id} className="flex justify-between items-center p-3 hover:bg-gray-50 border border-gray-100 rounded">
              <div>
                <p className="font-semibold text-gray-900">{m.title}</p>
                <p className="text-xs text-gray-500">Type: {m.meeting_type}</p>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(m.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
          {recentMeetings.length === 0 && (
            <p className="text-sm text-gray-500">No meetings logged yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}