import time


def blink_led(pin, duration: int = 1, times: int = 1):
    """
    Blink an LED.
    @param pin: The pin to blink.
    @param duration: The duration of the blink.
    @param times: The number of times to blink.
    """
    for _ in range(times):
        pin.value(1)
        time.sleep(duration)
        pin.value(0)
        time.sleep(duration)
