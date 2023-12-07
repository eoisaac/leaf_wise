import { monitorApi } from '@/services/api/instances'

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

export interface ConfigureMonitorRequest {
  id: string
  token: string
  wifi: WifiSettings
  mqtt: MqttSettings
}

export const configureMonitorRequest = async (
  values: ConfigureMonitorRequest,
) => {
  try {
    const response = await monitorApi.post('/', values)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
