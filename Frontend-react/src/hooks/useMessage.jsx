import { useState } from 'react';

export const useMessage = (duration) => {
  const defaultMsg = {
    text: null,
    type: null,
  }
  const [message, setMessage] = useState(defaultMsg);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(defaultMsg);
    }, duration);
  };

  return { message, showMessage };
};