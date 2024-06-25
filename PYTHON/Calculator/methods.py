import tkinter as tk


# All operations inside the class
class Methods:
    # Constructor
    def __init__(self, entry: tk.StringVar):
        self.entry = entry

    # Enter the value and show it in entry field
    def onClick(self, value):
        current = self.entry.get()
        if current.isalpha():
            self.entry.set(value)
        else:
            self.entry.set(current + value)

    # Clear the entry field
    def clear_entry(self):
        self.entry.set("")

    # Calculate using eval
    def calculate(self):
        try:
            equ = self.entry.get()
            result = eval(equ)
            self.entry.set(str(result))
        except Exception:
            self.entry.set("Error")
