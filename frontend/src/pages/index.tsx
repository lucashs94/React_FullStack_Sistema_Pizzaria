import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../../styles/home.module.scss'

import useAuthContext from '@/contexts/AuthContext'

import { Input } from '@/components/UI/Input'
import Button from '@/components/UI/Button'
import { toast } from 'react-toastify'
import { SSRGuest } from '@/utils/SSRGuest'
import Logo from '@/components/Logo'

//TODO: Gerenciamento de Usuarios
//TODO: Gerenciamento de Produtos criado
//TODO: Gerenciamento de Categorias criadas
//TODO: Melhorar Status dos pedidos (solicitado, em andamento, concluido na cozinha)
//TODO: Logs das ações no sistema
//TODO: Refresh Token e controle de sessão
//TODO: Melhorar tela de detalhes do pedido
//TODO: Melhorar tela de dashboard com filtros e visualização com status 
//      (cards resumo e listagem abaixo como tabela)

export default function Home() {

  const { signIn } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  async function handleLogin(e: FormEvent){
    e.preventDefault()

    if(email === '' || password === '') {
      toast.warning("Preencha todos os campos!")  
      return
    }

    setLoading(true)

    await signIn({ email, password })

    setLoading(false)
  }


  return (
    <>
      <Head>
        <title>appPizzaria - Faça o login!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Logo destination='/' size={55} />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
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
              Acessar
            </Button>

          </form>

          <Link href='/signup' legacyBehavior>
            <a className={styles.text}>
              Não possui uma conta? Cadastre-se
            </a>
          </Link>
          
        </div>
      </div>
    </>
  )
}



export const getServerSideProps = SSRGuest(async (ctx) => {
  return{
    props:{}
  }
})