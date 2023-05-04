import React, { useState, useEffect } from 'react';
import PhoneNumber from '../../components/PhoneNumber';
import PhonePad from '../../components/PhonePad';
import useSocket from '../../useSocket';
import Overlay from '../../components/Overlay';
import Loading from '../../components/Loading';

function Customer() {
  const [socket, isConnected] = useSocket();
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadingText, setLoadingText] = useState("連線中...");

  const joinRoom = () => {
    return new Promise((resolve, reject) => {
      socket.emit('join.customer', {}, (response) => {
        console.log("join:", response);
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
    });
  };

  const checkAndSetOverlay = async () => {
    if (await checkRoomOk()) {
      setShowOverlay(false);
    } else {
      setShowOverlay(true);
      setLoadingText("等待 Employee 連線...");
    }
  };

  const checkRoomOk = () => {
    return new Promise((resolve) => {
      socket.emit('client.count', {}, (response) => {
        console.log("client.count:", response);
        resolve(response.Employee > 0);
      });
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on('server.clientsUpdate', checkAndSetOverlay);

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

  const [phone, setPhone] = useState("");
  const handlePhoneChange = (input) => {
    setPhone((prevData) => {
      if (input === 'BS') {
        return (prevData.slice(0, -1) || "");
      } else if (input === 'C') {
        return "";
      } else {
        return prevData + input.toString();
      }
    });

  };

  return (
    <div>
      <Overlay show={showOverlay}>
        <Loading loadingText={loadingText} />
      </Overlay>
      <PhoneNumber phoneNumber={phone} />
      <PhonePad handlePhoneChange={handlePhoneChange} />
    </div>
  );
}

export default Customer;
