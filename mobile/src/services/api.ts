import axios from "axios";


export const api = axios.create({
  // baseURL: 'http://localhost:3333'
  baseURL: 'http://10.0.0.72:3333'
})