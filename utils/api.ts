import axios from "axios"
export const api = axios.create({
  baseURL : "http://26.142.88.159:3000/"
})