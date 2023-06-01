import Order from "./Order";
const Orders = ({ orders, refresh }) => {
    if(!orders.length) return <h1 className="text-2xl text-center animate-bounce">You have no orders.. YET!! 💢🍳</h1>
    return (
            <ul className="flex flex-col gap-4 items-center">
                {orders.map((order) => (
                    <Order key={order.id} order={order} refresh={refresh}/>
                ))}
            </ul>
    );
}

export default Orders;