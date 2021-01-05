import time

hauptleitunggeben = 0
hauptleitungnehmen = 0

verbrauch_haus = [0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.5, 0.7, 0.8, 0.6, 0.5, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.8, 0.8, 0.6, 0.5, 0.4, 0.3]
erzeugung_solar = [0, 0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.2, 0.3, 0.4, 0.7, 0.5, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1, 0, 0, 0, 0]
erzeugung_wind = [0.2, 0.2, 0.3, 0.3, 0.3, 0.3, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.4, 0.4, 0.2]



storage = 0
"""summe = 0
for i in verbrauch_haus:
    summe += i
print(summe/24)
summe = 0
for i in erzeugung_solar:
    summe += i
print(summe/24)
summe = 0
for i in erzeugung_wind:
    summe += i
print(summe/24)"""

produktivität = 0

for i in range(24):

    dif = 12.5 * erzeugung_solar[i] - 5.7 * verbrauch_haus[i] 
    dif += 18.75 * erzeugung_solar[i] - 1.2 * verbrauch_haus[i]
    dif += 2 * (3.75 * erzeugung_solar[i] - 1.5 * verbrauch_haus[i])
    dif += 8.75 * erzeugung_solar[i] - 4 * verbrauch_haus[i]
    dif += 25 * erzeugung_wind[i] + 20 * erzeugung_solar[i]

    print("dif1: ", dif)


    if i > 5 and i < 23:
        verbrauch_firma = 0.5
        if dif > 8:
            verbrauch_firma = dif / 16
            if dif > 16:
                verbrauch_firma = 1
        dif -= 16 * verbrauch_firma
        produktivität += verbrauch_firma
    else:
        dif -= 11
    
    storage += dif
    if storage < 0:
        storage = 0
        hauptleitungnehmen += dif
    if storage > 350:
        storage = 350
        hauptleitunggeben += dif
    
    print("dif2: ", dif)
    print("storage: ", storage)
    print(i, " Uhr")
    time.sleep(0)

print(hauptleitunggeben)
print(hauptleitungnehmen)
print(produktivität/16)