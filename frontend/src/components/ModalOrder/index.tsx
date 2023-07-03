import React from 'react'
import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'
import { OrderItemProps } from '@/pages/dashboard'

interface ModalProps{
  isOpen: boolean
  onClose: () => void
  order: OrderItemProps[]
  finishOrder: (id: string) => void
}

export default function ModalOrder({ isOpen, onClose, order, finishOrder }: ModalProps) {

  const modalStyles = {
    content:{
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      backgroundColor: '#1d1d2e',
      transform: 'translate(-50%, -50%)',
      maxWidth: '90%',
    }
  }

  console.log(order)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
    >
      <button
        type='button'
        onClick={onClose}
        className='react-modal-close'
        style={{background: 'transparent', border: 0}}
      >
        <FiX size={45} color='#f34748'/>
      </button>

      <div className={styles.container}>
        <h2>DETALHES DO PEDIDO</h2>
        <span className={styles.table}>
          Mesa: {order[0].order.table}
        </span>

        {order.map( item => (
          <section key={item.id} className={styles.containerItem}>
            <span><strong>{item.product.name}</strong> - ( Qtde: {item.amount} )</span>
            <span className={styles.description}>{item.product.description}</span>
          </section>
        ) )}

        <button className={styles.buttonOrder} onClick={ () => finishOrder(order[0].orderId) }>
          Concluir Pedido
        </button>

      </div>

    </Modal>
  )
}

