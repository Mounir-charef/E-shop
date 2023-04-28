const Order = ({ order }) => {
    const date = new Date(order.created_at).toDateString();
  return (
    <div className="border rounded-md p-4 w-[90%] text-center md:text-start">
      <div className="flex flex-col sm:flex-row justify-between mb-2">
          <img
            src={order.product_image}
            alt={order.product_name}
            className="h-16 w-16 rounded-md mr-4 object-contain"
          />
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{order.product_name}</h2>
          <p className="text-gray-600">{date}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="sm:w-1/4">Prix unitaire :</p>
        <p className="font-semibold">{order.product_price} €</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="sm:w-1/4">Quantité :</p>
        <p className="font-semibold">{order.quantity}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="sm:w-1/4">Prix total :</p>
        <p className="font-semibold">{order.total_price.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default Order;
