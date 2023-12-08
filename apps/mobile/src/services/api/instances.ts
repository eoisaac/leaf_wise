import { MONITOR_API_URL } from '@env'
import axios from 'axios'

export const monitorApi = axios.create({
  baseURL: MONITOR_API_URL,
})
