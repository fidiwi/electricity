

name = ["hardware.house1", "hardware.house2", "hardware.house3", "hardware.storage", "hardware.house5"]
housevb = [-6, -23, -4, 9, -14]

pos = 0
print(housevb)
for a in range(5):
    max = housevb[a]
    for b in range(1+a, 5):
        #print(housevb[b+1])
        if max > housevb[b]:
            max = housevb[b]
            pos = b

    tausch = housevb[a]
    housevb[a] = max
    housevb[pos] = tausch
    tausch = name[a]
    name[a] = name[pos]
    name[pos] = tausch

def speed(dif):
    if abs(dif) > 10:
        dif = 10
    difference = abs(dif) * 0.1
    return dif

def calcled(nr1, vb1, nr2, vb2):
    if vb1 - vb2 < 0:
        vb3 = vb1 - vb2
        speed = vb3 / #100
        ledStrip.stromfluss(Color(50, 0, 0), speed(), nr1, nr2)
        def calcled(nr3, vb3, nr4, vb4)
    
    else:
        vb4 = vb1 - vb2 
        speed = vb4 / #100
        ledStrip.stromfluss(Color(50, 0, 0), speed(), nr1, nr2)
        def calcled(nr3, vb3, nr4, vb4)


if housevb[4] > 0:
    if storage.capacity < 350:
        for i in range(5):
            if i == 3:
                pass
            else:
                ledStrip.stromfluss(Color(0, 50, 0), speed(housevb[i]), name[i], name[3])
    else:
        for i in range(5):
        ledStrip.stromfluss(Color(0, 50, 0), speed(housevb[i]), name[i], hardware.firma)

elif housevb[0] < 0:
    if storage.capacity > 0:
        for i in range(5):
            if i == 3:
                pass
            else:
    else:
        for i in range(5):
        ledStrip.stromfluss(Color(0, 50, 0), speed(housevb[i]), hardware.wind, name[i])

elif sum(housevb) > 0:
    if storage.capacity < 350:
    
    else:

elif sum(housevb) < 0:
    if storage.capacity > 0:
    
    else:

else:
    ledStrip.stromfluss(Color(50, 50, 50), speed(), hardware.wind, hardware.storage)

print(housevb)
print(name)
