import axios from 'axios';

//A url do meu serviço.
export const api = axios.create({
  baseURL: 'http://localhost:3333'
})