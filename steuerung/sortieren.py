

name = ["house1", "house2", "house3", "storage","house5"]
housevb = [-6, -23, -4, 9, -14]
"""dic = {"house1": housevb[0], "house2": housevb[1], "house3": housevb[2], "storage": housevb[3], "house5": housevb[4]}
dic2 = {k: v for k, v in sorted(dic.items(), key=lambda item: item[1])}
print(dic2)
for i in range(5):
    print(dic2["house1"])"""
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

print(housevb)
print(name)
