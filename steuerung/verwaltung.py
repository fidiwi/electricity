

class House:
    def __init__(self, max_consumption, solar_space, cars):
        self.max_consumption = max_consumption  # Maximaler Verbrauch in kW(h)
        self.solar_space = solar_space  # Solarfläche (optimale Einstellung)
        self.cars = cars  # Anzahl der E-Autos des Hauses
    

class Apartment(House):
    def __init__(self):
        super().__init__(max_consumption=80, solar_space=100,
                         cars=5)

class Einfamilienhaus(House):
    def __init__(self):
        super().__init__(max_consumption=15, solar_space=175,
                         cars=2)
                        
class Reihenhaus(House):
    def __init__(self):
        super().__init__(max_consumption=10, solar_space=40,
                         cars=1)

class Mehrfamilienhaus(House):
    def __init__(self):
        super().__init__(max_consumption=60, solar_space=70,
                         cars=6)

class Storage:
    def __init__(self):
        self.size = size



    def startCharging(power):  # Power ist die abzugebende Leistung (kW)
        pass


if __name__ == "__main__":
    houses = {}

    verbrauch = 0.75
    erzeugung = 0.5

    houses[1] = Apartment()
    houses[2] = Reihenhaus()
    houses[3] = Reihenhaus()
    houses[4] = Einfamilienhaus()
    houses[5] = Mehrfamilienhaus()

    dif = {}
    total_dif = 0 # Verbrauch der Siedlung
    for house_key in houses:
        house_verbrauch = houses[house_key].max_consumption * verbrauch + houses[house_key].cars * 11 # mit Autos
        house_erzeugung = houses[house_key].solar_space * erzeugung
        difference = house_erzeugung - house_verbrauch
        dif[house_key] = difference
        total_dif = total_dif + difference
        print(difference)
    print(dif)
    print(total_dif)