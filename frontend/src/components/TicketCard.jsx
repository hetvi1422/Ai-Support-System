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
    
      
        
          {ticket.customer_name}
          ({ticket.channel} • {ticket.language.toUpperCase()})
        
        
          
            {ticket.sentiment}
          
          
            {ticket.category}
          
        
      

      
        INCOMING MESSAGE
        {ticket.original_message}
      

      {ticket.is_sensitive && (
        
          ⚠️ Policy Alert: High-risk or refund-related inquiry. Supervisor verification required prior to sending.
        
      )}

      
        AI SUGGESTED DRAFT
        {isEditing ? (
           setDraft(e.target.value)}
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