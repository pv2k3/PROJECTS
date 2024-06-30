var button1 = document.getElementsByClassName("close");
var disp = document.getElementsByClassName("card2");
var active = []
var deactive = [0, 1, 2, 3, 4, 5]

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
    if (deactive.indexOf(index) != -1) {

        console.log("Start active 1 ", active);
        console.log("Start deactive 1 ", deactive);

        open(index);    // Open the clicked block

        active.push(index);      // add the block to active
        deactive.splice(deactive.indexOf(index),1);  // remove the current block from deactive

        if(active.length > 1){
            for(let i = 0; i<active.length-1; i++){
                close(active[i]);   
                deactive.push(active[i]);
            }
            active = [active[active.length-1]];
        }
        console.log("End active 1 ", active);
        console.log("End deactive 1 ", deactive);
    }
    else {
        close(index);  // Close the current open block
        active.shift();   // remove the block from active
        deactive.push(index); // add the current block to deactive
        console.log("active 2 ", active);
        console.log("deactive 2 ", deactive);
    }
}
