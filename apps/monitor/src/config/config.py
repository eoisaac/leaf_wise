import os

import ujson


class Config:
    """
    A class for handling configuration data and managing a JSON configuration file.
    """

    def __init__(self, file_name="config.json"):
        self._file_path = file_name
        self._data = self.load_config()
        self.BASE_SCHEMA = {"token": str, "ap": {"ssid": str, "password": str}}
        self.CONFIG_SCHEMA = {
            "id": str,
            "mqtt": {"host": str, "port": int, "username": str, "password": str},
            "wifi": {"ssid": str, "password": str},
            "actuators": {"0": str, "1": str}
        }
        self.COMPLETE_SCHEMA = {
            "id": str,
            "token": str,
            "mqtt": {"host": str, "port": int, "username": str, "password": str},
            "wifi": {"ssid": str, "password": str},
            "ap": {"ssid": str, "password": str},
            "actuators": {"0": str, "1": str}
        }

    def load_config(self) -> dict:
        """
        Load the configuration data from the JSON file.
        """
        if self.exists():
            with open(self._file_path) as f:
                return ujson.load(f)
        else:
            return {}

    def load_default(self) -> None:
        """
        Load default configuration data and create the JSON file if it doesn't exist.
        """
        ssid = "LeafWise Monitor"
        password = "z2C7nicSvRakMQe0i9rTShJJnx0YKWBs"
        token = "eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6Ikp"

        print(
            f"Configuration file not found. Creating a new one at {self._file_path}")
        default_config = {"token": token, "ap": {
            "ssid": ssid, "password": password}}
        self._data = default_config
        with open(self._file_path, "w") as f:
            ujson.dump(default_config, f)

    def save_config(self) -> dict:
        """
        Save the configuration data to the JSON file.
        """
        with open(self._file_path, "w") as f:
            ujson.dump(self._data, f)
        return self._data

    def get(self, key, default=None) -> any:
        """
        Get a configuration value by key, with an optional default value.
        """
        return self._data.get(key, default)

    def set(self, key, value) -> None:
        """
        Set a configuration value and save the changes to the JSON file.
        """
        self._data[key] = value
        self.save_config()

    def update(self, data: dict) -> None:
        """
        Update the configuration data with a dictionary and save the changes to the JSON file.
        """
        self._data.update(data)

    def remove(self, key) -> None:
        """
        Remove a configuration key and its associated value from the configuration data and save the changes.
        """
        if key in self._data:
            del self._data[key]
            self.save_config()

    def exists(self) -> bool:
        """
        Check if the configuration file exists.
        """
        return self._file_path in os.listdir()

    def check(self) -> bool:
        """
        Check if the configuration file exists and has valid data.
        """
        return self.check_schema(self._data, self.COMPLETE_SCHEMA)

    def store(self, data: dict) -> bool:
        config.update(data)
        config_result = config.save_config()
        return config.check_schema(config_result, config.COMPLETE_SCHEMA)

    def check_schema(self, payload: dict, schema: dict) -> bool:
        """
        Check if a payload matches a schema.
        :param payload: the payload to check
        :param schema: one of the 3 schemas defined in this class
        :return: True if the payload matches the schema, False otherwise
        """
        for key, value in schema.items():
            if key not in payload:
                return False

            if isinstance(value, dict):
                if not isinstance(payload[key], dict):
                    return False
                if not self.check_schema(payload[key], value):
                    return False
            elif not isinstance(payload[key], value):
                return False

        for key in payload:
            if key not in schema:
                return False
        return True


config = Config()
