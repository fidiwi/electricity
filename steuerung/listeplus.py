l = [1,2,4,6,2,8,3,5,1,5,1]
 
x = {}
y = [x.setdefault(v, v) for v in l if v not in x]

print(y)