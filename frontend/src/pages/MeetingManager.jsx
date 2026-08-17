import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function MeetingManager() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Client Meeting');
  const [participants, setParticipants] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const data = await api.getMeetings();
      setMeetings(data);
    } catch (err) {
      console.error("Failed to load meetings:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createMeeting({
        title,
        meeting_type: type,
        participants,
        transcript
      });
      setTitle(''); setParticipants(''); setTranscript('');
      loadMeetings();
    } catch (err) {
      alert("Error processing meeting with AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Log New Meeting</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border border-gray-300 p-2.5 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Meeting Title" value={title} onChange={e=>setTitle(e.target.value)} required />
          <input className="w-full border border-gray-300 p-2.5 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Participants (e.g. John, Sarah)" value={participants} onChange={e=>setParticipants(e.target.value)} required />
          <select className="w-full border border-gray-300 p-2.5 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" value={type} onChange={e=>setType(e.target.value)}>
            <option>Client Meeting</option>
            <option>Internal Meeting</option>
            <option>Project Meeting</option>
            <option>Requirement Discussion</option>
          </select>
          <textarea className="w-full border border-gray-300 p-2.5 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" rows={8} placeholder="Paste the raw meeting transcript here..." value={transcript} onChange={e=>setTranscript(e.target.value)} required />
          <button disabled={loading} className="w-full bg-slate-900 text-white font-medium p-2.5 rounded hover:bg-slate-800 disabled:opacity-50 transition-colors">
            {loading ? "AI is processing transcript..." : "Extract Insights & Action Items"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Meetings</h2>
        <div className="space-y-4">
          {meetings.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900">{m.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  {m.meeting_type}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Participants: {m.participants}</p>
              
              <div className="bg-gray-50 p-3.5 rounded border border-gray-100 text-sm text-gray-700 mb-3">
                <span className="block font-semibold text-xs text-gray-500 mb-1">AI SUMMARY</span>
                {m.summary}
              </div>

              <div className="bg-emerald-50 p-3.5 rounded border border-emerald-100 text-sm text-gray-700">
                <span className="block font-semibold text-xs text-emerald-600 mb-1">KEY DECISIONS</span>
                {m.decisions || "No major decisions recorded."}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}