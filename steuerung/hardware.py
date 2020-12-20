import time
from rpi_ws281x import *
from rpi_ws281x import Adafruit_NeoPixel
import RPi.GPIO as gpio
import busio
import digitalio
import board
import adafruit_mcp3xxx.mcp3008 as MCP
from adafruit_mcp3xxx.analog_in import AnalogIn

# create the spi bus
spi = busio.SPI(clock=board.SCK, MISO=board.MISO, MOSI=board.MOSI)

# create the cs (chip select)
cs = digitalio.DigitalInOut(board.D5)

# create the mcp object
mcp = MCP.MCP3008(spi, cs)

gpio.setmode(gpio.BCM)

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

ways = {0: house1, 1: house2, 2: house3, 3: storage, 4: house5, 5: firma, 6: wind}
pins = [MCP.P0, MCP.P1, MCP.P2, MCP.P3, MCP.P4, MCP.P5, MCP.P6, MCP.P7]

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
                if item < list(reversed(sender_object_way))[0] and item > list(reversed(receiver_object_way))[0]:
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
                    index = way.index(nthEntry)
                    if index+q < len(way):
                        super().setPixelColor(way[index+q], 0)
                super().show()
                time.sleep(wait_ms)
                for nthEntry in way[::4]:
                    index = way.index(nthEntry)
                    if index+q < len(way):
                        super().setPixelColor(way[index+q], color)
        for led in way:
            super().setPixelColor(led, 0)

    def sonne(self, brightness):
        way = sun
        for i in way:
            super().setPixelColor(i, Color(int(255*brightness), int(180*brightness), int(20*brightness)))
            super().show()




def getAnalog(pin):  # Pin in range from 0-7
    chan = AnalogIn(mcp, pins[pin])
    return chan.voltage

def getAnalogPercent(pin):
    chan = AnalogIn(mcp, pins[pin])
    return chan.voltage/3.3
