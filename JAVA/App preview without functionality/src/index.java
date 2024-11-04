
import Helper.MainWindow;

public class index {
    public static void main(String[] args) {
        MainWindow win = new MainWindow("ByteZone", 410, 480);
        win.addLabel(50, 50, 80, 32, "Email");
        win.addTextField(180, 50, 180, 32, "", "text");
        win.addLabel(50, 90, 80, 32, "Password");
        win.addTextField(180, 90, 180, 32, "", "password");
        win.addButton(50, 130, 80, 32, "Submit");
    }
}
