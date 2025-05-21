import { api } from "@/utils/api";
import { useCallback } from "react";

export function useCreditCard () {
  const BASE_PATH = "credit-card";

  const getCreditCards = useCallback(async() => {
    const response = await api.get(`${BASE_PATH}/`);
    return response.data;
  }, []);

  return {
    getCreditCards
  }
}