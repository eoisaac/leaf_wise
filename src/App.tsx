/* eslint-disable camelcase */
import '@/styles/globals.css';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';

export const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  })

  if (!fontsLoaded) {
    return <ActivityIndicator />
  }

  return (
    <View className='bg-orange-400 flex-1 items-center justify-center'>
      <Text className='text-lg'>Leaf wise</Text>
      <StatusBar style="auto" />
    </View>
  );
}
