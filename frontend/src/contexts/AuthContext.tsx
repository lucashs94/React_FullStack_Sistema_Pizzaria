import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
  user?: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: SignUpProps) => Promise<void>
}
type UserProps = {
  id: string
  name: string
  email: string
}
type SignInProps = {
  email: string
  password: string
}
type SignUpProps = {
  name: string
  email: string
  password: string
}
type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try {
    destroyCookie(undefined, '@appToken')
    Router.push('/')
  } catch (error) {
    console.log('erro ao deslogar', error)
  }
}

export function AuthProvider({children}: AuthProviderProps){

  const [user, setUser]  = useState<UserProps>()
  const isAuthenticated = !!user


  useEffect(() => {
    const { '@appToken': token } = parseCookies()

    if(token){
      api.get('/me')
      .then( response => {
        const { id, name, email } = response.data
        setUser({ id, name, email })
      })
      .catch(error => { signOut() })
    }
  }, [])


  async function signIn({ email, password }: SignInProps){
    try {
      const response = await api.post('/session', {
        email,
        password,
      })

      const {id, name, token } = response.data
      
      setCookie(undefined, '@appToken', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setUser({
        id,
        name,
        email,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`
      toast.success("Logado com sucesso!")
      Router.push('/dashboard')

    } catch (error) {
      toast.error("Erro ao acessar!")
      console.log('erro =>  ',error)
    }
  }


  async function signUp({name, email, password}: SignUpProps){
    try {
      const response = await api.post('/users', {
        name,
        email,
        password,
      })

      
      toast.success("Cadastrado com sucesso!")
      Router.push('/')

    } catch (error) {
      toast.error("Erro ao cadastrar!")
      console.log('erro =>  ',error)
    }
  }


  return(
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext(){
  return useContext(AuthContext)
}