import React from 'react';
import './screen.css';

const CheckoutAmount = ({ amount, handleClear }) => {
  return (
    <div className='screen d-flex flex-column align-items-stretch'>
      <p className='d-flex justify-content-center mb-0'>結帳金額：</p>
      <p className='digit d-flex justify-content-between align-items-center p-1'>
        <span style={{ width: '50px' }} />  {/* 在span左側增加一個相同寬度的佔位元素 */}
        <span className='flex-grow-1 text-center'>{amount}</span>
        <button onClick={handleClear} className='btn btn-dark btn-lg m-0'>
          <i className="bi bi-x-circle"></i>
        </button>
      </p>
    </div>
  );
}

export default CheckoutAmount;