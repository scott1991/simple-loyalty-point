import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import MoneyPad from '../../components/MoneyPad';
import CheckoutAmount from '../../components/CheckoutAmount';
import useSocket from '../../useSocket';
import Overlay from '../../components/Overlay';
import Loading from '../../components/Loading';
import PhoneNumber from '../../components/PhoneNumber';
import { postJsonData } from '../../serverRequests'
import PointsModal from '../../components/PointsModal';
import PhoneModal from '../../components/PhoneModal';



function Employee() {
  const [socket, isConnected] = useSocket();
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadingText, setLoadingText] = useState("連線中...");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("0");
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

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
      toast.success(record.phone + '\nPOINTS ADDED:' + record.point + '\nTOTAL POINTS:' + record.totalPoint, { duration: 3000 });
    }

    const handleConsumePoints = (record) => {
      console.log("handleConsumePoints", record);
      toast.success(record.phone + '\nPOINTS CONSUMED:' + record.point + '\nTOTAL POINTS:' + record.totalPoint, { duration: 3000 });
    }

    if (socket) {
      socket.on('server.clientsUpdate', checkAndSetOverlay);
      socket.on('customer.confirmPhone', handlePhoneChange);
      socket.on('server.addRecord', handleAddRecord);
      socket.on('server.consumePoints', handleConsumePoints);

      return () => {
        // when unmount, remove event listener
        socket.off('server.clientsUpdate', checkAndSetOverlay);
        socket.off('customer.confirmPhone', handlePhoneChange);
        socket.off('server.addRecord', handleAddRecord);
        socket.off('server.consumePoints', handleConsumePoints);
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
  }

  const handleSend = () => {
    postJsonData('/Record/add', { phone: phone, amount: amount })
      .then(data => {
        console.log("addRecord:", data);
        setAmount("0");
        setPhone("");
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleOpenPointsModal = () => {
    setShowPointsModal(true);
  };

  const handleClosePointsModal = () => {
    setShowPointsModal(false);
  };

  const handleOpenPhoneModal = () => {
    setShowPhoneModal(true);
  };

  const handleClosePhoneModal = () => {
    setShowPhoneModal(false);
  };

  const handlePhoneClear = () => {
    setPhone("");
  }

  const handleAmountClear = () => {
    setAmount("0");
  }

  return (
    <div className='d-flex flex-wrap flex-column align-items-center'>
      <Overlay show={showOverlay}>
        <Loading loadingText={loadingText} />
      </Overlay>
      <PhoneNumber phoneNumber={phone} handleClear={handlePhoneClear} />
      <CheckoutAmount amount={amount} handleClear={handleAmountClear} />
      <MoneyPad handleAmountChange={handleAmountChange} />
      <div>
        <button
          type="button"
          onClick={handleConfirmAmount}
          className="btn btn-success m-3 btn-lg"
          disabled={amount === "0"}>
          確認金額
        </button>
        <button
          type="button"
          onClick={handleSend}
          className="btn btn-success m-3 btn-lg"
          disabled={phone === "" || amount === "0"}>
          送出
        </button>
      </div>

      <button type="button" className="btn btn-secondary m-3" onClick={handleOpenPointsModal} disabled={phone === ""}>使用點數</button>
      <button type="button" className="btn btn-secondary m-3" onClick={handleOpenPhoneModal}>輸入電話</button>

      <PointsModal
        show={showPointsModal}
        handleClose={handleClosePointsModal}
        phone={phone}
      />
      <PhoneModal
        show={showPhoneModal}
        handleClose={handleClosePhoneModal}
        setPhone={setPhone}
      />
      <Toaster
        position="top-center"
      />

    </div>
  );
}

export default Employee;
