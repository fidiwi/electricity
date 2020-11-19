import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008
import RPi.GPIO as gpio

gpio.setmode(gpio.BCM)

# Hardware SPI Konfiguration
SPI_PORT = 0
SPI_DEVICE = 0
mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))


def getAnalog(pin):  # Pin in range from 0-7
    return mcp.read_adc(pin)


def getAnalogPercent(pin):
    return mcp.read_adc(pin)/1023
