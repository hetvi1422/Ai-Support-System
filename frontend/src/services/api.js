import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  // Ingest / Test a ticket
  ingestTicket: async (ticketData) => {
    const response = await axios.post(`${API_BASE_URL}/tickets/ingest`, ticketData);
    return response.data;
  },
  
  // Fetch all tickets for agent review
  getTickets: async () => {
    const response = await axios.get(`${API_BASE_URL}/tickets`);
    return response.data;
  },

  // Submit Agent Feedback (Accept / Edit / Reject)
  submitFeedback: async (ticketId, feedbackData) => {
    const response = await axios.post(`${API_BASE_URL}/tickets/${ticketId}/feedback`, feedbackData);
    return response.data;
  },

  // Fetch Manager Analytics
  getAnalytics: async () => {
    const response = await axios.get(`${API_BASE_URL}/analytics/dashboard`);
    return response.data;
  }
};