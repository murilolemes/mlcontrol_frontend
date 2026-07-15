import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

export const apiCep = axios.create({
  baseURL: 'https://viacep.com.br/ws'
})