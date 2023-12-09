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

export interface ConfigureMonitorResponse {
  success: boolean
  message: string
}

export const configureMonitorRequest = async (
  values: ConfigureMonitorRequest,
): Promise<ConfigureMonitorResponse> => {
  try {
    const url = '192.168.4.1' || (await WifiManager.getIP())
    const monitorApi = axios.create({ baseURL: `http://${url}` })
    monitorApi.defaults.headers.Authorization = `Bearer ${MONITOR_API_TOKEN}`

    const response = await monitorApi.post('/', values)
    console.log(response.data)
    return response.data as ConfigureMonitorResponse
  } catch (error) {
    console.error(error)
    return error
  }
}