import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

function Homepage() {
  return (
    <div className="flex flex-col">
      <div className="bg-primary py-5 px-20 flex justify-between items-center">
        <h1 className="uppercase text-2xl font-bold text-white">SheyShop</h1>
        <Button variant={"outline"}>
          <Link href="/login">Login</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-10 h-[85vh] items-center px-20">
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-bold text-primary">
            Welcome to SheyShop
          </h1>
          <p className="text-sm text-gray-600 font-semibold">
            Your one-stop shop for all your needs. Explore our wide range of
            products and enjoy a seamless shopping experience.
          </p>
        </div>

        <div>
          <img
            src={
              "https://png.pngtree.com/png-clipart/20220424/original/pngtree-e-commerce-shopping-business-icon-png-image_7555011.png"
            }
            className="w-full h-96 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
