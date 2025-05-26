import { Transaction } from "@/@types/Transaction";
import { api } from "@/utils/api"
import { useCallback } from "react"
import { SectionList, SectionListData } from "react-native";

export function useTransaction() {
  const BASE_PATH = "transactions";

  const getDefaultQueryParams = useCallback((page?: number) => {
    const queryParams = new URLSearchParams();

    queryParams.append("_page", String(page) ?? "1");
    queryParams.append("_limit", "5");

    return queryParams;
  }, []);

  const getTransactionsEarnings = useCallback(async () => {
    const queryParams = getDefaultQueryParams();
    queryParams.append("type", "income");

    const response = await api.get(BASE_PATH, { params: queryParams });
    return response.data
  }, [getDefaultQueryParams])
  
  const getTransactionsGroupedByDate = useCallback(async(page: number) => {
    const queryParams = getDefaultQueryParams(page);
    const response = await api.get("transaction-group", { params: queryParams });
    return response.data as SectionListData<Transaction>;
  }, [getDefaultQueryParams]);

  const getTransactions = useCallback(async (page: number) => {
    const queryParams = getDefaultQueryParams(page);

    try {
      const response = await api.get(`${BASE_PATH}/`, { params: queryParams });
      return response.data as Transaction[];
    } catch (err: unknown) {
      console.log(err);
    }

  }, [getDefaultQueryParams])

  const postTransaction = useCallback(async (data: Transaction) => {
    const response = await api.post(`${BASE_PATH}/`, { data });
    return response.data
  }, []);

  const putTransaction = useCallback(async (data: Transaction) => {
    const response = await api.put(`${BASE_PATH}/`, { data });
    return response.data
  }, [])

  return {
    getTransactionsGroupedByDate,
    getTransactionsEarnings,
    postTransaction,
    getTransactions,
    putTransaction
  }
}