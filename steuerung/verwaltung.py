

class House:
    def __init__(self, max_consumption, solar_space, cars):
        self.max_consumption = max_consumption  # Maximaler Verbrauch in kW(h)
        self.solar_space = solar_space  # Solarfläche (optimale Einstellung)
        self.cars = cars  # Anzahl der E-Autos des Hauses
    

class Apartment(House):
    def __init__(self):
        super().__init__(max_consumption=80, solar_space=100,
                         cars=5)


class Storage:
    def __init__(self, size):
        self.size = size

    def startCharging(power):  # Power ist die abzugebende Leistung (kW)
        pass


if __name__ == "__main__":
    houses = {}

    verbrauch = 0.75
    erzeugung = 0.2

    apartment = Apartment()
    houses[1] = apartment
    houses[2] = apartment
    houses[3] = House(10, 1000, 0)
    houses[4] = apartment
    houses[5] = apartment

    dif = {}
    for house_key in houses:
        house_verbrauch = houses[house_key].max_consumption * verbrauch + houses[house_key].cars * 11
        house_erzeugung = houses[house_key].solar_space * erzeugung
        difference = house_erzeugung - house_verbrauch
        dif[house_key] = difference
        print(difference)
    print(dif)