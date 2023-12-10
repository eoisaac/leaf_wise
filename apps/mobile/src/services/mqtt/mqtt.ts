import { MQTT_CLIENT_ID, MQTT_HOST, MQTT_WS_PORT } from '@env'
import Paho from 'paho-mqtt'

type MQTTCallback = (topic: string, message: string) => void

class MQTT {
  private static instance: MQTT
  private client: Paho.Client
  private callbacks: Map<string, MQTTCallback> = new Map()

  private constructor() {
    this.client = new Paho.Client(
      String(MQTT_HOST),
      Number(MQTT_WS_PORT),
      String(MQTT_CLIENT_ID),
    )

    this.client.connect({
      onSuccess: () => console.log('MQTT connected'),
      onFailure: (err) => console.error('MQTT failed to connect', err),
    })

    this.client.onConnectionLost = (err) =>
      console.error('MQTT connection lost', err)

    this.client.onMessageArrived = (message) => {
      const callback = this.callbacks.get(message.destinationName)
      if (callback) callback(message.destinationName, message.payloadString)
    }
  }

  public static getInstance(): MQTT {
    if (!MQTT.instance) MQTT.instance = new MQTT()
    return MQTT.instance
  }

  public subscribe(topic: string, callback?: MQTTCallback): void {
    this.client.subscribe(topic)
    if (callback) this.callbacks.set(topic, callback)
  }

  public publish(topic: string, message: string): void {
    this.client.send(topic, message)
  }

  public isConnected(): boolean {
    return this.client.isConnected()
  }
}

export { MQTT, MQTTCallback }
