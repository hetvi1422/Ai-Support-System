import React, { useState } from 'react';

export default function TicketCard({ ticket, onAction }) {
  const [draft, setDraft] = useState(ticket.suggested_response || '');
  const [isEditing, setIsEditing] = useState(false);

  const sentimentColors = {
    POSITIVE: 'bg-green-100 text-green-800 border-green-300',
    NEUTRAL: 'bg-gray-100 text-gray-800 border-gray-300',
    FRUSTRATED: 'bg-amber-100 text-amber-800 border-amber-300',
    URGENT: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mb-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="font-bold text-lg text-gray-900">{ticket.customer_name}</span>
          <span className="text-sm text-gray-500 ml-2">({ticket.channel} • {ticket.language.toUpperCase()})</span>
        </div>
        <div className="flex gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${sentimentColors[ticket.sentiment] || sentimentColors.NEUTRAL}`}>
            {ticket.sentiment}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            {ticket.category}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-md mb-4 border text-gray-700 text-sm">
        <p className="font-medium text-xs text-gray-500 mb-1">INCOMING MESSAGE</p>
        {ticket.original_message}
      </div>

      {ticket.is_sensitive && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-4 rounded text-xs text-amber-800 font-medium">
          ⚠️ Policy Alert: High-risk or refund-related inquiry. Supervisor verification required prior to sending.
        </div>
      )}

      <div className="mb-4">
        <p className="font-medium text-xs text-gray-500 mb-1">AI SUGGESTED DRAFT</p>
        {isEditing ? (
          <textarea
            className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            rows={4}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        ) : (
          <div className="p-3 bg-blue-50/50 border border-blue-100 rounded text-sm text-gray-800">
            {draft}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t">
        <button
          onClick={() => onAction(ticket.id, 'REJECTED', draft)}
          className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded hover:bg-red-50"
        >
          Reject Draft
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
        >
          {isEditing ? 'Cancel Edit' : 'Edit Draft'}
        </button>
        <button
          onClick={() => onAction(ticket.id, isEditing ? 'EDITED' : 'ACCEPTED', draft)}
          className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 shadow-sm"
        >
          Approve & Send
        </button>
      </div>
    </div>
  );
}