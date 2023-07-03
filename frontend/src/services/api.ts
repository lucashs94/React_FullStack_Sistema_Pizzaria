import axios, {AxiosError} from "axios";
import { parseCookies } from 'nookies'
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "@/contexts/AuthContext";
import { GetServerSidePropsContext } from "next";


export function setAPIClient(context: GetServerSidePropsContext | null){
  
  let cookies = parseCookies(context)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers:{
      Authorization: `Bearer ${cookies['@appToken']}`
    }
  })

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if(error.response?.status === 401){
      // 401 nao autorizado
      if(typeof window !== undefined){
        signOut()
      }else{
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(error)
  })

  return api
}
