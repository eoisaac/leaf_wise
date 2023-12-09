import re
import time

import ujson
from usocket import AF_INET, SOCK_STREAM, socket

from src.config.config import config
from src.config.pins import GREEN_LED_PIN, YELLOW_LED_PIN
from src.utils.led import blink_led


class ConfigAPI:
    def __init__(self):
        self._socket = socket(AF_INET, SOCK_STREAM)
        self._socket.bind(('', 80))
        self._socket.listen(5)

    def _parse_request(self, request):
        """
        Parse a request and return the token and data.
        """
        try:
            print("request:", request)
            token, data = None, None

            body = request.split("\r\n\r\n")[1]
            data = ujson.loads(body)

            if 'Authorization' in request or 'authorization' in request:
                token = re.search("Bearer (\\S+)", request).group(1)

            return token, data
        except Exception as e:
            print("Failed to parse request:", str(e))
            return None, None

    def _handle_config_request(self, request):
        """
        Handle a request and return the response.
        """
        try:
            if 'POST /' not in request:
                return self._handle_response("Not Found", 404, {
                    "error": "Not Found",
                })

            token, data = self._parse_request(request)

            if token is None or token != config.get("token"):
                print("No token provided")
                return self._handle_response("Unauthorized", 401, {
                    "error": "Unauthorized request"
                })

            if data is None:
                print("No data provided")
                return self._handle_response("Bad Request", 400, {
                    "error": "No data provided"
                })

            if not config.check_schema(data, config.CONFIG_SCHEMA):
                print("Invalid data provided")
                return self._handle_response("Bad Request", 400, {
                    "error": "Invalid data provided"
                })

            if config.store(data):
                print("Device configured successfully!", config.load_config())
                blink_led(GREEN_LED_PIN)
                return self._handle_response("OK", 200, {
                    "message": "Device configured successfully!"
                })

            return self._handle_response("Internal Server Error", 500, {
                "error": "Error configuring device. Please try again."
            })
        except Exception as e:
            print("Failed to handle request:", str(e))
            return self._handle_response("Internal Server Error", 500, {
                "error": "Could not handle request. Please try again."
            })

    def _handle_response(self, status: str, status_code: int, content: dict):
        """
        Handle a response and return it as a string.
        """
        try:
            content = ujson.dumps(content)
            response = f"HTTP/1.1 {status_code} {status}\r\n"
            response += "Content-Type: application/json\r\n"
            response += f"Content-Length: {len(content)}\r\n\r\n"
            response += content
            return response
        except Exception as e:
            print("Failed to handle response:", str(e))
            return self._handle_response("Internal Server Error", 500, {
                "error": "Could not handle response. Please try again."
            })

    def loop(self):
        """
        Listen for incoming requests and handle them.
        """
        try:
            while True:

                conn, addr = self._socket.accept()
                print(f"Got a connection from: {addr}")
                blink_led(YELLOW_LED_PIN)
                request = conn.recv(1024).decode()
                print(f"Request: {request}")

                response = self._handle_config_request(request)
                if response:
                    conn.send(response)
                conn.close()
        except Exception as e:
            print("Failed to handle request:", str(e))
            return self._handle_response("Internal Server Error", 500, {
                "error": "Could not handle request. Please try again."
            })

        except KeyboardInterrupt:
            print("Shutting down...")
            self.close()

    def close(self):
        self._socket.close()
        print("Socket closed")
