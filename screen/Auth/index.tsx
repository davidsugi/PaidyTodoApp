import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
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
            <View>
                <Text>Please enable biometric authentication in your device settings</Text>
                <Button title="Open Settings" onPress={openSettings} />
            </View>
        )
    }

    if(error) {
        return (
            <View>
                <Text>Error Occured</Text>
                <Text>{error}</Text>
                <Button title="Retry" onPress={handleRetry} />
            </View>
        )
    }

  return (
    <View>
        <Text>AuthScreen</Text>
        <Button title="Login to the system" onPress={handleLogin} />
    </View>
  )
}
