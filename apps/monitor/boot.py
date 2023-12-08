# boot.py -- run on boot-up
import time

from src.config.config import config
from src.config.pins import RED_LED_PIN, YELLOW_LED_PIN
from src.services.api import ConfigAPI
from src.services.wifi import WiFiService


def _boot():
    if not config.exists():
        RED_LED_PIN.value(1)
        config.load_default()
        time.sleep(1)
        RED_LED_PIN.value(0)

    wifi_service = WiFiService()

    if config.check():
        wifi_config = config.get("wifi")
        wifi_service.connect(
            wifi_config.get("ssid"), wifi_config.get("password"))
    else:
        ap_config = config.get("ap")
        wifi_service.host(ap_config.get("ssid"), ap_config.get("password"))

        api = ConfigAPI()
        YELLOW_LED_PIN.value(1)
        api.loop()


if __name__ == "__main__":
    _boot()
