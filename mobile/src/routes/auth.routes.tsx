import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import SignIn from "../pages/SignIn"


const Stack = createNativeStackNavigator()

export default function AuthRoutes(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      
      <Stack.Screen name="SigIn" component={SignIn} />

    </Stack.Navigator>
  )
}