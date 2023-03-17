import React, { useState } from 'react';
import PhonePad from '../../components/PhonePad';
import PhoneNumber from '../../components/PhoneNumber'
function Client() {
  const [phone, setPhone] = useState("");
  const handlePhoneChange = (input) =>{
    setPhone((prevData)=>{
      if ( input === 'BS'){
        return (prevData.slice(0, -1) || "");
      }else if (input === 'C'){
        return "";
      }else{
        return prevData + input.toString() ;
      }
    })

  }
  return (
    <div>
      <PhoneNumber phoneNumber={phone} />
      <PhonePad handlePhoneChange={handlePhoneChange}/>

    </div>)
  
  ;
}

export default Client;
