import {useState, useEffect, useContext} from 'react';
import Orders from "../components/Orders.jsx";
import componentLoading from "../components/ComponentLoading.jsx";
import ErrorHandler from "../components/ErrorHandeler.jsx";
import AddBalance from "../components/AddBalance.jsx";
import axiosInstance from "../axios.js";
import AuthContext from "../AuthContext.jsx";
import useFetchOrders from "../hooks/useFetchOrders.jsx";
import 'react-loading-skeleton/dist/skeleton.css'
import {Rings} from "react-loader-spinner";

const Profile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const {baseUrl} = useContext(AuthContext);
    const OrderLoadingComponent = componentLoading(Orders);
    const {appState, getNextPage, getInitialPage} = useFetchOrders({url: baseUrl + 'api/orders/'});
    const [showBalanceWindow, setShowBalanceWindow] = useState(false);

    const getUser = async () => {
            const res = await axiosInstance.get(baseUrl + 'api/user');
            setUser(res.data);
            setLoading(false);
        }

    const refresh = async () => {
        setLoading(true)
         getUser().then(() => setLoading(false));
         getInitialPage().catch((err) => {
            console.log(err);
         });
    }


    useEffect(() => {

        getUser().catch((err) => {
            console.log(err);
        });

    }, []);

    if (appState.error) return <ErrorHandler retry={refresh}/>;
    return (
        <>
            {showBalanceWindow && <AddBalance setShow={setShowBalanceWindow} refresh={refresh}/>}
            <div className='bg-gradient-to-bl min-h-[calc(100vh-5rem)] px-12 flex flex-col  lg:justify-between lg:flex-row from-[#afd9d8] to-sky-100 py-12 lg:px-32'>

                <div className='w-fit h-fit self-start mb-12 rounded-md lg:sticky lg:top-24'>
                        <div>
                            <div className="flex flex-col gap-2  whitespace-nowrap w-full justify-center p-2">
                                {loading ? (
                                    <>
                                        <Rings
                                          height="100"
                                          width="100"
                                          color="#38bdf8"
                                          radius="6"
                                          visible={true}
                                          ariaLabel="rings-loading"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className="flex gap-3 items-end">
                                            <img className='w-10 h-10 rounded-full ring-2 ring-sky-300' src={user.image_url} alt='profil' />
                                            <p className="text-lg font-semibold">{user.user_name}</p>
                                        </div>
                                        <p className="text-lg font-semibold">Email : {user.email}</p>
                                        <p className="text-lg font-semibold">Balance : {user.balance}$</p>
                                        <button
                                            className="active-btn rounded w-fit mt-2"
                                            onClick={() => setShowBalanceWindow(true)}
                                        >
                                            Add Balance
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                </div>
                <div className={`basis-2/3 grow lg:grow-0 bg-white shadow-2xl rounded p-6 ${!appState.orders?.length ? 'grid place-items-center' : null}`}>
                    {appState.orders?.length ? (
                        <>
                            <h1 className='text-center font-semibold text-5xl'>Orders</h1>
                            <div className='flex flex-col p-6 pb-0 gap-8'>
                                <div className="flex justify-between items-center">
                                    <button
                                        className={
                                            appState.previous !== null ? "active-btn" :
                                                "disabled-btn"
                                        }
                                        onClick={getNextPage}
                                        name='prev'
                                        disabled={appState.previous === null}
                                    >
                                        Previous Page
                                    </button>
                                    <button
                                        className={
                                            appState.next !== null ? "active-btn" :
                                                "disabled-btn"
                                        }
                                        onClick={getNextPage}
                                        name='next'
                                        disabled={appState.next === null}

                                    >
                                        Next Page
                                    </button>
                                </div>
                                <OrderLoadingComponent isLoading={appState.loading} orders={appState.orders} refresh={refresh}/>
                                <div className="flex justify-between items-center">
                                    <button
                                        className={
                                            appState.previous !== null ? "active-btn" :
                                                "disabled-btn"
                                        }
                                        onClick={getNextPage}
                                        name='prev'
                                        disabled={appState.previous === null}
                                    >
                                        Previous Page
                                    </button>
                                    <button
                                        className={
                                            appState.next !== null ? "active-btn" :
                                                "disabled-btn"
                                        }
                                        onClick={getNextPage}
                                        name='next'
                                        disabled={appState.next === null}

                                    >
                                        Next Page
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : <OrderLoadingComponent isLoading={appState.loading} orders={appState.orders} refresh={refresh}/>}
                </div>
            </div>
        </>
    );
};

export default Profile;
