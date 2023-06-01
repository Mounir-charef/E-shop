import axiosInstance from "../axios.js";
import {useState, useContext, useEffect} from "react";
import { XCircleIcon } from "@heroicons/react/24/outline/index.js";
import AuthContext from "../AuthContext.jsx";

const DeleteOrder = ({ setShow, orderId, refresh }) => {
  const [error, setError] = useState("");
    const { baseUrl } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`${baseUrl}api/orders/${orderId}/`);
      refresh();
      setShow(false);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
       document.body.className = 'overflow-hidden';
         return () => {
                document.body.classList.remove('overflow-hidden');
         }
    });

  return (
    <div
      className='fixed inset-0 bg-gray-900 bg-opacity-50 z-50'
    >
      <div className="w-full max-w-md bg-white rounded-md mt-[40vh] mx-auto mt-20 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Delete Order</h3>
          <button onClick={() => setShow(false)}>
            <XCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to cancel this order?
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="ml-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrder;
