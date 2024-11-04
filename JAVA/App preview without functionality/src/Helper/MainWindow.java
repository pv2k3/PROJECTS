package Helper;

import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;

public class MainWindow extends Frame implements ActionListener {

    public void handleClose(){
        this.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                dispose();
            }
        });
    }

    ArrayList<Label> labelArrayList = new ArrayList<>();
    ArrayList<TextField> textFieldArrayList = new ArrayList<>();
    ArrayList<Button> buttonArrayList = new ArrayList<>();


    public MainWindow(String title, int width, int height){
        this.handleClose();
        this.setTitle(title);
        this.setVisible(true);
        this.setSize(width, height);
        this.setLayout(null);
    }
    public void addLabel(int x, int y, int xSize, int ySize, String text){
        Label label = new Label(text);
        label.setBounds(x, y, xSize, ySize);
        this.add(label);
        labelArrayList.add(label);
    }

    public void addTextField(int x, int y, int xSize, int ySize, String text, String type){
        TextField textField = new TextField(text);
        textField.setBounds(x, y, xSize, ySize);
        if(type.equalsIgnoreCase("password")){
            textField.setEchoChar('*');
        }
        this.add(textField);
        textFieldArrayList.add(textField);
    }

    public void addButton(int x, int y, int xSize, int ySize, String text){
        Button button = new Button(text);
        button.setBounds(x, y, xSize, ySize);
        button.addActionListener(this);
        this.add(button);
        buttonArrayList.add(button);
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent){
        String email = textFieldArrayList.get(0).getText();
        String password = textFieldArrayList.get(1).getText();
        System.out.println(email+"   "+ password);
        if(email.contains("@") && password.length()>=8){
            MainWindow newPage = new MainWindow("Account", 380, 300);
            newPage.setBackground(Color.green);
            newPage.addLabel(50, 50, 280, 64, "Detail Validated");
            newPage.addLabel(50, 120, 280, 64, "Email : "+email);
            newPage.addLabel(50, 190, 280, 64, "Email : "+password);
        }else{
            MainWindow newPage = new MainWindow("Account", 380, 164);
            newPage.setBackground(Color.red);
            newPage.addLabel(50, 50, 280, 64, "Invalid password or email");
        }
    }
}

