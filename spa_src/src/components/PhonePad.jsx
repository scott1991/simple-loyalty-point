import React from 'react';
import './pad.css';

const PhonePad = ({handlePhoneChange}) => {
  // create an array of numbers for the keyboard
  const numbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  // create an array of buttons for the keyboard
  const buttons = numbers.map((numberRows) => {
    const row = numberRows.map((number) => {
      return (
        <button type="button" key={number} onClick={() => handlePhoneChange(number)} className="btn btn-primary m-1 sqr-btn">
          {number}
        </button>
      );
    });
    // console.log(row);
    return <div className="d-flex flex-wrap justify-content-center" key={'r' + row[0].key}>{row}</div>;
  });

  return (
    <div>
      {buttons}
      <div className="d-flex flex-wrap justify-content-center">
      <button type="button" onClick={() => handlePhoneChange('BS')} className="btn btn-danger m-1 sqr-btn">
      <i className="bi bi-backspace"></i>
        </button>
      <button type="button" onClick={() => handlePhoneChange('0')} className="btn btn-primary m-1 sqr-btn">
        0
        </button>
        <button type="button"onClick={() => handlePhoneChange('C')} className="btn btn-danger m-1 sqr-btn">
        C
        </button>
      </div>

    </div>
  );
};

export default PhonePad;
