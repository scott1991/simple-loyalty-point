import React, { useState } from 'react';
import MoneyPad from '../../components/MoneyPad';
import CheckoutAmount from '../../components/CheckoutAmount';

function Employee() {
  const [amount, setAmount] = useState("0");
  const handleAmountChange = (input) => {
    setAmount((prevData) => {
      if (input === "BS") {
        return prevData.slice(0, -1) || "0";
      } else if ( input === "C" ) {
        return "0";
      } else { // number str
        if ( prevData === "0" ) {
          return input.toString();
        }else {
          return prevData + input.toString();
        }
      }
    });
  };


  return (
  <div>
    <CheckoutAmount amount={amount}/>
    <MoneyPad handleAmountChange={handleAmountChange}/>
  </div>)
   
}

export default Employee;
