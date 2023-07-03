import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/Contexts/AuthContext';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>

        <StatusBar barStyle='light-content' translucent={false}/>
        <Routes />
        
      </AuthProvider>
    </NavigationContainer>
  );
}
