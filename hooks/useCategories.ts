import { Category } from "@/@types/Category";
import { api } from "@/utils/api"
import { useCallback } from "react"

export function useCategories() {
  const BASE_PATH = "categories";

  const getUserCategories = useCallback(async () => {
    await new Promise((reject, resolve) => setTimeout(() => resolve, 1000));
    
    const response = await api.get(`${BASE_PATH}`);
    return response.data as Category[] ?? [];
  }, [])
  return {
    getUserCategories
  }
}