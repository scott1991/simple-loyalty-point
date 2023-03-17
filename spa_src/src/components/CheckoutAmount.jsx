import React from 'react';
import './screen.css';

const CheckoutAmount = ({ amount }) => {
  return (
    <div className='screen'>
      <p className='d-flex flex-wrap justify-content-center'>結帳金額：</p>
      <div><p className='digit'>{amount}</p></div>
    </div>
  );
}

export default CheckoutAmount;