"use server";
import { IProduct } from "@/interfaces";

export const getAllProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });
    const products: IProduct[] = await res.json();
    return {
      success: true,
      message: "Products fetched successfully",
      data: products,
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
