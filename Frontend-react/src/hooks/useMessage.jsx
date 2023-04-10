import { useState, useEffect } from 'react';

export const useMessage = (duration) => {
  const [message, setMessage] = useState(null);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  return { message, showMessage };
};