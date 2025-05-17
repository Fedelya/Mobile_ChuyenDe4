import React from 'react';

const LoadingIndicator = ({ size = 'medium', color = 'primary' }) => {
  const getSize = () => {
    switch (size) {
      case 'small': return '24px';
      case 'large': return '48px';
      default: return '36px';
    }
  };

  const getColor = () => {
    switch (color) {
      case 'white': return '#ffffff';
      case 'secondary': return '#666666';
      default: return '#4361ee';
    }
  };

  return (
    <div className="loading-indicator-container">
      <div className="spinner" style={{ width: getSize(), height: getSize(), borderTopColor: getColor() }}></div>
      <style jsx>{`
        .loading-indicator-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          width: 100%;
        }
        
        .spinner {
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: #4361ee;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingIndicator;