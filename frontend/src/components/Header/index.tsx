import React from 'react'

import { FiLogOut } from 'react-icons/fi'
import useAuthContext, { signOut } from '@/contexts/AuthContext'

import styles from './styles.module.scss'
import Link from 'next/link'
import Logo from '../Logo'

export default function Header() {

  const { signOut } = useAuthContext()


  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Logo destination='/dashboard' size={30}/>

        <nav className={styles.menuNav}>
          <Link href='/category'>
            Categorias
          </Link>
          
          <Link href='/product'>
            Cardápio
          </Link>

          <button onClick={signOut}>
            <FiLogOut color='#FFF' size={24}/>
          </button>

        </nav>

      </div>
      
    </header>
  )
}

