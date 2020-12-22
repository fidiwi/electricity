l = [1,2,4,6,2,8,3,5,1,5,1]

liste1 = [[12, 324, 454], [234, 435, 345, 5], [123, 4354, 5, 12], [454, 123, 65, 65]]
if len(list(liste1)) > 1:
    for listen in liste1:
        l += listen

x = {}
y = [x.setdefault(v, v) for v in l if v not in x]

print(y)