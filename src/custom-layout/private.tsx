"use client";
import useAuthStore, { IAuthStore } from "@/global-store/users-store";
import { getLoggedInUser } from "@/server-actions/users";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { LogOut, ShoppingCart } from "lucide-react";
import Spinner from "@/components/spinner";
import useCartStore, { ICartStore } from "@/global-store/cart-store";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const { user, setUser }: IAuthStore = useAuthStore() as IAuthStore;
  const { cartItems }: ICartStore = useCartStore() as ICartStore;

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getLoggedInUser();
      if (!response.success) {
        throw new Error(response.message);
      }
      setUser(response.data);
    } catch (error) {
      toast.error((error as Error).message);
      Cookies.remove("token");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    Cookies.remove("token");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  useEffect(() => {
    if (!user) {
      getData();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <div className="p-5 bg-primary flex justify-between items-center">
        <h1
          className="text-2xl text-white font-bold cursor-pointer"
          onClick={() => router.push("/products")}
        >
          SHEYSHOP
        </h1>

        <div className="flex gap-5 items-center">
          <div>
            {cartItems.length > 0 ? (
              <div className="relative" onClick={() => router.push("/cart")}>
                <ShoppingCart className="text-white cursor-pointer" />
                <div className="bg-white w-5 h-5 p-1 rounded-full flex justify-center items-center absolute -top-3 -right-2">
                  {cartItems.length}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <NavigationMenu>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <h1 className="text-sm text-primary">{user?.name}</h1>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[120px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/orders" className="text-black">
                        Orders
                      </Link>
                    </NavigationMenuLink>
                  </li>

                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/profile" className="text-black">
                        Profile
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
          <LogOut
            className="text-white cursor-pointer"
            size={20}
            onClick={logoutHandler}
          />
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PrivateLayout;
