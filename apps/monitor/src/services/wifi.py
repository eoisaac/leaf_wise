import time

import network
from src.config.pins import BLUE_LED_PIN, YELLOW_LED_PIN
from src.utils.led import blink_led


class WiFiService:
    """
    A class for handling WiFi connections.
    """

    def __init__(self):
        self.station_interface = network.WLAN(network.STA_IF)
        self.access_point_interface = network.WLAN(network.AP_IF)
        self.MAX_ATTEMPTS = 10

    def connect(self, ssid: str, password: str):
        """
        Connect to a WiFi network.
        """
        try:
            print("\nConnecting to WiFi", end="")
            self.station_interface.active(True)
            self.station_interface.connect(ssid, password)
            for _ in range(self.MAX_ATTEMPTS):
                if self.station_interface.isconnected():
                    config = self.station_interface.ifconfig()
                    print(
                        f"\nWiFi connected! Network - SSID: {ssid}, IP: {config[0]}")
                    break
                print(".", end="")
                blink_led(BLUE_LED_PIN)
            else:
                self._handle_connection_failure()

        except Exception as e:
            self._handle_error(e)

    def is_connected(self):
        return self.station_interface.isconnected()

    def disconnect(self):
        """
        Disconnect from the WiFi network.
        """
        try:
            print("\nDisconnecting from WiFi...")
            self.station_interface.disconnect()
            self.station_interface.active(False)
            print("\nWiFi disconnected!")
        except Exception as e:
            self._handle_error(e)

    def host(self, ssid: str, password: str):
        """
        Create a WiFi hotspot.
        """
        try:
            print("\nHosting WiFi", end="")
            self.access_point_interface.active(True)
            self.access_point_interface.config(essid=ssid)
            self.access_point_interface.config(
                authmode=network.AUTH_WPA_WPA2_PSK, password=password)
            while not self.access_point_interface.active():
                print(".", end="")
                blink_led(YELLOW_LED_PIN)
            if self.is_hosting():
                config = self.access_point_interface.ifconfig()
                print(
                    f"\nWiFi hosted! Network - SSID: {ssid}, IP: {config[0]}")
        except Exception as e:
            self._handle_error(e)

    def is_hosting(self):
        return self.access_point_interface.active()

    def stop_hosting(self):
        """
        Stop hosting the WiFi hotspot.
        """
        try:
            print("\nStopping WiFi host...")
            self.access_point_interface.active(False)
            print("\nWiFi host stopped!")
        except Exception as e:
            self._handle_error(e)

    def _handle_connection_failure(self):
        self.station_interface.active(False)
        print(f"\nWiFi connection failed after {self.MAX_ATTEMPTS} attempts.")

    def _handle_error(self, e):
        self.station_interface.active(False)
        print(f"\nError: {e}")

    def _blink_led(self, pin):
        pin.value(1)
        time.sleep(0.5)
        pin.value(0)
        time.sleep(0.5)
