"use server";
import { IOrder } from "@/interfaces";

import OrderModel from "@/models/order-model";

export const placeOrder = async (orderData: Partial<IOrder>) => {
  try {
    await OrderModel.create(orderData);
    return { success: true, message: "Order placed successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getOrdersOfUser = async (userId: string) => {
  try {
    const orders = await OrderModel.find({ user: userId });

    return {
      success: true,
      message: "Orders fetched successfully",
      data: JSON.parse(JSON.stringify(orders)),
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
