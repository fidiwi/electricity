houses = [14, 12, 10, 8, 2]
capacity = 200
ledstriplist = []
import sortieren


def calcled(i, j, houses, capacity): #i = erstes haus von links; j = rechtes haus in der list
    sender = []
    receiver = []
    speedSR = 0
    speedTeiler = 1

    if houses[i] > 0 and houses[j] < 0:  # Wenn i erzeugt und j verbraucht
        summe = 0
        if houses[i] + houses[j] > 0:  # Wenn i den Verbrauch von j mehr als decken kann
            # em = j
            while houses[i] > summe:
                if not i > j:
                    summe -= houses[j]
                    speedSR += houses[j]
                    speedTeiler += 1
                    receiver += [sortieren.way[j]]
                    j -= 1
            ledStrip.stromfluss(Color(0, 50, 0), speed(speedSR/speedTeiler), sortieren.way[i], receiver)
            houses[i] += houses[j]  # Erzeugung von i mit dem Verbrauch von j subtrahieren
            # j -= 1  # Springe zum nächsten verbrauchenden Haus
            if not i > j:
                calcled(i, j, houses, capacity)
        else:
            while houses[j] < summe:
                if not i > j:
                    summe -= houses[i]
                    speedSR += houses[i]
                    speedTeiler += 1
                    sender += [sortieren.way[i]]
                    i += 1
            ledStrip.stromfluss(Color(0, 50, 0), speed(speedSR/speedTeiler), sender, sortieren.way[j])
            houses[j] += houses[i]  # Verbrauch von j mit der Erzeugung von i senken
            # i += 1  # Springe zum nächsten erzeugenden Haus
            if not i > j:
                calcled(i, j, houses, capacity)

    elif houses[i] > 0 and houses[j] > 0:  # Wenn i und j erzeugen
        if capacity < 350:
            while not i > j:  # j+1, da auch das house[j] angezeigt werden muss
                if not i == 3:
                    speedSR += houses[i]
                    speedTeiler += 1
                    sender += [sortieren.way[i]]
                i += 1
            ledStrip.stromfluss(Color(0, 150, 50), speed(speedSR/speedTeiler), sender, sortieren.way[3])
        else:
            while not i > j:
                speedSR += houses[i]
                speedTeiler += 1
                sender += [sortieren.way[i]]
                i += 1
            ledStrip.stromfluss(Color(0, 0, 50), speed(speedSR/speedTeiler), sender, sortieren.end)

    else:  # Wenn beide verbrauchen
        if capacity > 0:
            while not i > j:
                if not i == 3:
                    speedSR += houses[i]
                    speedTeiler += 1
                    receiver += [sortieren.way[j]]
                i += 1
            ledStrip.stromfluss(Color(80, 50, 0), speed(speedSR/speedTeiler), sortieren.way[3], receiver)
        else:
            while not i > j:
                speedSR += houses[i]
                speedTeiler += 1
                receiver += [sortieren.way[j]]
                i += 1
            ledStrip.stromfluss(Color(50, 0, 0), speed(speedSR/speedTeiler), sortieren.begin, receiver)



calcled(0, 4, houses, capacity)

print(ledstriplist)


main = [*range(0, 8), *range(17, 28), *range(37, 81), *range(95, 105), *range(119, 128), *range(135, 139)]
house1 = [*range(81, 88)]
house2 = [*range(88, 95)]
house3 = [*range(105, 112)]
storage = [*range(112, 119)]
house5 = [*range(128, 135)]
wind = [*range(8, 17)]
firma = [*range(28, 37)]
sun = [*range(139, 179)]
end = [138]
begin = [0]

ways = {0: house1, 1: house2, 2: house3, 3: storage, 4: house5, 5: firma, 6: wind}


"""class LEDStrip():
    def calculateVieleSender(self, sender_object_way, receiver_object_way):
        way = []
        for i in range(len(list(sender_object_way))):
            if sender_object_way[i][0] < receiver_object_way[0]:
                way += reversed(sender_object_way)
                for item in main:
                    if item > sender_object_way[i][0] and item < receiver_object_way[0]:
                        way.append(item)
                way += receiver_object_way
            # Stromfluss von größerem Pixelindex zu kleinerem
            else:
                way += reversed(sender_object_way[i])
                for item in reversed(main):
                    if item < list(reversed(sender_object_way[i]))[0] and item > list(reversed(receiver_object_way))[0]:
                        way.append(item)
                way += receiver_object_way
        print(way)
        x = {}
        returnWay = [x.setdefault(v, v) for v in way if v not in x]
        return returnWay

    # Benutzung: stromflussVieleReceiver(FARBE, SPEED, SENDER_WEG, [EMPFÄNGER_WEG1, EMPFÄNGER_WEG2, ...])
    def stromflussVieleReceiver(self, color, speed_percent, sender_object_way, receiver_object_way_list):
        # 25 = Minimum, 50 + 25 = Maximum
        way = []
        # Stromfluss von kleinerem Pixelindex zu größerem
        for i in range(len(receiver_object_way_list)):
            if sender_object_way[0] < receiver_object_way_list[i][0]:
                way += reversed(sender_object_way)
                for item in main:
                    if item > sender_object_way[0] and item < receiver_object_way_list[i][0]:
                        way.append(item)
                way += receiver_object_way_list[i]
            # Stromfluss von größerem Pixelindex zu kleinerem
            else:
                way += reversed(sender_object_way)
                for item in reversed(main):
                    if item < list(reversed(sender_object_way))[0] and item > list(reversed(receiver_object_way_list[i]))[0]:
                        way.append(item)
                way += receiver_object_way_list[i]
        print(way)
        x = {}
        returnWay = [x.setdefault(v, v) for v in way if v not in x]
        return returnWay

    ausgabeled = []

    def stromfluss(self, color, speed_percent, sender_object_way, receiver_object_way):
        # 25 = Minimum, 50 + 25 = Maximum
        wait_ms = ((1-speed_percent) * 400 + 100) / 1000
        if len(list(sender_object_way)) > 1:
            way = self.calculateVieleSender(sender_object_way, receiver_object_way)
        else:
            way = self.stromflussVieleReceiver(sender_object_way, receiver_object_way)
        ausgabeled = way

    print(ausgabeled)"""


