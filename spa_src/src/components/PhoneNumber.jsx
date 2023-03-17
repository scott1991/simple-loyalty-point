import React from 'react';
import './screen.css';

const PhoneNumber = ({ phoneNumber }) => {
  return (
    <div className='screen'>
      <p className='d-flex flex-wrap justify-content-center'>手機號碼：</p>
      <div><p className='digit'>{phoneNumber}</p></div>
    </div>
  );
}

export default PhoneNumber;