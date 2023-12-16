import time

import ujson
from dht import DHT11
from machine import ADC, SoftI2C
from src.config.config import config
from src.config.pins import (DHT_PIN, I2C_SCL_PIN, I2C_SDA_PIN, RELAY_1_PIN,
                             RELAY_2_PIN, SOIL_PIN)
from src.lib.bh1750 import BH1750
from src.services.mqtt import MQTTService

dht_sensor = DHT11(DHT_PIN)
soil_sensor = ADC(SOIL_PIN)
soil_sensor.atten(ADC.ATTN_11DB)

light_sensor = BH1750(SoftI2C(sda=I2C_SDA_PIN, scl=I2C_SCL_PIN))
mqtt_service = MQTTService()


def map_value(value, input_min, input_max, output_min, output_max):
    return (value - input_min) / (input_max - input_min) * (output_max - output_min) + output_min


def get_environment_status():
    try:
        dht_sensor.measure()

        return {
            'temperature': {
                "value": dht_sensor.temperature(),
                "unit": "C"
            },
            'humidity': {
                "value": dht_sensor.humidity(),
                "unit": "%"
            },
            'soil_moisture': {
                "value": map_value(soil_sensor.read(), 1000, 3200, 100, 0),
                "unit": "%"
            },
            'light': {
                "value": light_sensor.luminance(BH1750.ONCE_HIRES_1),
                "unit": "lux"
            }
        }
    except OSError:
        return None


def setup():
    mqtt_service.connect()


RELAY_1_ID = config.get('actuators').get('0')
RELAY_2_ID = config.get('actuators').get('1')


def handle_actuator(topic: str, message: str):
    relay_pins = {RELAY_1_ID: RELAY_1_PIN, RELAY_2_ID: RELAY_2_PIN}

    if topic in relay_pins:
        pin = relay_pins[topic]
        if message == "on":
            print(f"Turning ON: {topic}")
            pin.value(1)
        elif message == "off":
            print(f"Turning OFF: {topic}")
            pin.value(0)
    else:
        print("Unknown actuator")


def loop():
    try:

        prev_payload = ""
        while True:
            mqtt_service.subscribe(RELAY_1_ID, handle_actuator)
            mqtt_service.subscribe(RELAY_2_ID, handle_actuator)

            env_status = get_environment_status()
            if env_status:
                print(env_status)
                env_status = ujson.dumps(env_status)
                if env_status != prev_payload:
                    prev_payload = env_status
                    mqtt_service.publish(config.get('id'), env_status)

    except KeyboardInterrupt:
        print('Bye! :/')


if __name__ == "__main__":
    setup()
    loop()
