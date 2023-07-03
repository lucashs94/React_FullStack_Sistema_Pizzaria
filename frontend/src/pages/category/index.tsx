import React, { FormEvent, useState } from 'react'
import Header from '@/components/Header'
import Head from 'next/head'


import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { api } from '@/services/apiClient'
import { SSRAuth } from '@/utils/SSRAuth'
 

export default function Category() {

  const [category, setCategory] = useState('')


  async function handleRegister(e: FormEvent){
    e.preventDefault()

    if(category === ''){
      toast.warning('Por favor, preencha uma categoria.')
      return
    }

    const response = await api.post('/category', {
      name: category,
    })

    toast.success('Categoria criada com sucesso!!')
    setCategory('')
  }


  return (
    <>
      <Head>
        <title>Categorias - appPizzaria</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar Categoria</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder='Digite o nome da categoria'  
              className={styles.input}
              value={category}
              onChange={ e => setCategory(e.target.value) }
            />

            <button type="submit" className={styles.buttonAdd}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}


export const getServerSideProps = SSRAuth(async (ctx) => {
  return{
    props:{}
  }
})