import WifiManager from 'react-native-wifi-reborn'

interface WifiResponse {
  connected: boolean
  message: string
}

const _connectToWifi = async (
  ssid: string,
  password: string,
  testConnection: boolean,
): Promise<WifiResponse> => {
  let isConnected = false

  try {
    await WifiManager.connectToProtectedSSID(ssid, password, false, false)
    isConnected = true
    return {
      connected: isConnected,
      message: 'Successfully connected to WiFi',
    }
  } catch (e) {
    console.error(e)
    return {
      connected: isConnected,
      message: 'Failed to connect to WiFi',
    }
  } finally {
    if (testConnection && isConnected) {
      await WifiManager.disconnect()
    }
  }
}

const connectToWifi = async (
  ssid: string,
  password: string,
): Promise<WifiResponse> => {
  return _connectToWifi(ssid, password, false)
}

const testWifiConnection = async (
  ssid: string,
  password: string,
): Promise<WifiResponse> => {
  return _connectToWifi(ssid, password, true)
}

export const Wifi = {
  connectToWifi,
  testWifiConnection,
}
