import { MONITOR_API_TOKEN } from '@env'
import axios from 'axios'
import WifiManager from 'react-native-wifi-reborn'

export interface WifiSettings {
  ssid: string
  password: string
}

export interface MqttSettings {
  host: string
  port: number
  username: string
  password: string
}

export interface Actuators {
  '0': string
  '1': string
}

export interface ConfigureMonitorRequest {
  id: string
  wifi: WifiSettings
  mqtt: MqttSettings
  actuators: Actuators
}

export const configureMonitorRequest = async (
  values: ConfigureMonitorRequest,
): Promise<boolean> => {
  try {
    const url = await WifiManager.getIP()
    // 192.168.4.1
    const monitorApi = axios.create({ baseURL: `http://${url}` })
    monitorApi.defaults.headers.Authorization = `Bearer ${MONITOR_API_TOKEN}`

    const response = await monitorApi.post('/', values)
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}
