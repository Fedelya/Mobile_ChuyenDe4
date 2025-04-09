// components/ContentTabs.jsx
import { useState, useEffect } from 'react';
import { fetchVideos, fetchMoreVideos, toggleLike } from '../services/videoApi';

const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch videos when tab changes or component mounts
  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      const category = activeTab === 'videos' ? 'video' : 'liked';
      const data = await fetchVideos(category);
      
      if (category === 'video') {
        setVideos(data);
      } else {
        setLikedVideos(data);
      }
      
      setPage(1);
      setHasMore(data.length > 0);
      setIsLoading(false);
    };
    
    loadVideos();
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  // Load more videos when scrolling to bottom
  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    const nextPage = page + 1;
    const category = activeTab === 'videos' ? 'video' : 'liked';
    const moreVideos = await fetchMoreVideos(category, nextPage);
    
    if (moreVideos.length === 0) {
      setHasMore(false);
    } else {
      if (category === 'video') {
        setVideos(prev => [...prev, ...moreVideos]);
      } else {
        setLikedVideos(prev => [...prev, ...moreVideos]);
      }
      setPage(nextPage);
    }
    
    setIsLoading(false);
  };

  // Handle like/unlike video
  const handleLikeToggle = async (videoId, currentlyLiked) => {
    try {
      const updatedVideo = await toggleLike(videoId, !currentlyLiked);
      
      // Update both video lists
      const updateVideoList = (list) => {
        return list.map(video => 
          video.id === videoId ? updatedVideo : video
        );
      };
      
      setVideos(prev => updateVideoList(prev));
      setLikedVideos(prev => updateVideoList(prev));
      
      // Update the video in the correct list based on its new category
      if (updatedVideo.category === 'liked' && !likedVideos.some(v => v.id === videoId)) {
        setLikedVideos(prev => [...prev, updatedVideo]);
      } else if (updatedVideo.category === 'video' && !videos.some(v => v.id === videoId)) {
        setVideos(prev => [...prev, updatedVideo]);
      }
    } catch (error) {
      console.error('Failed to toggle like status:', error);
    }
  };

  // Get the current videos based on active tab
  const currentVideos = activeTab === 'videos' ? videos : likedVideos;

  return (
    <div className="content-tabs">
      <div className="tabs-header">
        <button 
          className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => handleTabChange('videos')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <span>Videos</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => handleTabChange('liked')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>Liked</span>
        </button>
      </div>
      
      <div className="media-grid">
        {currentVideos.map(video => (
          <div key={video.id} className="media-item">
            <div className="thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <div className="views">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>{video.views}</span>
              </div>
              <div className="duration">{video.duration}</div>
              <button 
                className={`like-button ${video.category === 'liked' ? 'liked' : ''}`}
                onClick={() => handleLikeToggle(video.id, video.category === 'liked')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={video.category === 'liked' ? 'red' : 'none'} stroke={video.category === 'liked' ? 'red' : 'white'} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
            <div className="video-title">{video.title}</div>
          </div>
        ))}
      </div>
      
      {isLoading && (
        <div className="loading-indicator">Loading more videos...</div>
      )}
      
      {!isLoading && hasMore && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
      
      {!isLoading && !hasMore && currentVideos.length > 0 && (
        <div className="end-message">No more videos to load</div>
      )}
      
      {!isLoading && currentVideos.length === 0 && (
        <div className="no-videos-message">
          {activeTab === 'liked' ? 'No liked videos yet' : 'No videos available'}
        </div>
      )}
    </div>
  );
};

export default ContentTabs;