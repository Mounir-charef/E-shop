import { useEffect, useState} from 'react';
import axiosInstance from '../axios';
const useFetchData = ({url}) => {
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
        next: null,
        previous: null
    }),
        search = new URLSearchParams(window.location.search).get('search');

    const getNextPage = async (e) => {
        const url = e.target.name === "next" ? appState.next : appState.previous;
        axiosInstance.get(url).then((res) => {
            const data = res.data;
            setAppState({ loading: false, posts: data.results, next: data.next, previous: data.previous});
        });
    }

    useEffect(() => {
        axiosInstance.get('http://localhost:8000/api/ecom/products/',{
            params: {
                search: search
            }
        }).then((res) => {
                const data = res.data;
                setAppState({ loading: false, posts: data.results, next: data.next, previous: data.previous});
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return [appState, getNextPage];
};

export default useFetchData;
