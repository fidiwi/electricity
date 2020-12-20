import time
import hardware
from rpi_ws281x import Color

houses = {}

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
    def __init__(self, max_consumption, solar_space, slot):
        self.max_consumption = max_consumption  # Maximaler Verbrauch in kW(h)
        self.solar_space = solar_space  # Solarenergie -> Leistung
        self.way = hardware.ways[slot]  # Wähle den Weg des zugehörigen Slots


class Apartment(House):
    def __init__(self, slot):
        super().__init__(5.7, 12.5, slot)


class Einfamilienhaus(House):
    def __init__(self, slot):
        super().__init__(1.2, 18.75, slot)          


class Reihenhaus(House):
    def __init__(self, slot):
        super().__init__(1.5, 3.75, slot)


class Mehrfamilienhaus(House):
    def __init__(self, slot):
        super().__init__(4, 8.75, slot)


class Storage():
    def __init__(self, capacity, min, max):
        self.capacity = capacity
        self.min = min
        self.max = max

    def startCharging(self, power):  # Power ist die abzugebende Leistung (kW)
        self.capacity += power
        hauptleitung = 0
        if self.capacity > self.max:
            self.capacity = self.max
            hauptleitung += power
            print("full")
        if self.capacity < self.min:
            self.capacity = self.min
            hauptleitung += power
            print("empty")
    

class Firma(House):
    def __init__(self, slot):
        super().__init__(20, 20, slot)  # Zahlen für den
        # Verbrauch einsetzen


class Windpark(House):
    def __init__(self):
        self.windenergy = 50 # maximale Produktion
        self.way = hardware.ways[6]


def speed(dif):
    if abs(dif) > 10:
        dif = 10
    difference = abs(dif) * 0.1
    return difference



def calcled(i, j, vb_sortiert, keys): #i = erstes haus von links; j = rechtes haus in der list
    global houses
    if vb_sortiert[keys[i]] > 0 and vb_sortiert[keys[j]] < 0:  # Wenn i erzeugt und j verbraucht
        if vb_sortiert[keys[i]] + vb_sortiert[keys[j]] > 0:  # Wenn i den Verbrauch von j mehr als decken kann
            ledStrip.stromfluss(Color(0, 50, 0), speed(vb_sortiert[keys[j]]), houses[i].way, houses[j].way)
            vb_sortiert[keys[i]] += vb_sortiert[keys[j]]  # Erzeugung von j mit dem Verbrauch von i subtrahieren
            j -= 1  # Springe zum nächsten verbrauchenden Haus
            if not i > j:
                calcled(i, j, vb_sortiert, keys)
        else:
            ledStrip.stromfluss(Color(0, 50, 0), speed(vb_sortiert[keys[i]]), houses[i].way, houses[j].way)
            vb_sortiert[keys[j]] += vb_sortiert[keys[i]]  # Verbrauch von i mit der Erzeugung von j senken
            i += 1  # Springe zum nächsten erzeugenden Haus
            if not i > j:
                calcled(i, j, vb_sortiert, keys)
    
    elif vb_sortiert[keys[i]] > 0 and vb_sortiert[keys[j]] > 0:  # Wenn i und j erzeugen
        if storage.capacity < 350:
            while not i > j:  # j+1, da auch das house[j] angezeigt werden muss
                if not i == 3:
                    ledStrip.stromfluss(Color(0, 150, 50), speed(vb_sortiert[keys[i]]), houses[i].way, houses[3].way)
                i += 1
        else:
            while not i > j:
                ledStrip.stromfluss(Color(0, 0, 50), speed(vb_sortiert[keys[i]]), houses[i].way, hardware.end)
                i += 1

    else: #  Wenn beide verbrauchen
        if storage.capacity > 0:
            while not i > j:
                if not i == 3:
                    ledStrip.stromfluss(Color(80, 50, 0), speed(vb_sortiert[keys[i]]), houses[3].way, houses[i].way)
                i += 1
        else:
            while not i > j:
                ledStrip.stromfluss(Color(50, 0, 0), speed(vb_sortiert[keys[i]]), hardware.begin, houses[i].way)
                i += 1


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

    # Häuser mit jeweiligen Slots, jeder Slot nur einmal!!
    houses[0] = Einfamilienhaus(0)
    houses[1] = Reihenhaus(1)
    houses[2] = Reihenhaus(2)
    houses[3] = Apartment(3)
    houses[4] = Mehrfamilienhaus(4)
    firma = Firma(5)
    windpark = Windpark()
    houses[5] = firma
    

    ledStrip = hardware.LEDStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ,
                                 LED_DMA, LED_INVERT, LED_BRIGHTNESS,
                                 LED_CHANNEL)
    ledStrip.begin()
    try:

        while True:
            updatePotiValues()
            dif = {}
            total_dif = 0  # Verbrauch der Siedlung
            for house_key in houses:
                house_verbrauch = houses[house_key].max_consumption * verbrauch_haus + charge_cars * 0.04
                house_erzeugung = houses[house_key].solar_space * erzeugung_solar
                difference = house_erzeugung - house_verbrauch
                dif[house_key] = difference
                total_dif = total_dif + difference
            print(dif)
            print(total_dif)
            storage.startCharging(total_dif)
            print("storage: ", storage.capacity)
            hours += 1
            print(hours)
            verbrauchfirma = firma.solar_space * erzeugung_solar
            + windpark.windenergy * erzeugung_wind
            - firma.max_consumption * verbrauch_firma
            print("Firma ", verbrauchfirma)
            total_dif = total_dif + verbrauchfirma   
            print("Endverbrauch ", total_dif)
            # ledStrip.stromfluss(Color(50, 0, 0), 0.5, houses[1].way, houses[4].way)

            #led rechnen            
            housevb = []
            for i in range(6):
                housevb.append(-(houses[i].max_consumption * verbrauch_haus + charge_cars * 0.04) + houses[i].solar_space * erzeugung_solar)
            
            dic = {houses[0]: housevb[0], houses[1]: housevb[1], houses[2]: housevb[2], houses[3]: housevb[3], houses[4]: housevb[4], houses[5]: housevb[5]}
            vb_sortiert = {k: v for k, v in sorted(dic.items(), key=lambda item: item[1], reverse=True)}
            keys = list(vb_sortiert.keys())
            print("sortierte Liste: ", vb_sortiert)
            #keys = list(vb_sotiert.keys())

            # Wichtig: Bei der Benutzung von stromfluss() wie folgt vorgehen:
            # stromfluss(FARBE, SPEED, SENDER_WEG, EMPFÄNGER_WEG)
            # Empfänger- und Senderwege werden dabei wie folgt abgerufen:
            #                     >> houses[x].way <<

            # Der Verbrauch eines bestimmten Hauses wird in dem Dict abgerufen mit:
            #                 >> vb_sortiert[houses[x]] <<

            # Beachte hierbei, dass houses[] ein dict ist und die Nummerierung bei 1 startet,
            # nicht bei 0. (Also 1-5 statt 0-4).
            # Der Weg des Storage ist abrufbar mit:
            #                    >> houses[3].way <<
            # houses[6].way = firma     houses[7].way = wind
            
            """name = [hardware.house1, hardware.house2, hardware.house3, hardware.storage, hardware.house5]
            pos = 0
            print(housevb) # verbrauch UND name wird sortiert
            for a in range(5):
                max = housevb[a]
                for b in range(1+a, 5):
                    if max > housevb[b]:
                        max = housevb[b]
                        pos = b

                tausch = housevb[a]
                housevb[a] = max
                housevb[pos] = tausch
                tausch = name[a]
                name[a] = name[pos]
                name[pos] = tausch"""
            
            if vb_sortiert[keys[5]] > 0:
                if storage.capacity < 350:
                    for i in range(6):
                        if not i == 3:
                            ledStrip.stromfluss(Color(0, 150, 50), speed(vb_sortiert[keys[i]]), houses[i].way, houses[3].way)
                else:
                    for i in range(6):
                        ledStrip.stromfluss(Color(0, 0, 50), speed(vb_sortiert[keys[0]]), houses[i].way, hardware.end)

            elif vb_sortiert[keys[0]] < 0:
                if storage.capacity > 0:
                    for i in range(6):
                        if not i == 3:
                            ledStrip.stromfluss(Color(80, 50, 0), speed(vb_sortiert[keys[i]]), houses[3].way, houses[i].way)
                else:
                    for i in range(6):
                        ledStrip.stromfluss(Color(50, 0, 0), speed(vb_sortiert[keys[i]]), hardware.begin, houses[i].way)

            elif vb_sortiert[keys[0]] > 0 and vb_sortiert[keys[5]] < 0:
                calcled(0, 5, vb_sortiert, keys)
            
            else:
                ledStrip.stromfluss(Color(50, 50, 50), speed(10), windpark.way, houses[3].way)


            time.sleep(2)
            

    except KeyboardInterrupt:
        pass
