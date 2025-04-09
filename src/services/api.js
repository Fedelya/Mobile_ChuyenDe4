
import axios from 'axios';

// Replace with your actual MockAPI URL
const API_URL = 'https://6758e27660576a194d121a14.mockapi.io/users';

export const fetchSuggestedAccounts = async (limit = 3) => {
  try {
    const response = await axios.get(`${API_URL}?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching suggested accounts:', error);
    return [];
  }
};

export const fetchMoreAccounts = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching more accounts:', error);
    return [];
  }
};