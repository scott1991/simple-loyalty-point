import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './screen.css';
import PhonePad from './PhonePad';

function PointsModal({ show, handleClose, setPhone}) {
  const modalStyle = {
    backgroundColor: '#242424',
    color: 'white',
    border: '1px solid #ccc',
  };
  

  
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
    <Modal show={show} onHide={handleClose} backdrop={false}
    style={{
      position: "fixed",
      left: "50%",
      top: "80%",
      transform: "translate(-50%, -50%)",
    }}>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title>輸入號碼</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <PhonePad handlePhoneChange={handlePhoneChange} />
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <button type="button" onClick={handleClose} className="btn btn-danger">關閉</button>
      </Modal.Footer>
    </Modal>
  );
}

export default PointsModal;
