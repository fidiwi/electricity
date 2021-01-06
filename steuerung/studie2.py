import time

hauptleitunggeben = 0
hauptleitungnehmen = 0

verbrauch_haus = [0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.5, 0.7, 0.8, 0.6, 0.5, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.8, 0.8, 0.6, 0.5, 0.4, 0.3]
erzeugung_solar = [0, 0, 0, 0, 0, 0, 0, 0.07, 0.28, 0.49, 0.63, 0.73, 0.3, 0.8, 0.76, 0.68, 0.52, 0.31, 0.24, 0.07, 0.05, 0, 0, 0]
erzeugung_wind = [0.22, 0.18, 0.18, 0.14, 0.14, 0.12, 0.14, 0.14, 0.18, 0.22, 0.26, 0.3, 0.3, 0.34, 0.34, 0.34, 0.38, 0.38, 0.34, 0.34, 0.26, 0.22, 0.18, 0.18]


produktivität = 0

for i in range(24):

    dif = 12.5 * erzeugung_solar[i] - 5.7 * verbrauch_haus[i]
    dif += 18.75 * erzeugung_solar[i] - 1.2 * verbrauch_haus[i]
    dif += 2 * (3.75 * erzeugung_solar[i] - 1.5 * verbrauch_haus[i])
    dif += 8.75 * erzeugung_solar[i] - 4 * verbrauch_haus[i]
    dif += 20 * erzeugung_wind[i] + 20 * erzeugung_solar[i]

    print("dif1: ", dif)


    if i > 5 and i < 23:
        dif -= 16 * 0.8

    if i == 20:
        dif -= 8 * 11
    

    if dif < 0:
        hauptleitungnehmen += dif
    else:
        hauptleitunggeben += dif
    
    print("dif2: ", dif)

    print(i, " Uhr")
    time.sleep(0)

print(hauptleitunggeben)
print(hauptleitungnehmen)
print(produktivität/16)