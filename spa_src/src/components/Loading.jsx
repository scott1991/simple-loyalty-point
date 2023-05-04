import React from 'react';

const loadingContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const loadingTextStyle = {
  color: '#FFF',
  fontSize: '1.5em',
  marginTop: '0.5em',
};


const Loading = ({ loadingText = 'Loading...' }) => {
  return (
    <div style={loadingContainerStyle}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{loadingText}</span>
      </div>
      <p style={loadingTextStyle}>{loadingText}</p>
    </div>
  );
};

export default Loading;
