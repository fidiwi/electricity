

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
    return difference

def calcled(i, j, temp):
    housevb[i]+=temp
    if housevb[i] > 0 and housevb[j] < 0:
        if housevb[i] - housevb[j] > 0:
            temp = housevb[i] - housevb[j]
            ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[j]), name[i], name[j])
            j-=1
            if i <= j:
                calcled(i, j, temp)
        else:
            temp = housevb[i] - housevb[j]
            ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[i]), name[i], name[j])
            i+=1
            if i <= j:
                calcled(i, j, temp)
    
    elif housevb[i] > 0 and housevb[j] > 0:
        if storage < 350:
            while i >= j:
                if name[i] == "hardware.storage":
                    ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[j]), name[j], hardware.storage)
                    i+=1
                    j-=1
                elif name[j] == "hardware.storage":
                    ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[i]), name[i], hardware.storage)
                    i+=1
                    j-=1
                else:
                    ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[i]), name[i], hardware.storage)
                    ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[j]), name[j], hardware.storage)
                    i+=1
                    j-=1
        else:
            while i >= j:
                ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[i]), name[i], hardware.firma)
                ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[j]), name[j], hardware.firma)
                i+=1
                j-=1

    else:
        if storage > 0:
            while i >= j:
                if name[i] == "hardware.storage":
                    ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[j]), hardware.storage, name[j])
                    i+=1
                    j-=1
                elif name[j] == "hardware.storage":
                    ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[i]), hardware.storage, name[i])
                    i+=1
                    j-=1
                else:
                    ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[i]), hardware.storage, name[i])
                    ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[j]), hardware.storage, name[j])
                    i+=1
                    j-=1
        else:
            while i >= j:
                ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[i]), hardware.wind, name[i])
                ledStrip.stromfluss(Color(50, 0, 0), speed(housevb[j]), hardware.wind, name[j])
                i+=1
                j-=1


if housevb[4] > 0:
    if storage.capacity < 350:
        for i in range(5):
            if name[i] == "hardware.storage":
                pass
            else:
                ledStrip.stromfluss(Color(0, 50, 0), speed(housevb[i]), name[i], hardware.storage)
    else:
        for i in range(5):
        ledStrip.stromfluss(Color(0, 50, 0), speed(housevb[i]), name[i], hardware.firma)

elif housevb[0] < 0:
    if storage.capacity > 0:
        for i in range(5):
            if name[i] == "hardware.storage":
                pass
            else:
                ledStrip.stromfluss(Color(0, 50, 0), speed(housevb[i]), hardware.storage, name[i])
    else:
        for i in range(5):
        ledStrip.stromfluss(Color(0, 50, 0), speed(housevb[i]), hardware.wind, name[i])

elif sum(housevb) > 0:
    calcled(0, 4, 0)

elif sum(housevb) < 0:
    calcled(0, 4, 0)

else:
    ledStrip.stromfluss(Color(50, 50, 50), speed(), hardware.wind, hardware.storage)

print(housevb)
print(name)
