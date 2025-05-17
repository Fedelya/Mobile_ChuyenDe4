// components/ContentTabs.jsx
import { useState, useEffect } from 'react';
import { fetchVideos, fetchMoreVideos, toggleLike } from '../services/videoApi';
import LoadingIndicator from './LoadingIndicator';

const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Fetch videos when tab changes or component mounts
  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const category = activeTab === 'videos' ? 'video' : 'liked';
        const data = await fetchVideos(category);
        
        if (category === 'video') {
          setVideos(data);
        } else {
          setLikedVideos(data);
        }
        
        setPage(1);
        setHasMore(data.length > 0);
      } catch (err) {
        setError(`Failed to load ${activeTab}. Please try again.`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVideos();
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  // Load more videos for the active tab only
  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
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
    } catch (err) {
      setError('Failed to load more videos. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle like/unlike video within the current tab only
  const handleLikeToggle = async (videoId, currentlyLiked) => {
    try {
      const updatedVideo = await toggleLike(videoId, !currentlyLiked);
      
      if (activeTab === 'videos') {
        // Nếu đang ở tab Videos, cập nhật video trong danh sách videos
        // hoặc xóa video nếu nó được chuyển sang danh sách liked
        if (updatedVideo.category === 'video') {
          setVideos(prev => 
            prev.map(video => video.id === videoId ? updatedVideo : video)
          );
        } else {
          // Nếu video được like, xóa khỏi danh sách videos
          setVideos(prev => prev.filter(video => video.id !== videoId));
        }
      } else {
        // Nếu đang ở tab Liked, cập nhật video trong danh sách liked
        // hoặc xóa video nếu nó được chuyển sang danh sách videos
        if (updatedVideo.category === 'liked') {
          setLikedVideos(prev => 
            prev.map(video => video.id === videoId ? updatedVideo : video)
          );
        } else {
          // Nếu video được unlike, xóa khỏi danh sách liked
          setLikedVideos(prev => prev.filter(video => video.id !== videoId));
        }
      }
      
    } catch (error) {
      console.error('Failed to toggle like status:', error);
      alert('Failed to update like status. Please try again.');
    }
  };

  // Handle retry on error
  const handleRetry = () => {
    setError(null);
    
    const loadVideos = async () => {
      setIsLoading(true);
      
      try {
        const category = activeTab === 'videos' ? 'video' : 'liked';
        const data = await fetchVideos(category);
        
        if (category === 'video') {
          setVideos(data);
        } else {
          setLikedVideos(data);
        }
        
        setPage(1);
        setHasMore(data.length > 0);
      } catch (err) {
        setError(`Failed to load ${activeTab}. Please try again.`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVideos();
  };

  // Get the current videos based on active tab
  const currentVideos = activeTab === 'videos' ? videos : likedVideos;

  // Render heart icon with proper styling
  const HeartIcon = ({ isLiked }) => (
    <svg 
      className="heart-icon"
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill={isLiked ? "#ff4d4f" : "none"} 
      stroke={isLiked ? "#ff4d4f" : "white"} 
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

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
      
      {error && (
        <div className="error-container">
          <div className="error-message">{error}</div>
          <button className="retry-button" onClick={handleRetry}>Try Again</button>
        </div>
      )}
      
      {!error && (
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
                
                {/* Thay đổi nút thích */}
                <button 
                  className={`heart-button-plain ${video.category === 'liked' ? 'liked' : ''}`}
                  onClick={() => handleLikeToggle(video.id, video.category === 'liked')}
                  aria-label={video.category === 'liked' ? 'Unlike' : 'Like'}
                >
                  <HeartIcon isLiked={video.category === 'liked'} />
                </button>
              </div>
              <div className="video-title">{video.title}</div>
            </div>
          ))}
        </div>
      )}
      
      {isLoading && <LoadingIndicator />}
      
      {!isLoading && !error && hasMore && currentVideos.length > 0 && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
      
      {!isLoading && !error && !hasMore && currentVideos.length > 0 && (
        <div className="end-message">No more videos to load</div>
      )}
      
      {!isLoading && !error && currentVideos.length === 0 && (
        <div className="no-videos-message">
          {activeTab === 'liked' ? 'No liked videos yet' : 'No videos available'}
        </div>
      )}

      <style jsx>{`
        .content-tabs {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .tabs-header {
          display: flex;
          border-bottom: 1px solid #eee;
        }
        
        .tab-button {
          flex: 1;
          background: none;
          border: none;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          color: #666;
          position: relative;
          cursor: pointer;
        }
        
        .tab-button.active {
          color: #333;
          font-weight: 600;
        }
        
        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #ff4d4f;
        }
        
        .media-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          padding: 15px;
        }
        
        .media-item {
          position: relative;
        }
        
        .thumbnail {
          position: relative;
          aspect-ratio: 9/16;
          overflow: hidden;
          border-radius: 8px;
        }
        
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .views, .duration {
          position: absolute;
          bottom: 10px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          font-size: 12px;
          padding: 3px 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .views {
          left: 10px;
        }
        
        .duration {
          right: 10px;
        }
        
        .heart-button-plain {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          padding: 0;
        }
        
        .heart-button-plain:hover {
          transform: scale(1.1);
        }
        
        .heart-icon {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.5));
        }
        
        .liked .heart-icon {
          transform: scale(1.2);
          filter: drop-shadow(0 0 3px rgba(255, 77, 79, 0.7));
        }
        
        .heart-button-plain:active .heart-icon {
          transform: scale(0.8);
        }
        
        .video-title {
          font-size: 14px;
          margin-top: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .load-more-button {
          display: block;
          width: 80%;
          margin: 15px auto;
          padding: 10px;
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 4px;
          color: #666;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .load-more-button:hover {
          background-color: #e9e9e9;
        }
        
        .end-message, .no-videos-message {
          text-align: center;
          padding: 20px;
          color: #999;
        }
      `}</style>
    </div>
  );
};

export default ContentTabs;