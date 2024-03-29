import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import PhoneNumber from '../../components/PhoneNumber';
import PhonePad from '../../components/PhonePad';
import useSocket from '../../useSocket';
import Overlay from '../../components/Overlay';
import Loading from '../../components/Loading';
import CheckoutAmount from '../../components/CheckoutAmount';
import { postJsonData, getJsonData } from '../../serverRequests'


function Customer() {
  const [socket, isConnected] = useSocket();
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadingText, setLoadingText] = useState("連線中...");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("0");

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

  const checkRoomOk = () => {
    return new Promise((resolve) => {
      socket.emit('client.count', {}, (response) => {
        console.log("client.count:", response);
        resolve(response.Employee > 0);
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



  useEffect(() => {
    const handleAmountChange = (amount) => {
      setAmount(amount);
    }
    const handleAddRecord = (record) => {
      // handle added record ex: {"phone":"0987654321","point":1,"totalPoint":59}
      // show a toast message 
      // when toast close, if record.phone == phone, clear the phone and amount
      // else, log and do nothing
      console.log("handleAddRecord", record);
      if (record.phone === phone) {
        // show toast
        toast.success(record.phone + '\nPOINTS ADDED:' + record.point + '\nTOTAL POINTS:' + record.totalPoint, { duration: 3000 });
        // clear phone and amount
        setPhone("");
        setAmount("0");

      } else {
        // log and do nothing
        console.log("phone not match");
      }
    }

    const handleConsumePoints = (record) => {
      console.log("handleConsumePoints", record);
      if (record.phone === phone) {
        // show toast
        toast.success(record.phone + '\nPOINTS CONSUMED:' + record.point + '\nTOTAL POINTS:' + record.totalPoint, { duration: 3000 });
        // clear phone and amount
        setPhone("");
        setAmount("0");

      } else {
        // log and do nothing
        console.log("phone not match");
      }
    }

    if (socket) {
      socket.on('server.clientsUpdate', checkAndSetOverlay);
      socket.on('employee.confirmAmount', handleAmountChange);
      socket.on('server.addRecord', handleAddRecord);
      socket.on('server.consumePoints', handleConsumePoints);

      return () => {
        // when unmount, remove event listener
        socket.off('server.clientsUpdate', checkAndSetOverlay);
        socket.off('employee.confirmAmount', handleAmountChange);
        socket.off('server.addRecord', handleAddRecord);
        socket.off('server.consumePoints', handleConsumePoints);
      };
    }
  }, [socket, phone]);

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


  const handleConfirmPhone = () => {
    // POST /confirmPhone to notify server amount
    postJsonData('/confirmPhone', {
      phone: phone
    })
      .then(data => {
        console.log("confirmPhone", data);
      })
      .catch(err => {
        console.log(err);
      });
  }


  const handleGetPoints = () => {
    // GET /getPoints/{phone} to get user points by phone
    getJsonData('/getPoints/' + phone)
      .then(data => {
        // show toast
        toast.success(phone + '\nPOINTS:' + data.totalPoint, { duration: 3000 });
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handlePhoneClear = () => {
    setPhone("");
  };

  const handleAmountClear = () => {
    setAmount("0");
  };

  return (
    <div className='d-flex flex-wrap flex-column align-items-center'>
      <Overlay show={showOverlay}>
        <Loading loadingText={loadingText} />
      </Overlay>
      <CheckoutAmount amount={amount} handleClear={handleAmountClear} />
      <PhoneNumber phoneNumber={phone} handleClear={handlePhoneClear} />
      <PhonePad handlePhoneChange={handlePhoneChange} />
      <button
        type="button"
        onClick={handleConfirmPhone}
        className="btn btn-success m-3 btn-lg"
        disabled={amount === "0"}>
        確認金額號碼
      </button>
      <button
        type="button"
        onClick={handleGetPoints}
        className="btn btn-success m-3"
        disabled={phone === ""}>
        查詢點數
      </button>
      <Toaster
        position="top-center"
      />
    </div>

  );
}

export default Customer;
