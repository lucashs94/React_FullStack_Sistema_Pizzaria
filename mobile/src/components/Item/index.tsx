import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Feather } from "@expo/vector-icons";


interface ItemProps{
  data:{
    id: string
    product_id: string 
    name: string
    amount: number | string
  }
  deleteItem: (id:string) => void
}


export default function Item({ data, deleteItem }: ItemProps){

  function handleDeleteItem(){
    deleteItem(data.id)
  }

  return(
    <View style={styles.container}>
      <Text style={styles.itemText}>
        {data.name} ({data.amount})
      </Text>

      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={ handleDeleteItem }
      >
        <Feather name='trash-2' color='#FF3f4b' size={25}/>
      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101026',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: '#8a8a8a',
  },
  itemText:{
    color: '#FFF',
    fontSize: 16,
  }
})