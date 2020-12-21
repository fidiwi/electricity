liste1 = [10, 32, 234, 435]
liste4 = [244, 45635, 23554, 435]
liste5 = [liste1] + [liste4]
print(liste5)
for i in range(len(liste5)):
    print(liste5[i][i])