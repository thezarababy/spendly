import {Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold} from '@expo-google-fonts/inter';
import {useFonts} from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
import { TransactionProvider } from '@/store/TransactionContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

   useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
  


  return (
    <TransactionProvider>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='(tabs)'/>
        <Stack.Screen name='addTransaction'/>
      </Stack>
    </TransactionProvider>
    
  );
}
