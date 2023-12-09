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
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ToastRoot } from './components/ui/toast'

export const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastRoot>
        <Host style={{ flex: 1 }}>
          <SafeAreaProvider style={{ flex: 1 }}>
            <StatusBar mode="light" />
            <View
              className="flex-1 bg-neutral-50 dark:bg-neutral-950"
              style={{ flex: 1 }}
            >
              {!fontsLoaded ? <LoadingScreen /> : <Routes />}
            </View>
          </SafeAreaProvider>
        </Host>
      </ToastRoot>
    </GestureHandlerRootView>
  )
}
