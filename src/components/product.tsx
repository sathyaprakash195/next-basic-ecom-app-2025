"use client";
import { IProduct } from "@/interfaces";
import React from "react";
import { Button } from "./ui/button";
import { Check, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useCartStore, { ICartStore } from "@/global-store/cart-store";
import toast from "react-hot-toast";

function Product({ product }: { product: IProduct }) {
  const router = useRouter();
  const { addToCart, cartItems }: ICartStore = useCartStore() as ICartStore;

  const addItemToCartHandler = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success("Product added to cart");
  };

  const isInCart = cartItems.find((item) => item.id === product.id);

  return (
    <div
      className="flex flex-col gap-2 p-3 border rounded border-gray-300"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain"
      />
      <h2 className="font-semibold text-sm text-gray-700 line-clamp-1 mt-3">
        {product.title}
      </h2>
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg text-green-700">
          ${product.price}
        </span>
        <Button
          onClick={(e) => {
            addItemToCartHandler();
            e.stopPropagation();
          }}
          disabled={isInCart ? true : false}
        >
          {!isInCart ? (
            <Plus className="w-4 h-4" />
          ) : (
            <Check className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default Product;
