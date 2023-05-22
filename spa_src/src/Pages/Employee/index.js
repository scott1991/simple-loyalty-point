import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import MoneyPad from '../../components/MoneyPad';
import CheckoutAmount from '../../components/CheckoutAmount';
import useSocket from '../../useSocket';
import Overlay from '../../components/Overlay';
import Loading from '../../components/Loading';
import PhoneNumber from '../../components/PhoneNumber';
import { postJsonData } from '../../serverRequests'


function Employee() {
  const [socket, isConnected] = useSocket();
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadingText, setLoadingText] = useState("連線中...");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("0");

  const joinRoom = () => {
    return new Promise((resolve, reject) => {
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
    } else {
      setShowOverlay(true);
      setLoadingText("等待Customer連線...");
    }
  };

  useEffect(() => {
    const handlePhoneChange = (phone) => {
      setPhone(phone);
    }

    const handleAddRecord = (record) => {
      console.log("handleAddRecord", record);
      if (record.phone === phone) {
        // show toast
        // clear phone and amount
        // setPhone("");
        // setAmount("0");
      }
      toast.success(record.phone + '\nPOINTS ADDED:' + record.point + '\nTOTAL POINTS:' + record.totalPoint,  { duration: 3000 });
    }

    if (socket) {
      socket.on('server.clientsUpdate', checkAndSetOverlay);
      socket.on('customer.confirmPhone', handlePhoneChange);
      socket.on('server.addRecord', handleAddRecord);

      return () => {
        // when unmount, remove event listener
        socket.off('server.clientsUpdate', checkAndSetOverlay);
        socket.off('customer.confirmPhone', handlePhoneChange);
        socket.off('server.addRecord', handleAddRecord);
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

  const handleConfirmAmount = () => {
    // POST /confirmAmount to notify server amount
    postJsonData("/confirmAmount", { amount: amount })
      .then(data => {
        console.log("confirmAmount:", data);
      }
      )
      .catch(error => {
        console.error(error);
      }
      );
    //   fetch("/confirmAmount", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       amount: amount
    //     })
    //   })
    //     .then(response => response.text())
    //     .then(data => { // log confirmAmount, data
    //       console.log("confirmAmount:", data);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }
  }

  const handleSend = () => {
    // POST /addRecord to add record {phone:string, amount:number}
    fetch("/addRecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: phone,
        amount: amount
      }
      )
    })
      .then(response => response.text())
      .then(data => { // log addRecord, data 
        console.log("addRecord:", data);
        setAmount("0");
        setPhone("");

      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div>
      <Overlay show={showOverlay}>
        <Loading loadingText={loadingText} />
      </Overlay>
      <PhoneNumber phoneNumber={phone} />
      <CheckoutAmount amount={amount} />
      <MoneyPad handleAmountChange={handleAmountChange} />
      <button
        type="button"
        onClick={handleConfirmAmount}
        className="btn btn-success m-1">
        確認金額
      </button>
      <button
        type="button"
        onClick={handleSend}
        className="btn btn-success m-1">
        送出
      </button>
      <Toaster
        position="top-center"
      />

    </div>
  );
}

export default Employee;
