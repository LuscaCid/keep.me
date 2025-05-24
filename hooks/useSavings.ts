import { Saving } from "@/@types/Saving";
import { api } from "@/utils/api";
import { useCallback } from "react"

export function useSaving () {
  const BASE_PATH = "savings";

  const getSavings = useCallback(async (page : number) => {
    const queryParams = new URLSearchParams();

    queryParams.append("_page", page.toString());
    queryParams.append("_limit", "5");

    const response = await api.get(`${BASE_PATH}/`, { params : queryParams });
    return response.data;
  }, [])

  const postSaving = useCallback(async(data : Saving) => {
    const response = await api.post(`${BASE_PATH}/`, { data });
    return response.data
  }, []);

  const putSaving = useCallback(async(data : Saving) => {
    const response = await api.put(`${BASE_PATH}/`, { data });
    return response.data
  }, [])
  
  return {
    getSavings,
    putSaving,
    postSaving
  }
}