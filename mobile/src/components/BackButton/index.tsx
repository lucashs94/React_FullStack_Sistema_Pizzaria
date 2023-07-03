import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'

import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

type Props ={
  TOP?: number
  LEFT?: number
}


export default function BackButton({TOP, LEFT}: Props){

  const { goBack } = useNavigation()


  return(
    <View style={[styles.container, {top: TOP, left: LEFT}]}>
      <TouchableOpacity
        onPress={ goBack }
      >
        <FontAwesome name='arrow-left' color='#FFF' size={30} />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'flex-start',
  }
})