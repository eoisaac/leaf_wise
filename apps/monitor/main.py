import time

import ujson
from dht import DHT11
from machine import ADC, SoftI2C
from src.config.pins import DHT_PIN, I2C_SCL_PIN, I2C_SDA_PIN, SOIL_PIN
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


def handle_test(topic: str, message: str):
    print(f'test callback: {topic} - {message}')


def loop():
    prev_payload = ""

    try:
        while True:
            # mqtt_service.subscribe("env_status", handle_test)

            env_status = get_environment_status()
            if env_status:
                print(env_status)
                env_status = ujson.dumps(env_status)
                if env_status != prev_payload:
                    prev_payload = env_status
                    mqtt_service.publish("env_status", env_status)

            time.sleep(2)

    except KeyboardInterrupt:
        print('Bye! :/')


if __name__ == "__main__":
    setup()
    loop()