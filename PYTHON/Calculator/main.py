import methods
import ttkbootstrap as tk


def main():
    # Create the main window
    root = tk.Window(themename='superhero')
    root.title("Simple Calculator")
    # root.geometry("250x285")
    root.resizable(width=False, height=False)

    # Variable to get value in entry field
    equation = tk.StringVar()

    # Entry widget for displaying and entering numbers
    entry = tk.Entry(root, width=16, font=("Fira Code SemiBold", 21), justify='right', textvariable=equation)
    entry.grid(row=0, column=0, columnspan=4, pady=5)

    # Object of Methods class
    method_map = methods.Methods(equation)

    # Buttons
    bu = [
        "C", "(", ")", "+",
        "7", "8", "9", "-",
        "6", "5", "4", "*",
        "3", "2", "1", "/",
        "0", ".", "%", "="
    ]

    # Initializers
    r = 1
    c = 0

    # Placing buttons on screen
    for button in bu:
        tk.Button(root, text=button, width=4,
                  command=lambda b=button: method_map.onClick(b) if (b not in ["C", "="]) else (
                      method_map.calculate() if b == "=" else method_map.clear_entry())).grid(row=r, column=c, pady=5)
        c += 1
        if c > 3:
            c = 0
            r += 1

    # Putting the window on screen in loop
    root.mainloop()
