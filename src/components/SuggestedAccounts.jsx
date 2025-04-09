// components/SuggestedAccounts.jsx
import { useState, useEffect } from 'react';
import { fetchSuggestedAccounts, fetchMoreAccounts } from '../services/api';

const SuggestedAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch initial suggested accounts (limited to 3)
  useEffect(() => {
    const loadInitialAccounts = async () => {
      setIsLoading(true);
      const data = await fetchSuggestedAccounts(3);
      setAccounts(data);
      setIsLoading(false);
    };

    loadInitialAccounts();
  }, []);

  // Handle "View more" click
  const handleViewMore = async () => {
    if (!showAll) {
      // First time expanding
      setShowAll(true);
      setIsLoading(true);
      
      const moreAccounts = await fetchMoreAccounts(page);
      
      if (moreAccounts.length === 0) {
        setHasMore(false);
      } else {
        setAccounts(prevAccounts => {
          // Create a map of existing IDs to avoid duplicates
          const existingIds = new Set(prevAccounts.map(account => account.id));
          // Filter out duplicates
          const newAccounts = moreAccounts.filter(account => !existingIds.has(account.id));
          return [...prevAccounts, ...newAccounts];
        });
        setPage(prevPage => prevPage + 1);
      }
      
      setIsLoading(false);
    } else if (hasMore) {
      // Already expanded, load more
      setIsLoading(true);
      
      const moreAccounts = await fetchMoreAccounts(page);
      
      if (moreAccounts.length === 0) {
        setHasMore(false);
      } else {
        setAccounts(prevAccounts => {
          // Create a map of existing IDs to avoid duplicates
          const existingIds = new Set(prevAccounts.map(account => account.id));
          // Filter out duplicates
          const newAccounts = moreAccounts.filter(account => !existingIds.has(account.id));
          return [...prevAccounts, ...newAccounts];
        });
        setPage(prevPage => prevPage + 1);
      }
      
      setIsLoading(false);
    }
  };

  // Handle follow action
  const handleFollow = (id) => {
    // In a real app, you would call an API to follow the user
    // For this example, we'll just update the local state
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === id ? { ...account, isFollowing: !account.isFollowing } : account
      )
    );
  };

  return (
    <div className="suggested-accounts">
      <div className="section-header">
        <h3>Suggested accounts</h3>
        <button 
          onClick={handleViewMore} 
          className="view-more"
          disabled={isLoading || (!hasMore && showAll)}
        >
          {isLoading ? 'Loading...' : hasMore ? 'View more' : 'No more accounts'}
        </button>
      </div>
      
      <div className={`accounts-list ${showAll ? 'expanded' : ''}`}>
        {accounts.map(account => (
          <div key={account.id} className="account-item">
            <div className="account-avatar">
              <img src={account.avatar} alt={account.name} />
            </div>
            <div className="account-name">{account.name}</div>
            <button 
              className={`follow-button-small ${account.isFollowing ? 'following' : ''}`}
              onClick={() => handleFollow(account.id)}
            >
              {account.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
        
        {isLoading && (
          <div className="loading-indicator">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default SuggestedAccounts;