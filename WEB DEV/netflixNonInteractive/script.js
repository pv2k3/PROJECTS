var button1 = document.getElementsByClassName("close");
var disp = document.getElementsByClassName("card2");
var c = 0;

function close(index) {
    button1[index].style.transform = "rotate(45deg)";
    disp[index].style.opacity = 0;
    disp[index].style.position = "absolute";
    disp[index].style.top = "2.625rem";
}

function open(index) {
    button1[index].style.transform = "rotate(0)";
    disp[index].style.opacity = 1;
    disp[index].style.position = "relative";
    disp[index].style.top = "0rem";
}

function actionDrop(index) {
    if (c % 2 == 0) {
        open(index);
        for (let i = 0; i < disp.length; i++) {
            if (i != index) {
                close(i);
            }
        }
        c++;
    }
    else {
        close(index);
        c++;
    }
}
