"use client";
import Spinner from "@/components/spinner";
import useAuthStore, { IAuthStore } from "@/global-store/users-store";
import { IOrder } from "@/interfaces";
import { getOrdersOfUser } from "@/server-actions/orders";
import dayjs from "dayjs";
import React, { useEffect } from "react";

function OrdersPage() {
  const { user }: IAuthStore = useAuthStore() as IAuthStore;
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await getOrdersOfUser(user!._id!);
    setLoading(false);
    if (res.success) {
      setOrders(res.data!);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  const renderOrderProperty = (label: string, value: string) => (
    <div>
      <h1 className="text-xs text-gray-600">{label}</h1>
      <h2 className="font-semibold text-sm text-gray-800">{value}</h2>
    </div>
  );

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      {loading && (
        <div className="mt-40 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="text-center text-gray-500">No orders found</div>
      )}

      {orders.length > 0 && (
        <div className="flex flex-col gap-7 mt-5">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="p-5 border border-gray-300 rounded flex flex-col gap-7"
            >
              <div className="grid grid-cols-4">
                {renderOrderProperty("Order ID", order._id)}

                {renderOrderProperty(
                  "Order Placed At",
                  dayjs(order.createdAt).format("DD MMM YYYY, hh:mm A")
                )}

                {renderOrderProperty("Total Amount", `₹${order.totalAmount}`)}
                {renderOrderProperty("Status", order.status)}
              </div>

              <h1 className="text-sm font-semibold">Order Items</h1>

              <div className="flex flex-col gap-3">
                {order.items.map((item: any) => (
                  <div key={item.id}>
                    <h1 className="text-xs text-gray-600">
                      {item.title} ({item.quantity}) - $
                      {item.price * item.quantity}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
