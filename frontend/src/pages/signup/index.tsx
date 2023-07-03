import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../../../styles/home.module.scss'

import { Input } from '@/components/UI/Input'
import Button from '@/components/UI/Button'
import useAuthContext from '@/contexts/AuthContext'
import { toast } from 'react-toastify'
import Logo from '@/components/Logo'

export default function Signup() {

  const { signUp } = useAuthContext()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  async function handleSignUp(e: FormEvent){
    e.preventDefault()

    if(name === ''|| email === ''|| password === '') {
      toast.warning("Preencha todos os campos!")  
      return
    }

    setLoading(true)

    await signUp({name, email, password})

    setLoading(false)
  }


  return (
    <>
      <Head>
        <title>appPizzaria - Cadastre-se!</title>
      </Head>

      <div className={styles.containerCenter}>
        <Logo destination='/' size={55}/>

        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form onSubmit={handleSignUp}>
            <Input 
              placeholder='Digite seu nome'
              type='text'
              value={name}
              onChange={ e => setName(e.target.value) }
            />
            
            <Input 
              placeholder='Digite seu email'
              type='text'
              value={email}
              onChange={ e => setEmail(e.target.value) }
            />
            
            <Input 
              placeholder='Digite sua senha'
              type='password'
              value={password}
              onChange={ e => setPassword(e.target.value) }
            />

            <Button 
              type='submit'
              loading={loading}
            >
              Cadastrar
            </Button>

          </form>

          <Link href='/' legacyBehavior>
            <a className={styles.text}>
              Já possui uma conta? Faça login!
            </a>
          </Link>
          
        </div>
      </div>
    </>
  )
}
