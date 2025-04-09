import avartar_profile from '../assets/Avatar 78.jpg';

const ProfileHeader = () => {
    return (
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={avartar_profile} alt="Profile" />
        </div>
        <h2 className="profile-name">Kiran Glaucus</h2>
        <p className="profile-bio">I love a colorful life ❤️❤️❤️</p>
        
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">253</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat">
            <span className="stat-value">628</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-value">26.5k</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="follow-button">Follow</button>
          <button className="message-button">Message</button>
        </div>
      </div>
    );
  };
  
  export default ProfileHeader;