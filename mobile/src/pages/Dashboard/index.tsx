import React, { useState } from 'react'
import { Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

import useAuthContext from '../../Contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'
import { api } from '../../services/api'


export default function Dashboard(){

  const { AuthSignOut } = useAuthContext()
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const [table, setTable] = useState('')

  async function openOrder(){
    if(table === '') return

    const { data } = await api.post('/order', {
      table: Number(table)
    })

    navigation.navigate('Order', { number: table, order_id: data.id })

    setTable('')
  }

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#1d1d2e', }}>

      <TouchableOpacity 
        style={[styles.btnLogout]} 
        onPress={AuthSignOut} 
        activeOpacity={0.5}
      >
        <Text style={styles.btnLogoutText}>SAIR</Text>
      </TouchableOpacity>

      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <Text style={styles.title}>
          Novo Pedido
        </Text>

        <TextInput
          style={styles.input}
          placeholder='Numero da mesa'
          placeholderTextColor='#bbb'
          keyboardType='numeric'
          value={table}
          onChangeText={setTable}
          numberOfLines={1}
        />

        <TouchableOpacity style={styles.btn} onPress={openOrder}>
          <Text style={styles.btnText}>Abrir mesa</Text>
        </TouchableOpacity>
      </Pressable>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24,
  },
  input:{
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#FFF',
    borderColor: '#bbb',
    borderWidth: 1,
  },
  btn:{
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026'
  },
  btnLogout:{
    zIndex: 99,
    position: 'absolute',
    right: 20,
    top: 70,
    width: '20%',
    height: 30,
    backgroundColor: '#ff3f4a',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogoutText:{
    color: '#FFF',
    fontWeight: 'bold',
  }
})