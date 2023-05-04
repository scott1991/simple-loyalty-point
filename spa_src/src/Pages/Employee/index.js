import React, { useState, useEffect } from 'react';

import MoneyPad from '../../components/MoneyPad';
import CheckoutAmount from '../../components/CheckoutAmount';
import useSocket from '../../useSocket';
import Overlay from '../../components/Overlay';
import Loading from '../../components/Loading';


function Employee() {
  const [socket, isConnected] = useSocket();
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadingText, setLoadingText] = useState("連線中...");

  const joinRoom = () => {
    return new Promise((resolve,reject) => {
      socket.emit('join.employee', {}, (response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      })
    });
  }; 

  const checkRoomOk = () => {
    return new Promise((resolve) => {
      socket.emit('client.count', {}, (response) => {
        console.log("client.count:", response);
        resolve(response.Customer > 0);
      });
    });
  };

  const checkAndSetOverlay = async () => {
    if (await checkRoomOk()) {
      setShowOverlay(false);
    }else{
      setShowOverlay(true);
      setLoadingText("等待Customer連線...");
    }
  };

  useEffect(() => {
    if (socket) {
      // Listen to 'server.clientsUpdate' event
      socket.on('server.clientsUpdate', checkAndSetOverlay);

      // Cleanup function to remove the event listener
      return () => {
        socket.off('server.clientsUpdate', checkAndSetOverlay);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (isConnected) {
      joinRoom()
      .then(checkAndSetOverlay)
      .catch(console.log);
    } else {
      setShowOverlay(true);
      setLoadingText("連線中...");
    }
  }, [isConnected]);


  const [amount, setAmount] = useState("0");
  const handleAmountChange = (input) => {
    setAmount((prevData) => {
      if (input === "BS") {
        return prevData.slice(0, -1) || "0";
      } else if (input === "C") {
        return "0";
      } else { // number str
        if (prevData === "0") {
          return input.toString();
        } else {
          return prevData + input.toString();
        }
      }
    });
  };

  return (
    <div>
      <Overlay show={showOverlay}>
        <Loading loadingText={loadingText} />
      </Overlay>
      <CheckoutAmount amount={amount} />
      <MoneyPad handleAmountChange={handleAmountChange} />
    </div>
  );

}

export default Employee;
