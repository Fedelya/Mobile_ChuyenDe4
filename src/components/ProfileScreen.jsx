import { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import SuggestedAccounts from './SuggestedAccounts';
import ContentTabs from './ContentTabs';

const ProfileScreen = () => {
  return (
    <div className="profile-screen">
      <div className="header-nav">
        <button className="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="header-icons">
          <button className="notification-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <button className="menu-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>
      
      <ProfileHeader />
      <SuggestedAccounts />
      <ContentTabs />
    </div>
  );
};

export default ProfileScreen;