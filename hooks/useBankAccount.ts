import { BankAccountDto } from "@/@types/BankAccount";
import { api } from "@/utils/api";
import { AxiosError } from "axios";
import { useCallback } from "react";

export function useBankAccount() {
  const BASE_PATH = "bankAccounts";

  const getBankAccounts = useCallback(async (page?: number) => {
    const queryParams = new URLSearchParams();

    queryParams.append("_page", (page ?? "1").toString());
    page && queryParams.append("_limit", "10");

    const response = await api.get(`${BASE_PATH}/`, { params: queryParams });
    return response.data as BankAccountDto[];
    }, [])

  const postBankAccount = useCallback(async (data: BankAccountDto) => {
    const response = await api.post(`${BASE_PATH}/`, { data });
    return response.data
  }, []);

  const putBankAccount = useCallback(async (data: BankAccountDto) => {
    const response = await api.put(`${BASE_PATH}/`, { data });
    return response.data
  }, [])

  return {
    getBankAccounts,
    putBankAccount,
    postBankAccount
  }
}