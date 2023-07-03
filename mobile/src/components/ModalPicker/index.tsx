import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { CategoryProps } from '../../pages/Order'


interface ModalProps{
  options: CategoryProps[]
  handleClose: () => void
  selectedCategory: (item: CategoryProps) => void
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')


export default function ModalPicker({ options, handleClose, selectedCategory }: ModalProps){


  function onPressItem(item: CategoryProps){
    selectedCategory(item)
    handleClose()
  }


  const option = options.map( (item, index) => (
    <TouchableOpacity 
      key={index} 
      style={styles.option}
      activeOpacity={0.4}
      onPress={ () => onPressItem(item)}
    >
      <Text style={styles.item}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  ))



  return(
    <TouchableOpacity 
      onPress={handleClose}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  content:{
    width: WIDTH - 30,
    height: HEIGHT / 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8a8a8a',
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
    zIndex: 99,
  },
  option:{
    width: WIDTH-60,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#3fffa3',
    shadowColor:  '#101026',
    shadowOffset: {width: -5, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 4,
    marginBottom: 10,
  },
  item:{
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color:  '#101026',
  }
})
