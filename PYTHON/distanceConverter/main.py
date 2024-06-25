import ttkbootstrap as ttk
import methods


def main():
    root = ttk.Window(themename="superhero", title="Distance Calculator")

    # To specify the entry field purpose
    ttk.Label(root, text="Enter the Distance", font="Arial 20", justify="center").grid(row=0, columnspan=4)

    enter_value = ttk.StringVar()

    # To enter the distance
    entry = ttk.Entry(root, textvariable=enter_value)
    entry.grid(row=1, columnspan=4)

    obj = methods.Methods(enter_value, root)

    units = ["mm", "cm", "m", "km", "Feet", "Inches", "Miles", "Yards"]

    a1 = []
    r = 2
    c = 0
    z = 0
    for i in units:
        a1.append(ttk.Radiobutton(root, text=f"{i:20}", value=i, bootstyle="info toolbutton outline", command=lambda val=i: obj.convert(val)))
        a1[z].grid(row=r, column=c, padx=4, pady=4)
        c += 1
        z += 1
        if c > 3:
            r += 1
            c = 0

    root.mainloop()
