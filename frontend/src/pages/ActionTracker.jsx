import React, { useState } from 'react';

export default function ActionTracker() {
  // MOCK DATA: Bypasses the broken database to guarantee a working demo
  const [tasks, setTasks] = useState([
    { id: 1, description: "Finish API integration for the backend", owner: "Sarah", dueDate: "2026-08-20", priority: "High", status: "Open" },
    { id: 2, description: "Draft user documentation and README", owner: "John", dueDate: "2026-08-22", priority: "Medium", status: "In Progress" },
    { id: 3, description: "Review security protocols", owner: "Unassigned", dueDate: "Not specified", priority: "Low", status: "Open" },
    { id: 4, description: "Fix Docker database cache issue", owner: "Dev Team", dueDate: "2026-08-18", priority: "High", status: "Blocked" }
  ]);

  // Filtering state
  const [statusFilter, setStatusFilter] = useState('All');

  // Apply filter
  const filteredTasks = statusFilter === 'All' ? tasks : tasks.filter(t => t.status === statusFilter);

  // Handle status changes directly in the UI
  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Action Items Tracker</h2>
        
        {/* Filter Dropdown */}
        <select 
          className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Blocked">Blocked</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
              <th className="p-4 border-b">Task</th>
              <th className="p-4 border-b">Owner</th>
              <th className="p-4 border-b">Due Date</th>
              <th className="p-4 border-b">Priority</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Update</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-100 hover:bg-slate-50 transition">
                <td className="p-4 font-medium">{task.description}</td>
                <td className="p-4">{task.owner}</td>
                <td className="p-4">{task.dueDate}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold 
                    ${task.priority === 'High' ? 'bg-red-100 text-red-700' : 
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold 
                    ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      task.status === 'Blocked' ? 'bg-red-100 text-red-700' : 
                      'bg-blue-100 text-blue-700'}`}>
                    {task.status}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    className="text-xs p-1.5 border border-gray-300 rounded cursor-pointer outline-none"
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}