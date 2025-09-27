"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCartStore, { ICartStore } from "@/global-store/cart-store";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { placeOrder } from "@/server-actions/orders";
import useAuthStore, { IAuthStore } from "@/global-store/users-store";
import { useRouter } from "next/navigation";

function CartPage() {
  const {
    cartItems,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore() as ICartStore;

  const [loading, setLoading] = React.useState(false);
  const { user } = useAuthStore() as IAuthStore;
  const router = useRouter();

  const increaseHandler = (productId: number, currentQuantity: number) => {
    increaseItemQuantity(productId);
  };

  const decreaseHandler = (productId: number, currentQuantity: number) => {
    if (currentQuantity === 1) {
      // remove from cart
      removeFromCart(productId);
    } else {
      decreaseItemQuantity(productId);
    }
  };

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const response = await placeOrder({
        user: user?._id,
        items: cartItems,
        totalAmount: cartItems.reduce(
          (acc, item) => acc + item.price * (item.quantity || 1),
          0
        ),
        status: "order_placed",
      });
      if (response.success) {
        toast.success("Order placed successfully");
        clearCart();
        router.push("/orders");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Cart </h1>

      {cartItems.length === 0 && (
        <div className="mt-4 text-gray-600">No items in the cart</div>
      )}

      {cartItems.length > 0 && (
        <div>
          <Table className="mt-4">
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead className="font-bold">Product</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Quantity</TableHead>
                <TableHead className="font-bold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.title}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    {" "}
                    <div className="flex gap-3 p-2 items-center">
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        onClick={() =>
                          decreaseHandler(item.id, item.quantity || 1)
                        }
                      >
                        <Minus size={14} />
                      </Button>
                      {item?.quantity || 1}
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        onClick={() =>
                          increaseHandler(item.id, item.quantity || 1)
                        }
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {`$${(item.price * (item?.quantity || 1)).toFixed(2)}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="text-center">
            <h1 className="text-lg font-bold mt-4">
              Total :{" "}
              {`$${cartItems
                .reduce(
                  (acc, item) => acc + item.price * (item.quantity || 1),
                  0
                )
                .toFixed(2)}`}
            </h1>
          </div>

          <div className="mt-4 flex items-center justify-center gap-5">
            <Button onClick={clearCart} variant={"outline"}>
              Clear Cart
            </Button>
            <Button onClick={placeOrderHandler} disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
