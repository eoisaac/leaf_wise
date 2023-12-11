from machine import Pin

DHT_PIN = Pin(25)
SOIL_PIN = Pin(32)
I2C_SDA_PIN = Pin(21)
I2C_SCL_PIN = Pin(22)

RELAY_1_PIN = Pin(18, Pin.OUT)
RELAY_2_PIN = Pin(19, Pin.OUT)

BUILTIN_LED_PIN = Pin(2, Pin.OUT)

BLUE_LED_PIN = Pin(13, Pin.OUT)
GREEN_LED_PIN = Pin(14, Pin.OUT)
YELLOW_LED_PIN = Pin(26, Pin.OUT)
RED_LED_PIN = Pin(33, Pin.OUT)
