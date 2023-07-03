import React, { useEffect, useState } from 'react'
import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import { api } from '../../services/api';
import { StackParamsList } from "../../routes/app.routes";
import ModalPicker from '../../components/ModalPicker';
import Item from '../../components/Item';
import BackButton from '../../components/BackButton';

type RouteParams = {
  Order:{
    number: string | number
    order_id: string 
  }
}

export type CategoryProps = {
  id: string
  name: string  
}

export type ProductProps = {
  id: string
  name: string  
}

export type ItemProps = {
  id: string
  product_id: string 
  name: string
  amount: number | string
}

type OrderProps = RouteProp<RouteParams, 'Order'>

export default function Order(){

  const route = useRoute<OrderProps>()
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<StackParamsList>>()


  const [category, setCategory] = useState<CategoryProps[] | []>([])
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

  const [product, setProduct] = useState<ProductProps[] | []>([])
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
  const [modalProductVisible, setModalProductVisible] = useState(false)

  const [amount, setAmount] = useState('1')
  
  const [items, setItems] = useState<ItemProps[] | []>([])


  useEffect(() => {

    async function loadInfo() {
      const { data } = await api.get('/category')
      
      setCategory(data)
      setCategorySelected(data[0])
    }
    loadInfo()

  }, [])


  useEffect(() => {

    async function loadProducts() {
      const { data } = await api.get('/product', {
        params:{
          category_id: categorySelected?.id
        }
      })
      
      setProduct(data)
      setProductSelected(data[0])
    }
    loadProducts()

  }, [categorySelected])


  async function handleCloseOrder(){
    try {
      await api.delete('/order', {
        params:{
          order_id: route.params?.order_id
        }
      })
      goBack()

    } catch (error) {
      console.log(error);
    }
  }


  function handleChangeCategory(item: CategoryProps){
    setCategorySelected(item)
  }

  function handleChangeProduct(item: CategoryProps){
    setProductSelected(item)
  }


  async function handleAddItem(){
    const { data } = await api.post('/order/add', {
      order_id: route.params?.order_id,
      product_id: productSelected?.id,
      amount: Number(amount),
    })

    let dataInfo = {
      id: data.id,
      product_id: data.productId as string,
      name: productSelected?.name as string,
      amount: data.amount,
    }

    setItems(oldItems => [...oldItems, dataInfo])
  }

  async function handleDeleteItem(id:string) {
    await api.delete('/order/remove', {
      params:{
        orderItem_id: id
      }
    })

    let removeItems = items.filter( item => !item.id )
    setItems(removeItems)
  }


  function handleFinishOrder(){
    navigate('Finish', { table: route.params?.number, order_id: route.params?.order_id })
  }


  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.headerText}>Mesa {route.params?.number}</Text>
        
        {items.length > 0 ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={ handleCloseOrder }
            style={{opacity: 0.5}}
            disabled
          >
            <Feather name='trash-2' size={28} color='#ff3f4b'/>
          </TouchableOpacity>
        ):(
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={ handleCloseOrder }
        >
          <Feather name='trash-2' size={28} color='#ff3f4b'/>
        </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity 
        style={styles.input} 
        onPress={ () => setModalCategoryVisible(true) }
        activeOpacity={0.8}
      >
        <Text style={styles.inputText}>
          {categorySelected?.name}
        </Text>
      </TouchableOpacity>


      {productSelected ? (
        <TouchableOpacity 
          style={styles.input}
          activeOpacity={0.8}
          onPress={ () => setModalProductVisible(true) }
        >
          <Text style={styles.inputText}>
            {productSelected?.name}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.inputRed}
          activeOpacity={0.8}
          disabled
        >
          <Text style={styles.inputText}>
            Esta categoria não tem produtos disponiveis...
          </Text>
        </TouchableOpacity>
      )}


      <View style={styles.qtdeContainer}>
        <Text style={styles.qtdeText}>Quantidade</Text>
        <TextInput 
          style={[styles.input, { width: '60%', textAlign: 'center'}]}
          placeholderTextColor='#bbb'
          keyboardType='numeric'
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.btnAdd} 
          activeOpacity={0.8}
          onPress={handleAddItem}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.btnNext, {opacity: items.length > 0 ? 1 : 0.3} ]} 
          activeOpacity={0.8}
          disabled={ items.length > 0 ? false : true }
          onPress={handleFinishOrder}
        >
          <Text style={styles.btnText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item)=> item.id}
        renderItem={ ({ item }) => ( 
          <Item 
            data={item}
            deleteItem={handleDeleteItem}
          /> 
        )}
      />


      <Modal
        transparent
        visible={modalCategoryVisible}
        animationType='slide'
      >
        <ModalPicker 
          handleClose={ () => setModalCategoryVisible(false) }
          options={category}
          selectedCategory={ handleChangeCategory }
        />
      </Modal>

      <Modal
        transparent
        visible={modalProductVisible}
        animationType='slide'
      >
        <ModalPicker 
          handleClose={ () => setModalProductVisible(false) }
          options={product}
          selectedCategory={ handleChangeProduct }
        />
      </Modal>

    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: '10%',
    paddingEnd: '5%',
    paddingStart: '5%',
  },
  header:{
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  headerText:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 30,
    marginRight: 14,
  },
  input:{
    backgroundColor: '#101026',
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 4,
    color: '#FFF',
    fontSize: 20,
    borderColor: '#bbb',
    borderWidth: 1,
  },
  inputRed:{
    backgroundColor: '#101026',
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 4,
    color: '#FFF',
    fontSize: 20,
    borderColor: '#da1515',
    borderWidth: 1,
  },
  inputText:{
    color: '#FFF',
  },
  qtdeContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtdeText:{
    fontSize: 25,
    fontWeight: 'bold', 
    color: '#FFF',
    marginTop: -11,
  },
  actions:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 15
  },
  btnAdd:{
    width: '25%',
    backgroundColor: '#3fd1ff',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText:{
    color: '#101026',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnNext:{
    width: '70%',
    backgroundColor: '#3fffa3',
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  }
})