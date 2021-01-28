
hauptleitunggeben = 0
hauptleitungnehmen = 0

verbrauch_haus = [0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.5, 0.7, 0.8, 0.6, 0.5, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.8, 0.8, 0.6, 0.5, 0.4, 0.3]
erzeugung_solar = [0, 0, 0, 0, 0, 0, 0, 0.07, 0.28, 0.49, 0.63, 0.73, 0.3, 0.8, 0.76, 0.68, 0.52, 0.31, 0.24, 0.07, 0.05, 0, 0, 0]
erzeugung_wind = [0.61, 0.5, 0.5, 0.39, 0.39, 0.33, 0.39, 0.39, 0.5, 0.61, 0.72, 0.83, 0.83, 0.94, 0.94, 0.94, 1.06, 1.06, 0.94, 0.94, 0.72, 0.61, 0.5, 0.5]


i = 0

for j in range(24):

    dif = 12.5 * erzeugung_solar[i] - 5.7 * verbrauch_haus[i]
    dif += 18.75 * erzeugung_solar[i] - 1.2 * verbrauch_haus[i]
    dif += 2 * (3.75 * erzeugung_solar[i] - 1.5 * verbrauch_haus[i])
    dif += 8.75 * erzeugung_solar[i] - 4 * verbrauch_haus[i]
    dif += 5 * erzeugung_wind[i] + 20 * erzeugung_solar[i]

    if i > 5 and i < 23:
        dif -= 16 * 0.8

    if i == 20:
        dif -= 11 * 8

    if dif < 0:
        hauptleitungnehmen += dif
    else:
        hauptleitunggeben += dif

    print("dif2: ", dif)

    i += 1

    if i == 24:
        i = 0

print(hauptleitunggeben)
print(hauptleitungnehmen)
