import time

from src.config.config import config
from src.config.pins import GREEN_LED_PIN
from src.utils.led import blink_led
from umqtt.simple import MQTTClient


class MQTTService:
    def __init__(self):
        self._config = config.get("mqtt", {})
        self._MQTT = MQTTClient(config.get("id", ""),
                                self._config.get("host", ""),
                                self._config.get("port", 1883),
                                self._config.get("username", ""),
                                self._config.get("password", ""),
                                )
        self._topics = {}
        self.is_connected = False

    def _on_message(self, topic: bytes, message: bytes):
        decoded_topic = topic.decode("utf-8")
        decoded_message = message.decode("utf-8")
        if decoded_topic in self._topics:
            self._topics[decoded_topic](decoded_topic, decoded_message)

    def connect(self):
        try:
            self._MQTT.connect(clean_session=True)
            self.is_connected = True

            return self.is_connected
        except Exception as e:
            print(e)
            self.is_connected = False
            return self.is_connected

    def disconnect(self):
        self._MQTT.disconnect()

    def publish(self, topic: str, message: str):
        blink_led(GREEN_LED_PIN)
        self._MQTT.publish(topic, message)

    def subscribe(self, topic: str, callback):
        self._MQTT.set_callback(self._on_message)
        self._MQTT.subscribe(topic)
        self._topics[topic] = callback
