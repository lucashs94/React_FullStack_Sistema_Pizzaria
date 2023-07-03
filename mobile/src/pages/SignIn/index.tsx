import React, { useState } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


import useAuthContext from '../../Contexts/AuthContext'
import Logo from '../../components/Logo'


export default function SignIn(){

  const { user, AuthSignIn, loadingAuth } = useAuthContext()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')


  async function handleLogin(){
    
    if(login === '' || password === '') return
    
    await AuthSignIn(login, password)
  }


  return(
    <SafeAreaView style={styles.container}>

      <Logo />

      <View style={styles.inputContainer}>

        <TextInput 
          style={styles.input}
          placeholder='Seu email'
          placeholderTextColor='#bbb'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          autoComplete='off'
          value={login}
          onChangeText={setLogin}
        />

        <TextInput 
          style={styles.input}
          placeholder='Sua senha'
          placeholderTextColor='#bbb'
          secureTextEntry={true}
          autoCapitalize='none'
          autoCorrect={false}
          autoComplete='off'
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.btn} onPress={handleLogin} activeOpacity={0.8}>
          
            {loadingAuth ? (
              <ActivityIndicator color='#1d1d2e'/>
            ) : (
              <Text style={styles.btnText}>Acessar</Text>
          )}
          
        </TouchableOpacity>

      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d2e'
  },
  inputContainer:{
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input:{
    width: '90%',
    height: 40,
    backgroundColor: '#101026',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 12,
    color: '#FFF',
    borderColor: '#bbb',
    borderWidth: 1,
  },
  btn:{
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  btnText:{
    fontSize: 16,
    fontWeight: 'bold',
  },
})