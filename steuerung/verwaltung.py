import time
import hardware
from rpi_ws281x import Color

# LED strip configuration:
LED_COUNT      = 180     # Number of LED pixels.
LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
#LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 30     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

class House:
    def __init__(self, max_consumption, solar_space):
        self.max_consumption = max_consumption  # Maximaler Verbrauch in kW(h)
        self.solar_space = solar_space  # Solarenergie -> Leistung


class Apartment(House):
    def __init__(self):
        super().__init__(max_consumption=5.7, solar_space=12.5)


class Einfamilienhaus(House):
    def __init__(self):
        super().__init__(max_consumption=1.2, solar_space=18.75)          


class Reihenhaus(House):
    def __init__(self):
        super().__init__(max_consumption=1.5, solar_space=3.75)


class Mehrfamilienhaus(House):
    def __init__(self):
        super().__init__(max_consumption=4, solar_space=8.75)


class Storage():
    def __init__(self, capacity, min, max):
        self.capacity = capacity
        self.min = min
        self.max = max

    def startCharging(self, power):  # Power ist die abzugebende Leistung (kW)
        self.capacity += power
        if self.capacity > self.max:
            self.capacity = self.max
            print("full")
        if self.capacity < self.min:
            self.capacity = self.min
            print("empty")


class Firma(House):
    def __init__(self):
        super().__init__(max_consumption=20, solar_space=20)  # Zahlen für den
        # Verbrauch einsetzen


class Windpark():
    def __init__(self):
        self.windenergy = 50  # maximale Produktion


def updatePotiValues():
    global verbrauch_haus
    global erzeugung_solar
    global verbrauch_firma
    global erzeugung_wind
    global preis_vorhersage
    verbrauch_haus = hardware.getAnalogPercent(0)
    erzeugung_solar = hardware.getAnalogPercent(1)
    verbrauch_firma = hardware.getAnalogPercent(2)
    erzeugung_wind = hardware.getAnalogPercent(3)
    preis_vorhersage = hardware.getAnalogPercent(4)


if __name__ == "__main__":
    houses = {}
    storage = Storage(200, 0, 350)

    verbrauchfirma = 0

    verbrauch_haus = hardware.getAnalogPercent(0)  # 0.5
    erzeugung_solar = hardware.getAnalogPercent(1)  # 0.25
    verbrauch_firma = hardware.getAnalogPercent(2)  # 1
    erzeugung_wind = hardware.getAnalogPercent(3)  # 0.5
    preis_vorhersage = hardware.getAnalogPercent(4)  # 0
    charge_cars = 15  # wie viele Autos gerade aufgeladen werden
    hours = 0

    houses[1] = Apartment()
    houses[2] = Reihenhaus()
    houses[3] = Reihenhaus()
    houses[4] = Einfamilienhaus()
    houses[5] = Mehrfamilienhaus()
    firma = Firma()
    windpark = Windpark()

    ledStrip = hardware.LEDStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ,
                                 LED_DMA, LED_INVERT, LED_BRIGHTNESS,
                                 LED_CHANNEL)
    try:

        while True:
            dif = {}
            total_dif = 0  # Verbrauch der Siedlung
            for house_key in houses:
                house_verbrauch = houses[house_key].max_consumption
                * verbrauch_haus + charge_cars * 0.04
                house_erzeugung = houses[house_key].solar_space
                * erzeugung_solar
                difference = house_erzeugung - house_verbrauch
                dif[house_key] = difference
                total_dif = total_dif + difference
            print(dif)
            print(total_dif)
            storage.startCharging(total_dif)
            print(storage.capacity)
            time.sleep(2)
            hours += 1
            print(hours)
            verbrauchfirma = firma.solar_space * erzeugung_solar
            + windpark.windenergy * erzeugung_wind
            - firma.max_consumption * verbrauch_firma
            print("Firma ", verbrauchfirma)
            total_dif = total_dif + verbrauchfirma   
            print("Endverbrauch ", total_dif)
            ledStrip.stromfluss(Color(255, 0, 0), 0.5, hardware.house1, hardware.storage)

    except KeyboardInterrupt:
        pass
