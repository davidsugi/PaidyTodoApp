import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useBiometricAuth } from './hooks/useBiometricAuth'

interface AuthScreenProps {
    onLogin: () => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
    const { checkAuthAvailability, promptAuth, openSettings } = useBiometricAuth();
    const [isAvailable, setIsAvailable] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        checkAuthAvailability().then(setIsAvailable);
    }, [checkAuthAvailability]);

    const handleLogin = async () => {
        try {
            if(isAvailable) {
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
    
    if (!isAvailable) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.container}>
                    <Text style={styles.text}>Please enable biometric authentication in your device settings</Text>
                    <Button title="Open Settings" onPress={openSettings} />
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
        <Text style={styles.text}>AuthScreen</Text>
        <Button title="Login to the system" onPress={handleLogin} />
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