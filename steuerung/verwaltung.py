import time
import hardware
import socketio
from rpi_ws281x import Color

sio = socketio.Client()

houses = {}
carData = []

SOCKETIO_ENDPOINT = "https://blattgruen.eu:4001"

# LED strip configuration:
LED_COUNT      = 180     # Number of LED pixels.
LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
#LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

verbrauch_haus = None
erzeugung_solar = None
verbrauch_firma = None
erzeugung_wind = None
preis_vorhersage = None

hausA = None
sunA = None
firmaA = None
windA = None
preisA = None

hours = 0
studie = True

verbrauch_hausliste_studie = [0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.5, 0.7, 0.8, 0.6, 0.5, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.8, 0.8, 0.6, 0.5, 0.4, 0.3]
erzeugung_solarliste_studie = [0, 0, 0, 0, 0, 0, 0, 0.07, 0.28, 0.49, 0.63, 0.73, 0.3, 0.8, 0.76, 0.68, 0.52, 0.31, 0.24, 0.07, 0.05, 0, 0, 0]
erzeugung_windliste_studie = [0.61, 0.5, 0.5, 0.39, 0.39, 0.33, 0.39, 0.39, 0.5, 0.61, 0.72, 0.83, 0.83, 0.94, 0.94, 0.94, 1.06, 1.06, 0.94, 0.94, 0.72, 0.61, 0.5, 0.5]


@sio.event
def connect():
    print("Connected to Socket!")
    sio.emit("raspberry")
    startScript()


@sio.on("FromAPI")
def message(data):
    if not studie:
        updateDBPotiValues(data)

@sio.on("houses")
def message(data):
    if not studie:
        for item in data:
            houses[item['id'] - 1] = house_id[item['house']](item['id']-1)

@sio.on("cars")
def message(data):
    if not studie:
        global carData
        carData = []
        for dataset in data:
            newDataset = dataset
            startTime = int(dataset["start"][:2])
            endTime = int(dataset["end"][:2])

            newDataset["start"] = startTime
            newDataset["end"] = endTime

            if startTime > endTime:
                newDataset["dif"] = (endTime + 24) - startTime
            else:
                newDataset["dif"] = endTime - startTime
            carData.append(newDataset)


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

house_id = {0: Apartment, 1: Reihenhaus, 2: Mehrfamilienhaus, 3: Einfamilienhaus}


class Firma(House):
    def __init__(self, slot):
        super().__init__(16, 20, slot, 0)  # Zahlen für den
        # Verbrauch einsetzen


class Windpark():
    def __init__(self, slot):
        self.windenergy = 20  # maximale Produktion
        self.way = hardware.ways[slot]
        self.slot = slot


class Storage():
    def __init__(self, capacity, min, max):
        self.capacity = capacity
        self.min = min
        self.max = max
        self.hlabgeben = {}
        self.hlnehmen = {}
        for i in range(24):
            self.hlabgeben[i] = 0
            self.hlnehmen[i] = 0


    def startCharging(self, power):  # Power ist die abzugebende Leistung (kW)
        self.capacity += power
        if self.capacity > self.min and self.capacity < self.max:
            self.hlabgeben[hours%24] = 0
            self.hlnehmen[hours%24] = 0
        if self.capacity > self.max:
            self.hlabgeben[hours%24] = self.capacity-self.max
            self.hlnehmen[hours%24] = 0
            self.capacity = self.max
        if self.capacity < self.min:
            self.hlabgeben[hours%24] = 0
            self.hlnehmen[hours%24] = abs(self.capacity)
            self.capacity = self.min
        
        abgabe = 0
        beziehen = 0
        for key in range(24):
            abgabe += self.hlabgeben[key]
            beziehen += self.hlnehmen[key]
        sio.emit("storageChange", {'value': self.capacity})
        sio.emit("hlChange", {"abgabe": abgabe, "annahme": beziehen})


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


def estatus(dif, storage):
    status = 0
    if abs(dif) < 2 and storage.capacity > storage.min + 49 and storage.capacity < storage.max - 49:
        status = 0
    elif abs(dif) < 2 and storage.capacity > storage.min and storage.capacity < storage.max:
        status = 1
    elif abs(dif) < 10 and storage.capacity > storage.min + 49 and storage.capacity < storage.max - 49:
        status = 1
    elif abs(dif) < 10 and storage.capacity > storage.min and storage.capacity < storage.max:
        status = 2
    elif abs(dif) < 25 and storage.capacity > storage.min + 49 and storage.capacity < storage.max - 49:
        status = 2
    elif abs(dif) < 25 and storage.capacity > storage.min and storage.capacity < storage.max:
        status = 3
    elif abs(dif) >= 25 and storage.capacity > storage.min + 49 and storage.capacity < storage.max - 49:
        status = 3
    elif abs(dif) >= 25 and storage.capacity > storage.min and storage.capacity < storage.max:
        status = 4
    elif abs(dif) < 25 and (storage.capacity == storage.min or storage.capacity == storage.max):
        status = 4
    elif abs(dif) >= 25 and (storage.capacity == storage.min or storage.capacity == storage.max):
        status = 5
    else:
        status = "error"

    if dif < -2:
        status = status * -1
    sio.emit("estatusChange", status)


class Kreisdiagramm():
    def __init__(self):
        self.values = [[], [], [], [], [], [], []]
        for i in range(7):
            for j in range(24):
                self.values[i].append({"abgabe": 0, "annahme": 0})
    def addValue(self, dic):
        abgabe = []
        annahme = []
        for item in dic.keys():
            if dic[item] >= 0:
                self.values[item.slot][hours%24] = {"abgabe": dic[item], "annahme": 0}
            else:
                self.values[item.slot][hours%24] = {"abgabe": 0, "annahme": abs(dic[item])}
            tempAbgabe = 0
            tempAnnahme = 0
            for value in self.values[item.slot]:
                tempAbgabe += value["abgabe"]
                tempAnnahme += value["annahme"]
            abgabe.append(tempAbgabe)
            annahme.append(tempAnnahme)
        sio.emit("sendersChange", {"abgabe": abgabe, "annahme": annahme})


class Planner():
    def __init__(self):
        self.plan = {}
    # Plane die zukünftige Autoaufladung für das schlimmste Szenario

    # Erstellen eines Plans {id: {last: spätester Ladezeitpunkt, first: Frühester Ladezeitpunkt}}
    def makePlan(self, hours):

        endTimes = {}
        
        if hours%48 == 24:
            # Endzeiten der ersten 8 Datensätze
            for i in range(8):
                endTimes[i] = carData[i]["end"]
        elif hours%48 == 0:
            # Endzeiten der letzten 7 Datensätze
            for i in range(8, 15):
                endTimes[i] = carData[i]["end"]
        
        # Endzeiten reversed sortieren (23, 22, ...)
        endTimes = {k: v for k, v in sorted(endTimes.items(), key=lambda item: item[1], reverse=True)}
        keys = list(endTimes.keys())

        i = 0
        verzug = 1
        while i < len(keys) - 1:
    
            # Wenn aktuelle Endzeit min. 1h von nächstem Wert entfernt ist
            if endTimes[keys[i]] - 1 >= endTimes[keys[i+1]] :
                self.plan[keys[i]] = {"last": endTimes[keys[i]] - verzug, "first": carData[keys[i]]["start"]}

                i += 1
            else:
                # Gleiche Endzeiten (Dif < 1) zusammentragen
                eqElementsDif = {}
                eqElementsDif[keys[i]] = carData[keys[i]]["dif"]
                j = i+1
                while endTimes[keys[i]] == endTimes[keys[j]] and j < len(endTimes):
                    eqElementsDif[keys[j]] = carData[keys[j]]["dif"]
                    j+=1
                eqElementsDif = {k: v for k, v in sorted(eqElementsDif.items(), key=lambda item: item[1])}
                equalKeys = list(eqElementsDif.keys())
                for equalKey in equalKeys:
                    self.plan[equalKey] = {"last": endTimes[equalKey] - equalKeys.index(equalKey) - verzug, "first": carData[equalKey]["start"]}
                    verzug += 1

                i = j
        self.plan[keys[-1]] = {"last": endTimes[keys[-1]] - 1, "first": carData[keys[-1]]["start"]}
        return self.plan

                        

def checkPotiValues():
    global verbrauch_haus
    global erzeugung_solar
    global verbrauch_firma
    global erzeugung_wind
    global preis_vorhersage

    global hausA
    global sunA
    global firmaA
    global windA
    global preisA

    global verbrauch_hausliste_studie
    global erzeugung_solarliste_studie
    global erzeugung_windliste_studie

    mVerbrauch_haus = hardware.getAnalogPercent(0)
    mErzeugung_solar = hardware.getAnalogPercent(1)
    mVerbrauch_firma = hardware.getAnalogPercent(2)
    mErzeugung_wind = hardware.getAnalogPercent(3)
    mPreis_vorhersage = hardware.getAnalogPercent(4)

    new = [mVerbrauch_haus, mErzeugung_solar, mVerbrauch_firma, mErzeugung_wind, mPreis_vorhersage]
    old = [hausA, sunA, firmaA, windA, preisA]
    tags = ["housevb", "sun", "companyvb", "wind", "ekarma"]

    for i in range(5):
        if abs(new[i] - old[i]) > .02:
            sio.emit("rangeChange", {'param':tags[i], 'value': new[i]})
            if i == 0:
                verbrauch_haus = new[i]
            elif i == 1:
                erzeugung_solar = new[i]
            #elif i == 2:
                #verbrauch_firma = new[i]
            elif i == 3:
                erzeugung_wind = new[i]
            elif i == 4:
                preis_vorhersage = new[i]
        old[i] = new[i]

    print("Verbrauch Haus ", verbrauch_haus)
    print("Solar ", erzeugung_solar)
    print("Verbrauch Firma ", verbrauch_firma)
    print("Wind ", erzeugung_wind)
    print("Preisvorhersage ", preis_vorhersage)


def updateDBPotiValues(data):
    global verbrauch_haus
    global erzeugung_solar
    global verbrauch_firma
    global erzeugung_wind
    global preis_vorhersage

    verbrauch_haus = data['housevb']
    erzeugung_solar = data['sun']
    #verbrauch_firma = data['companyvb']
    erzeugung_wind = data['wind']
    preis_vorhersage = data['ekarma']
    print(data)

def showDemo():
    ledStrip.showDemo()

def startScript():
    plan = {}
    try:
        while True:
            global verbrauch_haus
            global erzeugung_solar
            global verbrauch_firma
            global erzeugung_wind
            global preis_vorhersage
            global hours
            global houses
            global studie

            if hours == 24 and studie:
                studie = False
                sio.disconnect()
                print("Studie beendet.")
                return

            total_dif = 0  # Verbrauch der Siedlung

            if not studie:
                checkPotiValues()
            else:
                verbrauch_haus = verbrauch_hausliste_studie[hours]
                erzeugung_solar = erzeugung_solarliste_studie[hours]
                erzeugung_wind = erzeugung_windliste_studie[hours] / 4
            
            if hours%24 == 0 and not studie:
                plan = planner.makePlan(hours)
                print("Plan: ", plan)
            elif hours == 0 and studie:
                plan = {0: {"last": 22, "first": 22}, 1: {"last": 23, "first": 22}, 2: {"last": 0, "first": 22}, 3: {"last": 1, "first": 22}, 4: {"last": 2, "first": 22}, 5: {"last": 3, "first": 22}, 6: {"last": 4, "first": 22}, 7: {"last": 5, "first": 22}}
                

            # led rechnen
            housevb = []
            for i in range(5):
                housevb.append(-(houses[i].max_consumption * verbrauch_haus) + houses[i].solar_space * erzeugung_solar)
            # Windpark
            housevb.append(windpark.windenergy * erzeugung_wind)

            # Firma Produktion festlegen
            dif = houses[5].solar_space * erzeugung_solar
            for vb in housevb:
                dif += vb

            print("Plan vorher: ", plan)
            for entry in list(plan.keys()):
                if hours%24 == plan[entry]["last"]:
                    dif -= 11
                    total_dif -= 11
                    del plan[entry]
            print("Plan nachher: ", plan)
            
            # Firma Produktiviät errechnen
            print("dif: ", dif)
            if hours%24 > 5 and hours%24 <22:
                verbrauch_firma = 0.5
                if dif > houses[5].max_consumption / 2:
                    verbrauch_firma = dif/houses[5].max_consumption
                    if dif > houses[5].max_consumption:
                        verbrauch_firma = 1
            else:
                verbrauch_firma = 0
            print("verbrauch_firma: ", verbrauch_firma)
            sio.emit("companyChange", verbrauch_firma)


            # Firma
            housevb.append(-(houses[5].max_consumption * verbrauch_firma) + houses[5].solar_space * erzeugung_solar)

            dic = {houses[0]: housevb[0], houses[1]: housevb[1], houses[2]: housevb[2], houses[3]: housevb[3], houses[4]: housevb[4], houses[5]: housevb[6], windpark: housevb[5]}
            vb_sortiert = {k: v for k, v in sorted(dic.items(), key=lambda item: item[1], reverse=True)}

            kreisdiagramm.addValue(dic)

            print(dic)
            # Items mit VB = 0
            keys_with_zero = []
            for key in vb_sortiert.keys():
                if vb_sortiert[key] == 0:
                    keys_with_zero.append(key)
            for key in keys_with_zero:
                del vb_sortiert[key]

            keys = list(vb_sortiert.keys())

            for items in vb_sortiert.values():
                total_dif += items
                print(items)

            # Optional weitere Autos laden
            if total_dif >= 11:
                capability = int(total_dif / 11)
                for item in range(capability):
                    for entry in plan.keys():
                        if plan[entry]["first"] <= hours%24:
                            total_dif -= 11
                            del plan[entry]
                            break
            print("Plan optional: ", plan)
            
            storage.startCharging(total_dif)

            print("storage: ", storage.capacity)
            print("Totale Differenz: ", total_dif)
            print(vb_sortiert)

            estatus(total_dif, storage)
            calcled(0, len(vb_sortiert) - 1, vb_sortiert, keys)

            # hardware.sonne(erzeugung_solar)

            hours += 1
            sio.emit("time", hours%24)


            time.sleep(2)

    except KeyboardInterrupt:
        sio.disconnect()
        pass


if __name__ == "__main__":


    verbrauch_haus = hardware.getAnalogPercent(0)  # 0.5
    erzeugung_solar = hardware.getAnalogPercent(1)  # 0.25
    verbrauch_firma = hardware.getAnalogPercent(2)  # 1
    erzeugung_wind = hardware.getAnalogPercent(3)  # 0.5
    preis_vorhersage = hardware.getAnalogPercent(4)  # 0

    hausA = verbrauch_haus
    sunA = erzeugung_solar
    firmaA = verbrauch_firma
    windA = erzeugung_wind
    preisA = preis_vorhersage


    # SocketIO Connection herstellen und als Raspberry anmelden

    storage = Storage(0, 0, 350)
    kreisdiagramm = Kreisdiagramm()
    planner = Planner()

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
    while(not input("lel")):
        ledStrip.showDemo()

    studie = True
    sio.connect(SOCKETIO_ENDPOINT)
    input("Studie beenden / Skript beginnen")
    sio.connect(SOCKETIO_ENDPOINT)
    