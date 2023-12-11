import Paho from 'paho-mqtt'
import { create } from 'zustand'

type MQTTCallback = (topic: string, message: string) => void

interface MQTTConfig {
  host: string
  port: number
  clientId: string
}

interface MQTTState {
  client: Paho.Client | null
  callbacks: Map<string, MQTTCallback>

  connect: (config: MQTTConfig) => void
  subscribe: (topic: string, callback?: MQTTCallback) => void
  unsubscribe: (topic: string) => void
  publish: (topic: string, message: string) => void
  isConnected: () => boolean
}

export const useMQTT = create<MQTTState>()((set, get) => ({
  client: null,
  callbacks: new Map(),

  connect: (config) => {
    const client = new Paho.Client(config.host, config.port, config.clientId)

    client.connect({
      onSuccess: () => {
        console.log('[MQTT] connected')
        set({ client })
      },
      onFailure: (err) => {
        console.log('[MQTT] failed to connect', err)
      },
    })

    client.onConnectionLost = (err) => {
      console.log('[MQTT] connection lost', err)
      set({ client: null })
    }

    client.onMessageArrived = (message) => {
      const callback = get().callbacks.get(message.destinationName)
      if (callback) callback(message.destinationName, message.payloadString)
    }
  },

  subscribe: (topic: string, callback?: MQTTCallback) => {
    const client = get().client
    if (client) {
      client.subscribe(topic)
      if (callback) get().callbacks.set(topic, callback)
    }
  },

  unsubscribe: (topic: string) => {
    const client = get().client
    if (client) {
      client.unsubscribe(topic)
      get().callbacks.delete(topic)
    }
  },

  publish: (topic: string, message: string) => {
    const client = get().client
    if (client) {
      client.send(topic, message)
    }
  },

  isConnected: () => {
    const client = get().client
    return client ? client.isConnected() : false
  },
}))
