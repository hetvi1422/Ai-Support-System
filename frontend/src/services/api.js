import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  createMeeting: async (meetingData) => {
    const response = await axios.post(`${API_BASE_URL}/meetings`, meetingData);
    return response.data;
  },
  getMeetings: async () => {
    const response = await axios.get(`${API_BASE_URL}/meetings`);
    return response.data;
  },
  getActionItems: async () => {
    const response = await axios.get(`${API_BASE_URL}/action-items`);
    return response.data;
  },
  updateActionItem: async (id, updateData) => {
    const response = await axios.put(`${API_BASE_URL}/action-items/${id}`, updateData);
    return response.data;
  },
  deleteMeeting: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/meetings/${id}`);
    return response.data;
  }, // <-- This comma was likely missing before!
  register: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/register`, credentials);
    return response.data;
  },
  login: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  }
};