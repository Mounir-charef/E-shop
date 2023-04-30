import {useEffect, useState} from "react";
import { XCircleIcon } from "@heroicons/react/24/outline/index.js";
import DeleteOrder from "./DeleteOrder.jsx";
const Order = ({ order, refresh }) => {
    const [showDeleteOrderWindow, setShowDeleteOrderWindow] = useState(false);
    const date = new Date(order.created_at).toDateString();

    useEffect(() => {
        document.body.className = showDeleteOrderWindow ? 'overflow-hidden' : null;
    }, [showDeleteOrderWindow]);

  return (
      <>
          {showDeleteOrderWindow && <DeleteOrder setShow={setShowDeleteOrderWindow} orderId={order.id} refresh={refresh}/>}
          <div className="border rounded-md p-4 w-[90%] text-center md:text-start relative">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                  <img
                    src={order.product_image}
                    alt={order.product_name}
                    className="h-20 w-20 self-center rounded-md mr-4 object-cover"
                  />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg text-center md:text-start max-w-xl">{order.product_name}</h2>
                  <p className="text-gray-600">{date}</p>
                </div>
                <div className='absolute right-2 top-2'>
                    <button onClick={() => setShowDeleteOrderWindow(true)}>
                        <XCircleIcon className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer" />
                    </button>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="sm:w-1/4">Prix unitaire :</p>
                <p className="font-semibold">{order.product_price} €</p>
              </div>
              <div className="flex justify-between">
                <p className="sm:w-1/4">Quantité :</p>
                <p className="font-semibold">{order.quantity}</p>
              </div>
              <div className="flex justify-between">
                <p className="sm:w-1/4">Prix total :</p>
                <p className="font-semibold">{order.total_price} €</p>
              </div>
          </div>
      </>
  );
};

export default Order;
