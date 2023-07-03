import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from "../services/api";

interface AuthData{
  user: UserProps
  signed: boolean
  loading: boolean
  loadingAuth: boolean
  AuthSignIn: (email: string, password: string) => Promise<void>
  AuthSignOut: () => void
}

type UserProps = {
  id: string
  name: string
  email: string
  token: string
}

type AuthProviderProps ={
  children: ReactNode
}


export const AuthContext = createContext({} as AuthData)


export function AuthProvider({ children }: AuthProviderProps){

  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: '',
  })

  const [loading, setLoading] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)


  useEffect(() => {

    async function getUser(){
      const user = await AsyncStorage.getItem('@user_pizza')
      let hasUser: UserProps = JSON.parse(user || '{}')

      if(Object.keys(hasUser).length > 0){
        api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        })
      }
      setLoading(false)
    }
    getUser()

  }, [])


  async function AuthSignIn(email: string, password: string){
    setLoadingAuth(true)

    try {
      const response = await api.post('/session', {
        email,
        password
      })

      const { id, name, token } = response.data

      await AsyncStorage.setItem('@user_pizza', JSON.stringify(response.data))
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser({
        id,
        name,
        email,
        token,
      })

      setLoadingAuth(false)
      

    } catch (error) {
      console.log(error)
      setLoadingAuth(false)
    }
  }
 

  async function AuthSignOut(){
    await AsyncStorage.clear()
    .then(()=>{
      setUser({
        id: '',
        name: '',
        email:'',
        token:'',
      })
    })
    .catch(error => console.log(error))
  }


  return(
    <AuthContext.Provider
      value={{
        signed: !!user.id,
        user,
        loading,
        loadingAuth,
        AuthSignIn,
        AuthSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export default function useAuthContext(){
  return(
    useContext(AuthContext)
  )
}