/* eslint-disable camelcase */
import { StatusBar } from '@/components/ui/status-bar'
import { Routes } from '@/routes'
import { LoadingScreen } from '@/screens/common/loading-screen'
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter'
import { ActivityIndicator, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <View
          className="flex-1 bg-neutral-50 dark:bg-neutral-950"
          style={{ flex: 1 }}
        >
          <StatusBar mode="light" />
          {!fontsLoaded ? <LoadingScreen /> : <Routes />}
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
