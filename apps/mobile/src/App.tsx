/* eslint-disable camelcase */
import { StatusBar } from '@/components/ui/status-bar'
import { ToastRoot } from '@/components/ui/toast'
import { useMQTT } from '@/hooks/use-mqtt'
import { Routes } from '@/routes'
import { LoadingScreen } from '@/screens/common/loading-screen'
import { MQTT_CLIENT_ID, MQTT_HOST, MQTT_WS_PORT } from '@env'
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter'
import React from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  })

  const mqtt = useMQTT()
  React.useEffect(() => {
    mqtt.connect({
      host: String(MQTT_HOST),
      port: Number(MQTT_WS_PORT),
      clientId: String(MQTT_CLIENT_ID),
    })
  }, [])

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
