import time
import hardware


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
        super().__init__(max_consumption=4, solar_space=8.75)



if __name__ == "__main__":
    houses = {}
    storage = Storage(200, 0, 350)

    verbrauch_haus = hardware.getAnalogPercent(0)  # 0.5
    erzeugung_haus = hardware.getAnalogPercent(1)  # 0.2
    verbrauch_firma = hardware.getAnalogPercent(2)  
    erzeugung_firma = hardware.getAnalogPercent(3)
    preis_vorhersage = hardware.getAnalogPercent(4)
    charge_cars = 15 # wie viele Autos gerade aufgeladen werden
    hours = 0

    houses[1] = Apartment()
    houses[2] = Reihenhaus()
    houses[3] = Reihenhaus()
    houses[4] = Einfamilienhaus()
    houses[5] = Mehrfamilienhaus()
    firma = Firma()
    try:

        while True:
            dif = {}
            total_dif = 0 # Verbrauch der Siedlung
            for house_key in houses:
                house_verbrauch = houses[house_key].max_consumption * verbrauch_haus + charge_cars * 0.04
                house_erzeugung = houses[house_key].solar_space * erzeugung_haus
                difference = house_erzeugung - house_verbrauch
                dif[house_key] = difference
                total_dif = total_dif + difference
            print(dif)
            print(total_dif)
            storage.startCharging(total_dif)
            print(storage.capacity)
            time.sleep(1)
            hours+=1
            print(hours)
            total_dif = total_dif + firma.max_consumption * verbrauch_firma - firma.solar_space * erzeugung_firma
            print(total_dif)
    except KeyboardInterrupt:
        pass