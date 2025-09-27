import { IProduct } from "@/interfaces";
import { create } from "zustand";

const useCartStore = create((set, get: any) => ({
  cartItems: [],
  addToCart: (payload: IProduct) =>
    set({ cartItems: [...get().cartItems, payload] }),
  increaseItemQuantity: (productId: number) => {
    const updatedCart = get().cartItems.map((item: IProduct) => {
      if (item.id === productId) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    set({ cartItems: updatedCart });
  },

  decreaseItemQuantity: (productId: number) => {
    const updatedCart = get().cartItems.map((item: IProduct) => {
      if (item.id === productId && (item.quantity || 1) > 1) {
        return { ...item, quantity: (item.quantity || 1) - 1 };
      }
      return item;
    });
    set({ cartItems: updatedCart });
  },

  removeFromCart: (productId: number) => {
    const updatedCart = get().cartItems.filter(
      (item: IProduct) => item.id !== productId
    );
    set({ cartItems: updatedCart });
  },
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
export interface ICartStore {
  cartItems: IProduct[];
  addToCart: (payload: IProduct) => void;
  increaseItemQuantity: (productId: number) => void;
  decreaseItemQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}
