import axios from "axios";

export const apiConsultCnpj = axios.create({
  baseURL: 'https://www.receitaws.com.br/v1/cnpj/'
})