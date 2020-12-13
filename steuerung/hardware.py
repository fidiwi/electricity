import time
from rpi_ws281x import *
from rpi_ws281x import Adafruit_NeoPixel
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

main = [*range(1,9), *range(18, 29), *range(38, 82), *range(96, 106), *range(120, 129), *range(136, 140)]
house1 = [*range(82, 89)]
house2 = [*range(89, 96)]
house3 = [*range(106, 113)]
storage = [*range(113, 120)]
house5 = [*range(129, 136)]
wind = [*range(9, 18)]
firma = [*range(29, 38)]
sun = [*range(140, 180)]


# Darf keine __init__() haben, sonst hat sich bisher alles weiß geschaltet!
class LEDStrip(Adafruit_NeoPixel): 
    def calculateWay(self, sender_object, receiver_object):
        way = []
        # Stromfluss von kleinerem Pixelindex zu größerem
        if sender_object[0] < receiver_object[0]:
            way += reversed(sender_object)
            for item in main:
                if item > sender_object[0] and item < receiver_object[0]:
                    way.append(item)
            way += receiver_object
        # Stromfluss von größerem Pixelindex zu kleinerem
        else:
            way += reversed(sender_object)
            for item in reversed(main):
                if item < reversed(sender_object) and item > reversed(receiver_object)[0]:
                    way.append(item)
            way += reversed(receiver_object)
        return way

    # Define functions which animate LEDs in various ways.
    def stromfluss(self, color, speed_percent, sender_object, receiver_object):
        # 25 = Minimum, 50 + 25 = Maximum
        wait_ms = (1-speed_percent) * 400 + 100
        way = self.calculateWay(sender_object, receiver_object)
        """Wipe color across display a pixel at a time."""
        for j in range(way):
            for q in range(4):
                    for i in range(0, super().numPixels(), 4):
                        super().setPixelColor(i+q, 0)
                    super().show(wait_ms)
                    time.sleep(wait_ms)
                    for i in range(0, super().numPixels(), 4):
                        super().setPixelColor(i+q, color)

    def sonne(self, brightness):
        way = sun
        for i in way:
            super().setPixelColor(i, Color(255*brightness, 180*brightness, 20*brightness))
            super().show()




def getAnalog(pin):  # Pin in range from 0-7
    return mcp.read_adc(pin)


def getAnalogPercent(pin):
    return mcp.read_adc(pin)/1023
