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
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53


class LEDStrip(Adafruit_NeoPixel):
    def __init__(self, LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_BRIGHTNESS, LED_INVERT, LED_CHANNEL):
         # Create NeoPixel object with appropriate configuration.
        super().__init__(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
        # Intialize the library (must be called once before other functions).
        super().begin()
 
    # Define functions which animate LEDs in various ways.
    def colorWipe(color, wait_ms=50):
        """Wipe color across display a pixel at a time."""
        for i in range(super().numPixels()):
            super().setPixelColor(i, color)
            super().show()
            time.sleep(wait_ms/1000.0)
    
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
    
    def rainbow(wait_ms=20, iterations=1):
        """Draw rainbow that fades across all pixels at once."""
        for j in range(256*iterations):
            for i in range(super().numPixels()):
                super().setPixelColor(i, wheel((i+j) & 255))
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
