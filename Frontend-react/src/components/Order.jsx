const Order = ({ order }) => {
  return (
    <div className="border rounded-md p-4 mb-4 w-[90%] text-center md:text-start">
      <div className="flex flex-col sm:flex-row justify-between mb-2">
        <h2 className="font-semibold text-lg">{order.product_name}</h2>
        <p className="text-gray-600">{order.created_at}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="sm:w-1/4">Order ID:</p>
        <p className="font-semibold">{order.id}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="sm:w-1/4">Quantity:</p>
        <p className="font-semibold">{order.quantity}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="sm:w-1/4">Total Price:</p>
        <p className="font-semibold">${order.total_price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Order;
