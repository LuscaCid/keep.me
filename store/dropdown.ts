import { create } from "zustand";

interface Context {
  isOpen : boolean;
  setIsOpen : (isOpen : boolean) => void;
}
export const useDropdow = create<Context>((set) => ({
  isOpen : false,
  setIsOpen : (isOpen) => set({ isOpen })
}));