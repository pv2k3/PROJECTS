from ttkbootstrap import ttk


class Conditions:
    def __init__(self, frame):
        self.frame = frame

    def input_mm(self, value):
        a = ""
        units = ["mm", "cm", "m", "km", "Feet", "Inches", "Miles", "Yards"]
        r = 5
        c = 0
        for i in units:
            a = ""
            if i == "mm":
                a += str(value)
            elif i == "cm":
                a += str(value / 10)
            elif i == "m":
                a += str(value / 1000)
            elif i == "km":
                a += str(value / 1000000)
            elif i == "Feet":
                a += str(value / 305)
            elif i == "Inches":
                a += str(value / 25.4)
            elif i == "Miles":
                a += str(value / 1609344)
            elif i == "Yards":
                a += str(value / 914.4)

            ttk.Label(self.frame, text=f"{i:7} {a:14.5}", borderwidth=5).grid(row=r, column=c, padx=4, pady=4)
            c += 1
            if c > 3:
                r += 1
                c = 0

    def input_cm(self, value):
        a = ""
        units = ["mm", "cm", "m", "km", "Feet", "Inches", "Miles", "Yards"]
        r = 5
        c = 0
        for i in units:
            a = ""
            if i == "mm":
                a += str(value * 10)
            elif i == "cm":
                a += str(value)
            elif i == "m":
                a += str(value / 100)
            elif i == "km":
                a += str(value / 100000)
            elif i == "Feet":
                a += str(value / 30.5)
            elif i == "Inches":
                a += str(value / 2.54)
            elif i == "Miles":
                a += str(value / 160934.4)
            elif i == "Yards":
                a += str(value / 91.44)

            ttk.Label(self.frame, text=f"{i:7} {a:14.5}", borderwidth=5).grid(row=r, column=c, padx=4, pady=4)
            c += 1
            if c > 3:
                r += 1
                c = 0

    def input_m(self, value):
        a = ""
        units = ["mm", "cm", "m", "km", "Feet", "Inches", "Miles", "Yards"]
        r = 0
        c = 0
        for i in units:
            a = ""
            if i == "mm":
                a += str(value * 1000)
            elif i == "cm":
                a += str(value*100)
            elif i == "m":
                a += str(value / 1)
            elif i == "km":
                a += str(value / 1000)
            elif i == "Feet":
                a += str(value * 3.28)
            elif i == "Inches":
                a += str(value * 39.37)
            elif i == "Miles":
                a += str(value / 1609.344)
            elif i == "Yards":
                a += str(value * 1.093)

            ttk.Label(self.frame, text=f"{i:7} {a:14.5}", borderwidth=5).grid(row=r, column=c, padx=4, pady=4)
            c += 1
            if c > 3:
                r += 1
                c = 0
