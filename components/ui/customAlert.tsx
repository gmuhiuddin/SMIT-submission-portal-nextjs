import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

interface CustomAlertInterface {
  txt: string;
  isErrMsg: boolean;
}

const CustomAlert: React.FC<CustomAlertInterface> = ({ txt, isErrMsg }) => {

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeout: any;

    if (visible) {
      timeout = setTimeout(() => {
        setVisible(false);
      }, 3000); // 3 seconds
    }

    return () => clearTimeout(timeout);
  }, [visible]);

  return (
    <div style={{
      backgroundColor: "white",
      color: 'black',
      padding: '10px',
      borderRadius: '5px',
      display: "flex",
      alignItems: "center",
      position: 'fixed',
      boxShadow: "0px 0px 5px gray",
      bottom: '20px',
      right: '20px',
      fontSize: "1em",
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      {isErrMsg ? <FaExclamationTriangle /> : <FaCheckCircle />} {txt}
    </div>
  );
};

export default CustomAlert;