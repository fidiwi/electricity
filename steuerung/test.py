houses = [14, 12, 5, -8, -20]
capacity = 200
ledstriplist = []
import sortieren


def calcled(i, j, houses, capacity): #i = erstes haus von links; j = rechtes haus in der list
    global ledstriplist
    if houses[i] > 0 and houses[j] < 0:  # Wenn i erzeugt und j verbraucht
        if houses[i] + houses[j] > 0:  # Wenn i den Verbrauch von j mehr als decken kann
            ledstriplist+=[[(0, 50, 0), houses[j], houses[i], houses[j]]]
            houses[i] += houses[j]  # Erzeugung von i mit dem Verbrauch von j subtrahieren
            j -= 1  # Springe zum nächsten verbrauchenden Haus
            print(1)
            if not i > j:
                calcled(i, j, houses, capacity)
        else:
            ledstriplist+=[[(0, 50, 0), houses[i], houses[i].way, houses[j].way]]
            houses[j] += houses[i]  # Verbrauch von j mit der Erzeugung von i senken
            i += 1  # Springe zum nächsten erzeugenden Haus
            print(2)
            if not i > j:
                calcled(i, j, houses, capacity)
    
    elif houses[i] > 0 and houses[j] > 0:  # Wenn i und j erzeugen
        if capacity < 350:
            while not i > j:  # j+1, da auch das house[j] angezeigt werden muss
                if not i == 3:
                    ledstriplist+=[[(0, 150 , 50), houses[i], houses[i], houses[3]]]
                i += 1
        else:
            while not i > j:
                ledstriplist+=[[(0, 0, 50), houses[i], houses[i], hardware.end]]
                i += 1

    else: #  Wenn beide verbrauchen
        if capacity > 0:
            while not i > j:
                if not i == 3:
                    ledstriplist+=[[(50, 50, 0), houses[i], houses[3], houses[i]]]
                i += 1
        else:
            while not i > j:
                ledstriplist+=[[(0, 150 , 50), houses[i], houses[i], sortieren.begin]]
                i += 1

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


class LEDStrip():
    def calculateSingleWay(sender_object_way, receiver_object_way):
        way = []
        # Stromfluss von kleinerem Pixelindex zu größerem
        if sender_object_way[0] < receiver_object_way[0]:
            way += reversed(sender_object_way)
            for item in main:
                if item > sender_object_way[0] and item < receiver_object_way[0]:
                    way.append(item)
            way += receiver_object_way
        # Stromfluss von größerem Pixelindex zu kleinerem
        else:
            way += reversed(sender_object_way)
            for item in reversed(main):
                if item < list(reversed(sender_object_way))[0] and item > list(reversed(receiver_object_way))[0]:
                    way.append(item)
            way += receiver_object_way
        return way

ausgabeled = []

for i in range(len(ledstriplist)):
    way = LEDStrip.calculateSingleWay(ledstriplist[i][2], ledstriplist[i][3])
    del ledstriplist[i][3]
    del ledstriplist[i][2]
    ledstriplist[i].append(way)

print(ledstriplist)

