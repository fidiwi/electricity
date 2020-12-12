import time
from rpi_ws281x import *
from rpi_ss281x import Adafruit_NeoPixel
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008
import RPi.GPIO as gpio


gpio.setmode(gpio.BCM)

# Hardware SPI configuration
SPI_PORT = 0
SPI_DEVICE = 0
mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))

# LED strip configuration:
LED_COUNT      = 180     # Number of LED pixels.
LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
#LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 30     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

main = [*range(1,9), *range(18, 29), *range(38, 82), *range(96, 106), *range(120, 140)]
house1 = [*range(82, 89)]
house2 = [*range(89, 96)]
house3 = [*range(106, 113)]
storage = [*range(113, 120)]
house5 = [*range(129, 136)]
wind = [*range(9, 18)]
firma = [*range(29, 38)]


class LEDStrip(Adafruit_NeoPixel):
    def __init__(self, LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_BRIGHTNESS, LED_INVERT, LED_CHANNEL):
        # Create NeoPixel object with appropriate configuration.
        super().__init__(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
        # Intialize the library (must be called once before other functions).
        super().begin()
 
    
    def calculateWay(self, sender_object, receiver_object):
        way = []
        # Stromfluss von kleinerem Pixelindex zu größerem
        if sender_object[0] < receiver_object[0]:
            way = sender_object
            for item in main:
                if receiver_object[0] > item:
                    way.append(item)
        # Stromfluss von größerem Pixelindex zu kleinerem
        else: 
            way = reversed(sender_object)
            for item in reversed(main):
                if reversed(receiver_object)[0] < item:
                    way.append(item)

        return way

    # Define functions which animate LEDs in various ways.
    def stromfluss(self, color, speed_percent, sender_object, receiver_object):
        # 25 = Minimum, 50 + 25 = Maximum
        wait_ms = (1 - speed_percent) * 50 + 25
        way = self.calculateWay(sender_object, receiver_object)
        """Wipe color across display a pixel at a time."""
        for i in way:
            super().setPixelColor(i, color)
            super().show()

        for i in way:
            super().setPixelColor(i, Color(0, 0, 0))
            super().show()
            time.sleep(wait_ms/1000.0)
            super().setPixelColor(i, color)

    def theaterChase(color, wait_ms=50, iterations=10):
        """Movie theater light style chaser animation."""
        for j in range(iterations):
            for q in range(3):
                for i in range(0, super().numPixels(), 3):
                    super().setPixelColor(i+q, color)
                super().show()
                time.sleep(wait_ms/1000.0)
                for i in range(0, super().numPixels(), 3):
                    super().setPixelColor(i+q, 0)
    
    def wheel(pos):
        """Generate rainbow colors across 0-255 positions."""
        if pos < 85:
            return Color(pos * 3, 255 - pos * 3, 0)
        elif pos < 170:
            pos -= 85
            return Color(255 - pos * 3, 0, pos * 3)
        else:
            pos -= 170
            return Color(0, pos * 3, 255 - pos * 3)
    
    def rainbow(self, wait_ms=20, iterations=1):
        """Draw rainbow that fades across all pixels at once."""
        for j in range(256*iterations):
            for i in range(super().numPixels()):
                super().setPixelColor(i, self.wheel((i+j) & 255))
            super().show()
            time.sleep(wait_ms/1000.0)
    
    def rainbowCycle(wait_ms=20, iterations=5):
        """Draw rainbow that uniformly distributes itself across all pixels."""
        for j in range(256*iterations):
            for i in range(super().numPixels()):
                super().setPixelColor(i, wheel((int(i * 256 / super().numPixels()) + j) & 255))
            super().show()
            time.sleep(wait_ms/1000.0)
    
    def theaterChaseRainbow(wait_ms=50):
        """Rainbow movie theater light style chaser animation."""
        for j in range(256):
            for q in range(3):
                for i in range(0, super().numPixels(), 3):
                    super().setPixelColor(i+q, wheel((i+j) % 255))
                super().show()
                time.sleep(wait_ms/1000.0)
                for i in range(0, super().numPixels(), 3):
                    super().setPixelColor(i+q, 0)


def getAnalog(pin):  # Pin in range from 0-7
    return mcp.read_adc(pin)


def getAnalogPercent(pin):
    return mcp.read_adc(pin)/1023
