import { create } from "zustand";
interface User {
  name : string;
  email : string;
  password: string;
  id : number;
  photoUrl? : string;
}
interface UserContext {
  user? : User;
  setUser : (newUser? : User) => void;
}
export const useUser = create<UserContext>((set) => ({
  user : undefined, 
  setUser: (user) => set({ user })
}));