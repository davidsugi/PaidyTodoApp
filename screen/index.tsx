import React, { useState } from 'react';
import { Text, View } from 'react-native';
import AuthScreen from './Auth';

export default function MainScreen() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    if(!isAuthenticated){
        return <AuthScreen onLogin={() => setIsAuthenticated(true)} />
    }
    
  return (
    <View>
        <Text>MainScreen</Text>
    </View>
  )
}
