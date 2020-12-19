dic = {"house1": 45, "house2": 13, "house3": -3, "storage": -20, "house5": 31}
vb_sotiert = {k: v for k, v in sorted(dic.items(), key=lambda item: item[1])}
print(vb_sotiert)
keys = list(vb_sotiert.keys())
print(keys)
print(keys[-1])
vb_sotiert[keys[-1]] = 5
print(vb_sotiert[keys[-1]])
print(vb_sotiert)