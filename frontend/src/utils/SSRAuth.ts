import { AuthTokenError } from "@/services/errors/AuthTokenError";
import { 
  GetServerSideProps, 
  GetServerSidePropsContext, 
  GetServerSidePropsResult 
} from "next";
import { redirect } from "next/dist/server/api-utils";
import { parseCookies, destroyCookie } from "nookies";


 export function SSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    
    const cookies = parseCookies(ctx)

    const token = cookies['@appToken']

    if(!token){
      return{
        redirect:{
          destination: '/',
          permanent: false,
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (error) {
      if(error instanceof AuthTokenError){
        destroyCookie(ctx, '@appToken')

        return{
          redirect:{
            destination: '/',
            permanent: false,
          }
        }
      }
    }
    return await fn(ctx)
  }
 }