// src/services/videoApi.js
import axios from 'axios';

// Replace with your actual MockAPI URL
const API_URL = 'https://6725930bc39fedae05b519e6.mockapi.io/videos';

// Fetch videos based on category (video or liked)
export const fetchVideos = async (category = 'video', limit = 6) => {
  try {
    const response = await axios.get(`${API_URL}?category=${category}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} videos:`, error);
    return [];
  }
};

// Load more videos with pagination
export const fetchMoreVideos = async (category = 'video', page = 1, limit = 6) => {
  try {
    const response = await axios.get(`${API_URL}?category=${category}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching more ${category} videos:`, error);
    return [];
  }
};

// Toggle like status for a video
export const toggleLike = async (videoId, liked) => {
  try {
    // In a real app, you would update the like status on the server
    // For MockAPI, we can use PUT request to update
    const video = await axios.get(`${API_URL}/${videoId}`);
    const updatedVideo = {
      ...video.data,
      likes: liked ? video.data.likes + 1 : video.data.likes - 1,
      category: liked ? 'liked' : 'video'
    };
    
    await axios.put(`${API_URL}/${videoId}`, updatedVideo);
    return updatedVideo;
  } catch (error) {
    console.error('Error toggling like status:', error);
    throw error;
  }
};