import {useState, useEffect, useContext} from 'react';
import Orders from "../components/Orders.jsx";
import componentLoading from "../components/ComponentLoading.jsx";
import ErrorHandler from "../components/ErrorHandeler.jsx";
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

    if (appState.error) return <ErrorHandler retry={refresh} loading={appState.loading} />;
    return (
        <>
            <div>
                <div className='w-3/5 bg-gray-300 mx-auto mt-12 rounded p-12'>
                    <h1 className='text-center font-semibold font-Pacifico text-5xl'>Profile</h1>
                    <div className='p-6'>
                        <div className="flex flex-col gap-2 items-center">
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
                                    <p className="text-lg font-semibold">{user.user_name}</p>
                                    <p className="text-lg font-semibold">{user.email}</p>
                                    <p className="text-lg font-semibold">Your Balance: {user.balance}$</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className=' w-[90%] lg:w-3/5 bg-gray-300 mx-auto my-12 rounded p-6 md:p-12'>
                <h1 className='text-center font-semibold font-Pacifico text-5xl'>Orders</h1>
                <div className='flex flex-col p-6'>
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
                    <OrderLoadingComponent isLoading={appState.loading} orders={appState.orders}/>
                </div>
            </div>
        </>
    );
};

export default Profile;
