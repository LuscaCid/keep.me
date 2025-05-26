import { create } from "zustand";
export interface Storage {
  value : string;
  from : string;
  day : string;
}
interface Context {
  storages : Storage[]
  setStorages : (storages : Storage[]) => void;
}
export const useReceiptsBarData = create<Context>((set) => ({
  storages : [],
  setStorages : (storages) => set({ storages })
}));