import React from 'react';
import './screen.css';

const PhoneNumber = ({ phoneNumber, handleClear }) => {
  return (
    <div className='screen d-flex flex-column align-items-stretch'>
      <p className='d-flex justify-content-center mb-0'>手機號碼：</p>
      <p className='digit d-flex justify-content-between align-items-center p-1'>
        <span style={{ width: '50px' }} />  {/* 在 span 左側增加一個相同寬度的佔位元素 */}
        <span className='flex-grow-1 text-center'>{phoneNumber}</span>
        <button onClick={handleClear} className='btn btn-dark btn-lg m-0'>
          <i className="bi bi-x-circle"></i>
        </button>
      </p>
    </div>
  );
}

export default PhoneNumber;