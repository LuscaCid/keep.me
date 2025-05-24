import { User } from "@/@types/User";
import { create } from "zustand";

interface UserContext {
  user? : User;
  setUser : (newUser? : User) => void;
}
export const useUser = create<UserContext>((set) => ({
  user : undefined, 
  setUser: (user) => set({ user })
}));