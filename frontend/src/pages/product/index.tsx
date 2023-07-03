import React, { ChangeEvent, FormEvent, SelectHTMLAttributes, useState } from 'react'
import Header from '@/components/Header'
import Head from 'next/head'
import { FiUpload } from 'react-icons/fi'

import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { api } from '@/services/apiClient'
import { SSRAuth } from '@/utils/SSRAuth'
import { setAPIClient } from '@/services/api'
 
type Itemprops = {
  id: string
  name: string
}
interface CategoryList{
  categoryList: Itemprops[]
}

export default function Product({ categoryList}: CategoryList) {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  
  const [avatar, setAvatar] = useState('')
  const [image, setImage] = useState('')
  
  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState()


  async function handleRegister(e: FormEvent){
    e.preventDefault()

    try {
      const data = new FormData()

      if(name === '' || price === '' || description === '' || avatar === null){
        toast.warning('Preencha todos os campos!')
        return
      }

      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', categories[Number(categorySelected)].id)
      data.append('file', image)

      await api.post('/product', data)

      toast.success('Cadastrado com sucesso!')

      setName('')
      setPrice('')
      setDescription('')
      setImage(null)
      setAvatar('')

    } catch (error) {
      toast.error('Erro ao cadastrar!!')
      console.log(error)
    }

  }


  function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files){
      toast.warning('Falha na seleção da imagem!')
      return
    }

    const image = e.target.files[0]

    if(!image) return

    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      setImage(image)
      setAvatar(URL.createObjectURL(e.target.files[0]))
    }
  }


  function handleSelect(e){
    setCategorySelected(e.target.value)
  }


  return (
    <>
      <Head>
        <title>Produtos - appPizzaria</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar Produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>

            <label className={styles.label}>
              <span>
                <FiUpload size={30} color='#FFF' />
              </span>

              <input type="file" accept='image/png, image/jpeg' onChange={handleFile}/>

              {avatar && (
                <img 
                  className={styles.preview}
                  src={avatar}
                  alt="foto do produto" 
                  width={220}
                  height={220}
                />
              )}

            </label>

            <select value={categorySelected} onChange={handleSelect}>
              <option selected disabled>Selecione uma categoria</option>
              {categories.map( (item, index) => {
                return(
                  <option key={item.id} value={index}>{item.name}</option>
                )
              })}
            </select>

            <input 
              type="text" 
              placeholder='Digite o nome do produto'  
              className={styles.input}
              value={name}
              onChange={ e => setName(e.target.value) }
            />

            <input 
              type="text" 
              placeholder='Digite o preço do produto'  
              className={styles.input}
              value={price}
              onChange={ e => setPrice(e.target.value) }
            />

            <textarea 
              placeholder='Descreva seu produto...'
              className={styles.input}
              value={description}
              onChange={ e => setDescription(e.target.value) }
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
  
  const api = setAPIClient(ctx)
  const response = await api.get('/category')

  return{
    props:{
      categoryList: response.data
    }
  }
})