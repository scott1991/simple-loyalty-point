import React from 'react';
import './pad.css';

const MoneyPad = ({ handleAmountChange }) => {
  // create an array of numbers for the keyboard
  const numbers = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
  ];

  // create an array of buttons for the keyboard
  const buttonRows = numbers.map((numberRows) => {
    const cols = numberRows.map((number) => {
      return (
        <button
          type="button"
          key={number}
          onClick={() => handleAmountChange(number)}
          className="btn btn-primary m-1 sqr-btn">
          {number}
        </button>
      );
    });
    return (
      <div
        className="d-flex flex-wrap justify-content-center"
        key={'r' + cols[0].key}>
        {cols}
      </div>
    );
  });

  return (
    <div>
      {/* 9~1 */}
      {buttonRows}
      {/* BS 0 CLS */}
      <div className="d-flex flex-wrap justify-content-center">
        <button
          type="button"
          onClick={() => handleAmountChange('BS')}
          className="btn btn-danger m-1 sqr-btn">
          <i className="bi bi-backspace"></i>
        </button>
        <button
          type="button"
          onClick={() => handleAmountChange('0')}
          className="btn btn-primary m-1 sqr-btn">
          0
        </button>
        <button
          type="button"
          onClick={() => handleAmountChange('C')}
          className="btn btn-danger m-1 sqr-btn">
          C
        </button>
      </div>
    </div>
  );
};

export default MoneyPad;
