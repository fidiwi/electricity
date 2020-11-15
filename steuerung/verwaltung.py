import time

class House:
    def __init__(self, max_consumption, solar_space):
        self.max_consumption = max_consumption  # Maximaler Verbrauch in kW(h)
        self.solar_space = solar_space  # Solarenergie -> Leistung

class Apartment(House):
    def __init__(self):
        super().__init__(max_consumption=80, solar_space=100)

class Einfamilienhaus(House):
    def __init__(self):
        super().__init__(max_consumption=15, solar_space=175)          

class Reihenhaus(House):
    def __init__(self):
        super().__init__(max_consumption=10, solar_space=40)

class Mehrfamilienhaus(House):
    def __init__(self):
        super().__init__(max_consumption=60, solar_space=70)

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



if __name__ == "__main__":
    houses = {}
    storage = Storage(200, 0, 350)

    verbrauch = 0.75
    erzeugung = 0.5
    charge_cars = 5 # wie viele Autos gerade aufgeladen werden

    houses[1] = Apartment()
    houses[2] = Reihenhaus()
    houses[3] = Reihenhaus()
    houses[4] = Einfamilienhaus()
    houses[5] = Mehrfamilienhaus()
    try:

        while True:
            dif = {}
            total_dif = 0 # Verbrauch der Siedlung
            for house_key in houses:
                house_verbrauch = houses[house_key].max_consumption * verbrauch + charge_cars * 11 / 5 # mit Autos
                house_erzeugung = houses[house_key].solar_space * erzeugung
                difference = house_erzeugung - house_verbrauch
                dif[house_key] = difference
                total_dif = total_dif + difference
                print(difference)
            print(dif)
            print(total_dif)
            storage.startCharging(total_dif)
            print(storage.capacity)
            time.sleep(1)
    except KeyboardInterrupt:
        pass