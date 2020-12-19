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

main = [*range(0, 8), *range(17, 28), *range(37, 81), *range(95, 105), *range(119, 128), *range(135, 139)]
house1 = [*range(81, 88)]
house2 = [*range(88, 95)]
house3 = [*range(105, 112)]
storage = [*range(112, 119)]
house5 = [*range(128, 135)]
wind = [*range(8, 17)]
firma = [*range(28, 37)]
sun = [*range(139, 179)]

ways = {1: house1, 2: house2, 3: house3, 4: storage, 5: house5, 6:firma, 7:wind}


# Darf keine __init__() haben, sonst hat sich bisher alles weiß geschaltet!
class LEDStrip(Adafruit_NeoPixel):
    def calculateWay(self, sender_object_way, receiver_object_way):
        way = []
        # Stromfluss von kleinerem Pixelindex zu größerem
        if sender_object_way[0] < receiver_object_way[0]:
            way += reversed(sender_object_way)
            for item in main:
                if item > sender_object_way[0] and item < receiver_object_way[0]:
                    way.append(item)
            way += receiver_object_way
        # Stromfluss von größerem Pixelindex zu kleinerem
        else:
            way += reversed(sender_object_way)
            for item in reversed(main):
                if item < reversed(sender_object_way) and item > reversed(receiver_object_way)[0]:
                    way.append(item)
            way += reversed(receiver_object_way)
        return way

    # Define functions which animate LEDs in various ways.
    def stromfluss(self, color, speed_percent, sender_object, receiver_object):
        # 25 = Minimum, 50 + 25 = Maximum
        wait_ms = ((1-speed_percent) * 400 + 100) / 1000
        way = self.calculateWay(sender_object, receiver_object)
        """Wipe color across display a pixel at a time."""
        for iteration in range(5):
            for q in range(4):
                for nthEntry in way[::4]:
                    if index+q < len(way):
                        index = way.index(nthEntry)
                        super().setPixelColor(way[index+q], 0)
                super().show()
                time.sleep(wait_ms)
                for nthEntry in way[::4]:
                    if index+q < len(way):
                        index = way.index(nthEntry)
                        super().setPixelColor(way[index+q], color)

    def sonne(self, brightness):
        way = sun
        for i in way:
            super().setPixelColor(i, Color(int(255*brightness), int(180*brightness), int(20*brightness)))
            super().show()




def getAnalog(pin):  # Pin in range from 0-7
    return mcp.read_adc(pin)


def getAnalogPercent(pin):
    return mcp.read_adc(pin)/1023
