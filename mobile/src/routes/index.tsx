import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import useAuthContext from '../Contexts/AuthContext'


export default function Routes(){

  const { signed, loading } = useAuthContext()

  const isAuthenticated = signed


  if(loading){
    return(
      <View style={{flex:1, backgroundColor: '#f5f7fb', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={90} color='#1d1d2e'/>
      </View>
    )
  }

  return(
    isAuthenticated ? <AppRoutes /> : <AuthRoutes />
  )
}