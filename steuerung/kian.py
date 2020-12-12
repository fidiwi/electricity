def sonne(self, brightness):
        way = sun
        for i in range(way):
            super().setPixelColor(i, Color(250*brightness, 210*brightness, 60*brightness))
            super().show()