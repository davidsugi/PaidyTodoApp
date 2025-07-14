import * as LocalAuthentication from 'expo-local-authentication';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, Linking, NativeModules, Platform } from 'react-native';

const { IntentLauncher } = NativeModules;

export const useBiometricAuth = () => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const [authAvailable, setAuthAvailable] = useState(false);  
  const [isLoading, setIsLoading] = useState(true);
  
  const checkAuthAvailability = useCallback(async () => {
    setIsLoading(true);
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setAuthAvailable(compatible && enrolled);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuthAvailability();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkAuthAvailability();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [checkAuthAvailability]);

  const promptAuth = useCallback(async () => {
    setIsLoading(true);
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Use Passcode',
      disableDeviceFallback: false,
    });
    setIsLoading(false);
    return result;
  }, []);

  const openSettings = useCallback(() => {
    if(isLoading) return;
    setIsLoading(true);
    if (Platform.OS === 'android') {
      IntentLauncher.openFingerprintSettings();
    } else {
      Linking.openURL('app-settings:');
    }
    setIsLoading(false);
  }, []);

  return {
    authAvailable,
    isLoading,
    promptAuth,
    openSettings,
  };
};
