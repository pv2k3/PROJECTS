import ttkbootstrap as ttk
import conditions


class Methods:
    def __init__(self, entry: ttk.StringVar, root):
        self.entry = entry
        self.root = root

    def convert(self, input_unit):
        a = ""
        label = ttk.Label(self.root, text="Result :", font="Arial 20", justify="center")
        label.grid(row=4, columnspan=4)

        label_frame = ttk.LabelFrame(self.root)
        label_frame.grid(row=5, columnspan=4, rowspan=2, pady=4, padx=4)

        obj = conditions.Conditions(label_frame)

        try:
            value = int(self.entry.get())
            if input_unit == "mm":
                obj.input_mm(value)
            elif input_unit == "cm":
                obj.input_cm(value)
            elif input_unit == "m":
                obj.input_m(value)
        except:
            self.entry.set("ERROR")
