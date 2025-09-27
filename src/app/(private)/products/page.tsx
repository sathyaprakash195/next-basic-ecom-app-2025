import Product from "@/components/product";
import { IUser } from "@/interfaces";
import { getAllProducts } from "@/server-actions/products";
import { getLoggedInUser } from "@/server-actions/users";
import React from "react";

async function ProductsPage() {
  let products = [];
  const productsResponse = await getAllProducts();
  if (!productsResponse.success) {
    products = [];
  }
  products = productsResponse.data || [];
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Available Products</h1>

      <div className="grid lg:grid-cols-4 gap-5 mt-5 md:grid-cols-2 grid-cols-1">
        {products.map((product: any) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
