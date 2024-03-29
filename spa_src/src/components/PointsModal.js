import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import MoneyPad from './MoneyPad';
import './screen.css';
import { getJsonData, postJsonData } from '../serverRequests'

function PointsModal({ show, handleClose, phone }) {
  const modalStyle = {
    backgroundColor: '#242424',
    color: 'white',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    border: '1px solid #ccc',
  };
  
  
  const [point, setPoint] = useState('0');
  const [currentPoints, setCurrentPoints] = useState(0);

  // use getJsonDate to rewite handleGetPoints
  const handleGetPoints = () => {
    // GET /getPoints/{phone} to get user points by phone
    getJsonData('/getPoints/' + phone)
      .then(data => {
        setCurrentPoints(data.totalPoint);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (show) {
      setPoint('0')
      handleGetPoints();
    }
  }, [show]);

  const handleInputChange = (input) => {
    // if input's first chat is '0' remove the '0' and setPoints
    // if input is a empty string setPoints to 0    
    // else setPoints to input    
    if (input[0] === '0') {
      setPoint(input.slice(1));
    } else if (input === '') {
      setPoint(0);
    } else {
      setPoint(input);
    }
  };

  const handlePadClick = (input) => {
    setPoint((prevData) => {
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

  const handleConfirm = () => {
    // POST /usePoints to use points
    postJsonData('/Record/consumePoints',{"phone": phone, "point": point})
      .then(data => {
        console.log('consumePoints',data);
        //setPoint(data.point);
        handleClose();// Close the modal after successful submission
      }).catch(err => {
        console.error(err);
      })
    
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title>目前點數:{currentPoints}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <div className='screen'>
          <label>
            輸入使用點數：
            <input type="number" className='digit' value={point} onChange={e => handleInputChange(e.target.value)} />
          </label>
        </div>
        <MoneyPad handleAmountChange={handlePadClick} />
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <button type="button" onClick={handleConfirm} className="btn btn-success">確認扣點</button>
        <button type="button" onClick={handleClose} className="btn btn-danger">取消關閉</button>
      </Modal.Footer>
    </Modal>
  );
}

export default PointsModal;
