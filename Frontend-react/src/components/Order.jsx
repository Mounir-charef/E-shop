const Order = ({ order }) => {
  return (
    <div className="border rounded-md p-4 mb-4">
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold text-lg">{order.product_name}</h2>
        <p className="text-gray-600">{order.created_at}</p>
      </div>
      <div className="flex justify-between">
        <p>Order ID:</p>
        <p className="font-semibold">{order.id}</p>
      </div>
      <div className="flex justify-between">
        <p>Quantity:</p>
        <p className="font-semibold">{order.quantity}</p>
      </div>
      <div className="flex justify-between">
        <p>Total Price:</p>
        <p className="font-semibold">${order.total_price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Order;
