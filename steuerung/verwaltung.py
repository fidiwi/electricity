import time
#import hardware


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
        super().__init__(max_consumption=20, solar_space=20) #Zahlen einsetzen für den Verbrauch


class Windpark():
    def __init__(self):
        self.windenergy = 50 #maximale Produktion


def updatePotiValues():
    global verbrauch_haus = 0.5 #hardware.getAnalogPercent(0) 
    global erzeugung_solar = 0.25 #hardware.getAnalogPercent(1)  
    global verbrauch_firma = 1 #hardware.getAnalogPercent(2)  
    global erzeugung_wind = 0.5 #hardware.getAnalogPercent(3)
    global preis_vorhersage = 0 #hardware.getAnalogPercent(4)

if __name__ == "__main__":
    houses = {}
    storage = Storage(200, 0, 350)

    verbrauchfirma = 0

    verbrauch_haus = 0.5 #hardware.getAnalogPercent(0) 
    erzeugung_solar = 0.25 #hardware.getAnalogPercent(1)  
    verbrauch_firma = 1 #hardware.getAnalogPercent(2)  
    erzeugung_wind = 0.5 #hardware.getAnalogPercent(3)
    preis_vorhersage = 0 #hardware.getAnalogPercent(4)
    charge_cars = 15 # wie viele Autos gerade aufgeladen werden
    hours = 0

    houses[1] = Apartment()
    houses[2] = Reihenhaus()
    houses[3] = Reihenhaus()
    houses[4] = Einfamilienhaus()
    houses[5] = Mehrfamilienhaus()
    firma = Firma()
    windpark = Windpark()
    try:

        while True:
            dif = {}
            total_dif = 0 # Verbrauch der Siedlung
            for house_key in houses:
                house_verbrauch = houses[house_key].max_consumption * verbrauch_haus + charge_cars * 0.04
                house_erzeugung = houses[house_key].solar_space * erzeugung_solar
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
            verbrauchfirma = firma.solar_space * erzeugung_solar + windpark.windenergy * erzeugung_wind - firma.max_consumption * verbrauch_firma
            print("Firma ",verbrauchfirma)
            total_dif = total_dif + verbrauchfirma        
            print("Endverbrauch ",total_dif)

    except KeyboardInterrupt:
        pass