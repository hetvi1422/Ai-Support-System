import React, { useState } from 'react';
import TicketCard from '../components/TicketCard';
import { api } from '../services/api';

export default function AgentWorkspace() {
  const [tickets, setTickets] = useState([
    {
      id: 'demo-1',
      customer_name: 'Hans Mueller',
      channel: 'EMAIL',
      language: 'de',
      original_message: 'Ich habe meine Bestellung vor 10 Tagen storniert, aber mein Geld von 85€ immer noch nicht erhalten!',
      category: 'BILLING',
      priority: 'HIGH',
      sentiment: 'FRUSTRATED',
      is_sensitive: true,
      suggested_response: 'Hallo Herr Mueller, vielen Dank für Ihre Nachricht. Da Ihre Erstattung 85€ beträgt, habe ich dies zur Prüfung an unser Finanzteam weitergeleitet.'
    }
  ]);

  const [testMessage, setTestMessage] = useState('');
  const [testName, setTestName] = useState('');
  const [testLang, setTestLang] = useState('en');
  const [loading, setLoading] = useState(false);

  const handleIngestTest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.ingestTicket({
        customer_name: testName,
        customer_email: 'test@example.com',
        channel: 'CHAT',
        raw_message: testMessage,
        language: testLang
      });

      const newTicket = {
        id: res.ticket_id,
        customer_name: testName,
        channel: 'CHAT',
        language: testLang,
        original_message: testMessage,
        ...res.ai_analysis
      };

      setTickets([newTicket, ...tickets]);
      setTestMessage('');
      setTestName('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (ticketId, status, finalResponse) => {
    alert(`Ticket ${ticketId} action: ${status}`);
    setTickets(tickets.filter(t => t.id !== ticketId));
  };

  return (
    
      
        Pending Tickets ({tickets.length})
        {tickets.map(ticket => (
          
        ))}
      

      
        
          Simulate Incoming Customer Message
          
             setTestName(e.target.value)}
              required
            />
             setTestLang(e.target.value)}
            >
              English
              German (Deutsch)
            
             setTestMessage(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-2 rounded text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? 'Processing with AI...' : 'Send Message into Pipeline'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}