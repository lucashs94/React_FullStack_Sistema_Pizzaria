import React, { useState } from 'react'
import Head from 'next/head'
import { FiRefreshCcw } from 'react-icons/fi'
import Modal from 'react-modal'


import { SSRAuth } from '@/utils/SSRAuth'
import Header from '@/components/Header'

import styles from './styles.module.scss'
import { setAPIClient } from '@/services/api'
import { api } from '@/services/apiClient'
import ModalOrder from '@/components/ModalOrder'


type OrderProps = {
  id: string
  table: string | number
  status: boolean
  draft: boolean
  name: string | null
}

interface HomeProps{
  orders: OrderProps[]
}

export interface OrderItemProps{
  id: string
  amount: number
  orderId: string
  productId: string
  product:{
    id: string
    name: string
    description: string
    price: string
    banner: string
  }
  order: {
    id:string
    table: string | number
    status: boolean
    name: string | null
  }
}

export default function Dashboard({ orders }: HomeProps) {


  const [orderList, setOrderList] = useState(orders || [])
  const [modalItem, setModalItem] = useState<OrderItemProps[]>([])
  const [modalVisible, setModalVisible] = useState(false)


  function handleCloseModal(){ setModalVisible(false)}


  async function handleOpenModal(id: string){

    const response = await api.get('/orders/details', {
      params:{
        order_id: id,
      }
    })

    setModalItem(response.data)
    setModalVisible(true)
  }


  async function handleFinishOrder(id: string){

    await api.put('/order/close', {
      order_id: id,
    })

    const response = await api.get('/orders') 
    setOrderList(response.data)
    setModalVisible(false)
  }


  async function handleRefreshOrders() {
    const response = await api.get('/orders') 
    setOrderList(response.data)
  }


  Modal.setAppElement('#__next')

  return (
    <>
      <Head>
        <title>Painel - appPizzaria</title>
      </Head>

      <div>
        <Header />


        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Pedidos abertos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color='#3FFFa3'/>
            </button>
          </div>

          <article className={styles.listOrders}>

            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Náo há pedidos abertos neste momento...
              </span>
            )}


            {orderList.map( item => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModal(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}


          </article>
        </main>


        {modalVisible && (
          <ModalOrder 
            isOpen={modalVisible}
            onClose={handleCloseModal}
            order={modalItem}
            finishOrder={ handleFinishOrder }
          />
        )}

      </div>
    </>
  )
}


export const getServerSideProps = SSRAuth(async (ctx) => {

  const apiCliente = setAPIClient(ctx) 
  const response = await apiCliente.get('/orders') 
   

  return{
    props:{
      orders: response.data
    }
  }
})
