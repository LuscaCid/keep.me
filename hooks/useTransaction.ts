import { Transaction } from "@/@types/Transaction";
import { api } from "@/utils/api"
import { useCallback } from "react"

export function useTransaction (){ 
  const BASE_PATH = "transactions";
  
  const getTransactions = useCallback(async (page : number) => {
    const queryParams = new URLSearchParams();

    queryParams.append("_page", page.toString());
    queryParams.append("_limit", "5");

    const response = await api.get(`${BASE_PATH}/`, { params : queryParams });
    return response.data;
  }, [])

  const postTransaction = useCallback(async(data : Transaction) => {
    const response = await api.post(`${BASE_PATH}/`, { data });
    return response.data
  }, []);

  const putTransaction = useCallback(async(data : Transaction) => {
    const response = await api.put(`${BASE_PATH}/`, { data });
    return response.data
  }, [])
  
  return {
    postTransaction,
    getTransactions,
    putTransaction
  }
}