def sonne(self, brightness):
        way = sun
        for i in way:
            super().setPixelColor(i, Color(255*brightness, 180*brightness, 20*brightness))
            super().show()

def wheel(pos):
        """Generate rainbow colors across 0-255 positions."""
        if pos < 85:
            return Color(pos * 3, 255 - pos * 3, 0)
        elif pos < 170:
            pos -= 85
            return Color(255 - pos * 3, 0, pos * 3)
        else:
            pos -= 170
            return Color(0, pos * 3, 255 - pos * 3)
    
    def rainbow(self, wait_ms=20, iterations=1):
        """Draw rainbow that fades across all pixels at once."""
        for j in range(256*iterations):
            for i in range(super().numPixels()):
                super().setPixelColor(i, self.wheel((i+j) & 255))
            super().show()
            time.sleep(wait_ms/1000.0)
    
    def rainbowCycle(wait_ms=20, iterations=5):
        """Draw rainbow that uniformly distributes itself across all pixels."""
        for j in range(256*iterations):
            for i in range(super().numPixels()):
                super().setPixelColor(i, wheel((int(i * 256 / super().numPixels()) + j) & 255))
            super().show()
            time.sleep(wait_ms/1000.0)
    
    def theaterChaseRainbow(wait_ms=50):
        """Rainbow movie theater light style chaser animation."""
        for j in range(256):
            for q in range(3):
                for i in range(0, super().numPixels(), 3):
                    super().setPixelColor(i+q, wheel((i+j) % 255))
                super().show()
                time.sleep(wait_ms/1000.0)
                for i in range(0, super().numPixels(), 3):
                    super().setPixelColor(i+q, 0)