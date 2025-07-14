import React, { useState } from 'react';
import { Text, View } from 'react-native';
import AuthScreen from './Auth';
import TodoScreen from './Todo';
export default function MainScreen() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    if(!isAuthenticated){
        return <AuthScreen onLogin={() => setIsAuthenticated(true)} />
    }
    
  return <TodoScreen />
}
