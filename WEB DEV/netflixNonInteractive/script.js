

var button1 = document.getElementsByClassName("close");
var disp = document.getElementsByClassName("card2");
var c = 0;

function actionDrop(index) {
    if (c%2==0) {
        button1[index].style.transform = "rotate(0)";
        disp[index].style.opacity = 1;
        disp[index].style.position = "relative";
        disp[index].style.top = "0rem"; 
        for (let i = 0; i < disp.length; i++) {
            if (i != index) {
                button1[i].style.transform = "rotate(45deg)";
                disp[i].style.opacity = 0;
                disp[i].style.position = "absolute";
                disp[i].style.top = "2.625rem";
            }
        }
        c++;
    }
    else {
        button1[index].style.transform = "rotate(45deg)";
        disp[index].style.opacity = 0;
        disp[index].style.position = "absolute";
        disp[index].style.top = "2.625rem";
        c++;
    }   
}
