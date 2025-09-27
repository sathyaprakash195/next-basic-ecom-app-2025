import { IUser } from "@/interfaces";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  setUser: (payload: IUser | null) => set({ user: payload }),
}));

export default useAuthStore;

export interface IAuthStore {
  user: IUser | null;
  setUser: (payload: IUser | null) => void;
}
