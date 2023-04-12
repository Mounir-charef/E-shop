import { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import AuthContext from '../AuthContext';

const useFetchOrders = ({url}) => {
  const [appState, setAppState] = useState({
    loading: true,
    error: false,
    orders: null,
    next: null,
    previous: null,
  });
  const getNextPage = async (e) => {
    const url = e.target.name === 'next' ? appState.next : appState.previous;
    axiosInstance
      .get(url)
      .then((res) => {
        const data = res.data;
        setAppState({
          loading: false,
          error: false,
          orders: data.results,
          next: data.next,
          previous: data.previous,
        });
      })
      .catch(() => {
        setAppState({
          loading: false,
          error: true,
          orders: null,
          next: null,
          previous: null,
        });
      });
  };

  const getInitialPage = async () => {
    setAppState({
      loading: true,
      error: false,
      orders: null,
      next: null,
      previous: null,
    });
    axiosInstance
      .get(url)
      .then((res) => {
        const data = res.data;
        setAppState({
          loading: false,
          error: false,
          orders: data.results,
          next: data.next,
          previous: data.previous,
        });
      })
      .catch(() => {
        setAppState({
          loading: false,
          error: true,
          orders: null,
          next: null,
          previous: null,
        });
      });
  };

  useEffect(() => {
    getInitialPage().catch((err) => console.log(err));
  }, []);

  return {
    appState,
    getNextPage,
    getInitialPage,
  };
};

export default useFetchOrders;
