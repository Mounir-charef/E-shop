import axiosInstance from "../axios.js";
import {useState, useContext, useEffect} from "react";
import { XCircleIcon } from "@heroicons/react/24/outline/index.js";
import AuthContext from "../AuthContext.jsx";

const AddBalance = ({ setShow, refresh }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
    const { baseUrl } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount === "") {
      setError("Amount is required.");
      return;
    }
    try {
      await axiosInstance.patch(baseUrl+"api/user/add_balance/", { amount: amount });
      refresh();
      setShow(false);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    if (isNaN(inputAmount)) {
      setError("Amount should be a number.");
    } else {
      setError("");
      setAmount(inputAmount);
    }
  };

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
        document.body.classList.remove('overflow-hidden');
    }
  });

  return (
    <div
      className='fixed w-screen h-screen bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center'
    >
      <div className="w-full max-w-md bg-white rounded-md mx-auto -translate-y-32 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Add Balance</h3>
          <button onClick={() => setShow(false)}>
            <XCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="amount"
                id="amount"
                className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md ${
                  error ? "border-red-500" : ""
                }`}
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="ml-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBalance;
