import React from 'react'

import { StyleSheet, Text, View } from 'react-native'


export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.logoTitle}>
        app
      </Text>
      <Text style={styles.logoText}>Pizzaria</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
  },
  logoTitle:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 50,
  },
  logoText:{
    color: 'red',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginStart: -12,
    fontSize: 50
  } 
})
