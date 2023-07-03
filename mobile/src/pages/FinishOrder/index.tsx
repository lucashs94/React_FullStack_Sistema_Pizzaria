import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from "@expo/vector-icons";

import { api } from '../../services/api';
import BackButton from '../../components/BackButton';
import { StackParamsList } from '../../routes/app.routes';


type RouteDetailProps = {
  Finish:{
    table: string | number
    order_id: string
  }
}

type FinishOrderRouteProps = RouteProp<RouteDetailProps, 'Finish'>


export default function FinishOrder(){

  const route = useRoute<FinishOrderRouteProps>()
  const { navigate } = useNavigation<NativeStackNavigationProp<StackParamsList>>()


  async function handleSendOrder() {
    try {
      await api.put('/order/send', {
        order_id: route.params?.order_id,
      })

      navigate('Dashboard')

    } catch (error) {
      console.log(error);
    }
  }


  return(
    <SafeAreaView style={styles.container}>

      <BackButton TOP={60} LEFT={20}/>

      <View style={styles.tableView}>
        <Text style={styles.textTable}>
          MESA: <Text style={styles.textTableNumber}>{route.params?.table}</Text>
        </Text>
      </View>

      <Text style={styles.text}>
        Você deseja finalizar este pedido?
      </Text>

      <TouchableOpacity 
        style={styles.btn}
        onPress={handleSendOrder}
      >
        <Text style={styles.btnText}>
          Finalizar pedido
        </Text>

        <Feather name='shopping-cart' color='#1d1d2e' size={20} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '4%',
  },
  text:{
    width: '90%',
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 30,
  },
  tableView:{
    marginTop: -40,
    marginBottom: 40,
  },
  textTable:{
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
  },
  textTableNumber:{
    color: '#ff3f4b'
  },
  btn:{
    width: '70%',
    height: 50,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText:{
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
  }
})