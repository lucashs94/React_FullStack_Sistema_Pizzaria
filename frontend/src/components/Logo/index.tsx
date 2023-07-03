import React from 'react'

import styles from './styles.module.scss'

interface LogoType{
  destination: string
  size: number
}

export default function Logo({ destination, size }: LogoType) {
  return (
    <div>
      <a href={destination}>
        <p className={styles.logoTitle} style={{ fontSize: size }}>
          app
          <span className={styles.logoText}>
            Pizzaria
          </span>
        </p>
      </a>
    </div>
  )
}
