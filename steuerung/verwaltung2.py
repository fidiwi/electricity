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
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

storage = 0

verbrauch_hausliste = [0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.5, 0.7, 0.8, 0.6, 0.5, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.8, 0.8, 0.6, 0.5, 0.4, 0.3]
erzeugung_solarliste = [0, 0, 0, 0, 0, 0, 0, 0.07, 0.28, 0.49, 0.63, 0.73, 0.3, 0.8, 0.76, 0.68, 0.52, 0.31, 0.24, 0.07, 0.05, 0, 0, 0]
erzeugung_windliste = [0.61, 0.5, 0.5, 0.39, 0.39, 0.33, 0.39, 0.39, 0.5, 0.61, 0.72, 0.83, 0.83, 0.94, 0.94, 0.94, 1.06, 1.06, 0.94, 0.94, 0.72, 0.61, 0.5, 0.5]

class House:
    def __init__(self, max_consumption, solar_space, slot, carsCurrentlyCharging):
        self.max_consumption = max_consumption  # Maximaler Verbrauch in kW(h)
        self.solar_space = solar_space  # Solarenergie -> Leistung
        self.way = hardware.ways[slot]  # Wähle den Weg des zugehörigen Slots
        self.slot = slot
        self.carsCurrentlyCharging = carsCurrentlyCharging

    def setCarsCharging(self, carsCharging):
        self.carsCurrentlyCharging = carsCharging


class Apartment(House):
    def __init__(self, slot):
        super().__init__(5.7, 12.5, slot, 0)


class Einfamilienhaus(House):
    def __init__(self, slot):
        super().__init__(1.2, 18.75, slot, 0)


class Reihenhaus(House):
    def __init__(self, slot):
        super().__init__(1.5, 3.75, slot, 0)


class Mehrfamilienhaus(House):
    def __init__(self, slot):
        super().__init__(4, 8.75, slot, 0)


class Firma(House):
    def __init__(self, slot):
        super().__init__(16, 20, slot, 0)  # Zahlen für den
        # Verbrauch einsetzen


class Windpark():
    def __init__(self, slot):
        self.windenergy = 5  # maximale Produktion
        self.way = hardware.ways[slot]
        self.slot = slot


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


def speed(dif):
    if abs(dif) > 10:
        dif = 10
    difference = abs(dif) * 0.1
    return difference


def calcled(i, j, vb_sortiert, keys):  # i = erstes haus von links; j = rechtes haus in der list
    global houses
    sender = []
    receiver = []
    speedSR = 0
    speedTeiler = 1

    if vb_sortiert[keys[i]] >= 0 and vb_sortiert[keys[j]] < 0:  # Wenn i erzeugt und j verbraucht
        summe = 0
        if vb_sortiert[keys[i]] + vb_sortiert[keys[j]] > 0:  # Wenn i den Verbrauch von j mehr als decken kann
            # em = j
            while abs(vb_sortiert[keys[i]]) > summe:
                if not i > j and vb_sortiert[keys[j]] < 0:
                    summe += abs(vb_sortiert[keys[j]])
                    speedSR += vb_sortiert[keys[j]]
                    speedTeiler += 1
                    receiver += [keys[j].way]
                    print("receiver: ", receiver)
                    j -= 1
                else:
                    break
            ledStrip.stromfluss(Color(0, 50, 0), speed(speedSR/speedTeiler), keys[i].way, receiver)
            vb_sortiert[keys[i]] -= summe  # Erzeugung von i mit dem Verbrauch von j subtrahieren
            # j -= 1  # Springe zum nächsten verbrauchenden Haus
            if not i > j:
                calcled(i, j, vb_sortiert, keys)
        else:
            while abs(vb_sortiert[keys[j]]) > summe:
                if not i > j and vb_sortiert[keys[i]] > 0:
                    summe += abs(vb_sortiert[keys[i]])
                    speedSR += vb_sortiert[keys[i]]
                    speedTeiler += 1
                    sender += [keys[i].way]
                    print("sender: ", sender)
                    i += 1
                else:
                    break
            ledStrip.stromfluss(Color(0, 50, 0), speed(speedSR/speedTeiler), sender, keys[j].way)
            vb_sortiert[keys[j]] += summe  # Verbrauch von j mit der Erzeugung von i senken
            # i += 1  # Springe zum nächsten erzeugenden Haus
            if not i > j:
                calcled(i, j, vb_sortiert, keys)

    elif vb_sortiert[keys[i]] >= 0 and vb_sortiert[keys[j]] >= 0:  # Wenn i und j erzeugen
        if storage.capacity < 350:
            while not i > j:  # j+1, da auch das house[j] angezeigt werden muss
                if not keys[i].slot == 3:
                    speedSR += vb_sortiert[keys[i]]
                    speedTeiler += 1
                    sender += [keys[i].way]
                i += 1
            ledStrip.stromfluss(Color(0, 150, 50), speed(speedSR/speedTeiler), sender, houses[3].way)
        else:
            while not i > j:
                speedSR += vb_sortiert[keys[i]]
                speedTeiler += 1
                sender += [keys[i].way]
                i += 1
            ledStrip.stromfluss(Color(0, 0, 50), speed(speedSR/speedTeiler), sender, hardware.end)

    else:  # Wenn beide verbrauchen
        if storage.capacity > 0:
            while not i > j:
                if not (keys[i].slot == 3 or keys[i].slot == 6):
                    speedSR += vb_sortiert[keys[i]]
                    speedTeiler += 1
                    receiver += [keys[i].way]
                i += 1
            ledStrip.stromfluss(Color(80, 50, 0), speed(speedSR/speedTeiler), houses[3].way, receiver)
        else:
            while not i > j:
                if not keys[i].slot == 6:
                    speedSR += vb_sortiert[keys[i]]
                    speedTeiler += 1
                    receiver += [keys[i].way]
                i += 1
            ledStrip.stromfluss(Color(50, 0, 0), speed(speedSR/speedTeiler), hardware.begin, receiver)


if __name__ == "__main__":
    houses = {}
    storage = Storage(200, 0, 350)

    verbrauchfirma = 0

    ladeleistung = 11  # in kW

    # Häuser mit jeweiligen Slots, jeder Slot nur einmal!!
    houses[0] = Einfamilienhaus(0)
    houses[1] = Reihenhaus(1)
    houses[2] = Reihenhaus(2)
    houses[3] = Apartment(3)
    houses[4] = Mehrfamilienhaus(4)
    houses[5] = Firma(5)
    windpark = Windpark(6)

    ledStrip = hardware.LEDStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ,
                                 LED_DMA, LED_INVERT, LED_BRIGHTNESS,
                                 LED_CHANNEL)
    ledStrip.begin()

    Stunde = 0

    for z in range(24):
        verbrauch_haus = verbrauch_hausliste[Stunde]
        erzeugung_solar = erzeugung_solarliste[Stunde]
        erzeugung_wind = erzeugung_windliste[Stunde]

        houses[1].setCarsCharging(0)
        # led rechnen
        housevb = []
        for i in range(5):
            housevb.append(-(houses[i].max_consumption * verbrauch_haus + houses[i].carsCurrentlyCharging * ladeleistung) + houses[i].solar_space * erzeugung_solar)
        # Windpark
        housevb.append(windpark.windenergy * erzeugung_wind)

        # Firma Produktivität festlegen
        if Stunde > 5 and Stunde < 22:
            dif = houses[5].solar_space * erzeugung_solar
            for vb in housevb:
                dif += vb

            print("dif: ", dif)
            verbrauch_firma = 0.5
            if dif > houses[5].max_consumption / 2:
                verbrauch_firma = dif/houses[5].max_consumption
                if dif > houses[5].max_consumption:
                    verbrauch_firma = 1
            print("verbrauch_firma: ", verbrauch_firma)
        else:
            verbrauch_firma = 0

        # Firma
        housevb.append(-(houses[5].max_consumption * verbrauch_firma) + houses[5].solar_space * erzeugung_solar)

        dic = {houses[0]: housevb[0], houses[1]: housevb[1], houses[2]: housevb[2], houses[3]: housevb[3], houses[4]: housevb[4], houses[5]: housevb[6], windpark: housevb[5]}
        vb_sortiert = {k: v for k, v in sorted(dic.items(), key=lambda item: item[1], reverse=True)}

        print(dic)
        # Items mit VB = 0
        keys_with_zero = []
        for key in vb_sortiert.keys():
            if vb_sortiert[key] == 0:
                keys_with_zero.append(key)
        for key in keys_with_zero:
            del vb_sortiert[key]

        keys = list(vb_sortiert.keys())

        total_dif = 0  # Verbrauch der Siedlung

        for items in vb_sortiert.values():
            total_dif += items
            print(items)

        if Stunde < 6 and Stunde > 21:
            total_dif -= 11

        storage.startCharging(total_dif)

        print("storage: ", storage.capacity)
        print("Totale Differenz: ", total_dif)
        print(vb_sortiert)
        calcled(0, len(vb_sortiert) - 1, vb_sortiert, keys)

        # hardware.sonne(erzeugung_solar)
        Stunde += 1
        if Stunde == 24:
            Stunde = 0
        time.sleep(2)
