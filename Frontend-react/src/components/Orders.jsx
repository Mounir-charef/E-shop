import Order from "./Order";
const Orders = ({ orders }) => {
    if(!orders.length) return <h1 className="text-2xl text-center mt-7">You have no orders yet</h1>
    return (
            <ul className="flex flex-col gap-4 items-center mt-6">
                {orders.map((order) => (
                    <Order key={order.id} order={order}/>
                ))}
            </ul>
    );
}

export default Orders;