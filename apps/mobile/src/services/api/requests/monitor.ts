import { MONITOR_API_TOKEN, MONITOR_API_URL } from '@env'
import axios from 'axios'

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
    console.log(`Sending config to: ${MONITOR_API_URL}`)
    const monitorApi = axios.create({ baseURL: String(MONITOR_API_URL) })
    monitorApi.defaults.headers.Authorization = `Bearer ${MONITOR_API_TOKEN}`

    const response = await monitorApi.post('/', values)
    return response.data as ConfigureMonitorResponse
  } catch (error) {
    console.error(error)
    return error
  }
}
