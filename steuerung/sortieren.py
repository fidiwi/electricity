main = [*range(0, 8), *range(17, 28), *range(37, 81), *range(95, 105), *range(119, 128), *range(135, 139)]
house1 = [*range(81, 88)]
house2 = [*range(88, 95)]
house3 = [*range(105, 112)]
storage = [*range(112, 119)]
house5 = [*range(128, 135)]
wind = [*range(8, 17)]
firma = [*range(28, 37)]
sun = [*range(139, 179)]
end = [138]
begin = [0]

way = {0: house1, 1: house2, 2: house3, 3: storage, 4: house5, 5: firma, 6: wind}

class LEDStrip():
    def calculateVieleSender(self, sender_object_way, receiver_object_way):
        way = []
        for i in range(len(list(sender_object_way))):
            if sender_object_way[i][0] < receiver_object_way[0]:
                way += reversed(sender_object_way)
                for item in main:
                    if item > sender_object_way[i][0] and item < receiver_object_way[0]:
                        way.append(item)
                way += receiver_object_way
            # Stromfluss von größerem Pixelindex zu kleinerem
            else:
                way += reversed(sender_object_way[i])
                for item in reversed(main):
                    if item < list(reversed(sender_object_way[i]))[0] and item > list(reversed(receiver_object_way))[0]:
                        way.append(item)
                way += receiver_object_way
        print(way)
        x = {}
        returnWay = [x.setdefault(v, v) for v in way if v not in x]
        return returnWay

    # Benutzung: stromflussVieleReceiver(FARBE, SPEED, SENDER_WEG, [EMPFÄNGER_WEG1, EMPFÄNGER_WEG2, ...])
    def stromflussVieleReceiver(self, color, speed_percent, sender_object_way, receiver_object_way_list):
        # 25 = Minimum, 50 + 25 = Maximum
        way = []
        # Stromfluss von kleinerem Pixelindex zu größerem
        for i in range(len(receiver_object_way_list)):
            if sender_object_way[0] < receiver_object_way_list[i][0]:
                way += reversed(sender_object_way)
                for item in main:
                    if item > sender_object_way[0] and item < receiver_object_way_list[i][0]:
                        way.append(item)
                way += receiver_object_way_list[i]
            # Stromfluss von größerem Pixelindex zu kleinerem
            else:
                way += reversed(sender_object_way)
                for item in reversed(main):
                    if item < list(reversed(sender_object_way))[0] and item > list(reversed(receiver_object_way_list[i]))[0]:
                        way.append(item)
                way += receiver_object_way_list[i]
        print(way)
        x = {}
        returnWay = [x.setdefault(v, v) for v in way if v not in x]
        return returnWay

    ausgabeled = []

    def stromfluss(self, color, speed_percent, sender_object_way, receiver_object_way):
        # 25 = Minimum, 50 + 25 = Maximum
        wait_ms = ((1-speed_percent) * 400 + 100) / 1000
        if len(list(sender_object_way)) > 1:
            way = self.calculateVieleSender(sender_object_way, receiver_object_way)
        else:
            way = self.stromflussVieleReceiver(sender_object_way, receiver_object_way)
        ausgabeled = way

    print(ausgabeled)