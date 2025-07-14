import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useBiometricAuth } from './hooks/useBiometricAuth'

interface AuthScreenProps {
    onLogin: () => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
    const { promptAuth, openSettings, authAvailable, isLoading } = useBiometricAuth();
    const [error, setError] = useState<string | null>(null);


    const handleLogin = async () => {
        try {
            if(authAvailable) {
                const result = await promptAuth();
                if(result.success) {
                    setError(null);
                    onLogin();
                }
            }
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred');
        }
    }

    const handleRetry = () => {
        setError(null);
        handleLogin();
    }
    
    if(isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    if (!authAvailable) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.container}>
                    <Text style={styles.text}>Set Authentication to Proceed</Text>
                    <Button title="Go to Settings" onPress={openSettings} />
                </View>
            </SafeAreaView>
        )
    }

    if(error) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Error Occured</Text>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Retry" onPress={handleRetry} />
            </View>
        )
    }

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Please Login Before Proceeding</Text>
        <Button title="Login" onPress={handleLogin} />
    </View>
  )
}




const styles = StyleSheet.create({
    container: { 
      backgroundColor: 'white',
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: 20 
    },
    text: { 
      fontSize: 16, 
      marginBottom: 20,
      textAlign: 'center' 
    },
    errorText: { 
      fontSize: 16, 
      marginBottom: 20,
      textAlign: 'center',
      color: 'red' 
    }
  });