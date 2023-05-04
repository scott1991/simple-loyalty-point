import React from 'react';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const Overlay = ({ show, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div style={overlayStyle}>
      {children}
    </div>
  );
};

export default Overlay;
