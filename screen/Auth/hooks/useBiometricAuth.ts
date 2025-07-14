import * as LocalAuthentication from 'expo-local-authentication';
import { useCallback } from 'react';
import { Linking, Platform } from 'react-native';

export const useBiometricAuth = () => {
  const checkAuthAvailability = useCallback(async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return compatible && enrolled;
  }, []);

  const promptAuth = useCallback(async () => {
    return await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Use Passcode',
      disableDeviceFallback: false,
    });
  }, []);

  const openSettings = useCallback(() => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    } else {
      Linking.openURL('app-settings:');
    }
  }, []);

  return {
    checkAuthAvailability,
    promptAuth,
    openSettings,
  };
};
