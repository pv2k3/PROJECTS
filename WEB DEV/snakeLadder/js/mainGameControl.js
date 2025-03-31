
var container = document.getElementsByClassName("left-container")[0];
container.innerHTML = "<div class=\"left-container-inner\"></div>";
var container_inner = document.getElementsByClassName("left-container-inner")[0];
var dieClass = document.getElementsByClassName("left-menu-die")[0];
var dieValue = document.getElementsByClassName("die-value");
var winnerMenu = document.getElementsByClassName("exit-winner")[0];
var winner = document.getElementsByClassName("winner")[0];
var box = document.getElementsByClassName("box");
var boxNumber = 0;


var playerPos = 0, botPos = 0;      // start position for all player is 0
var rollValue;


function exactPosition(pos) {
    x = Math.floor(pos / 10);
    pos = ((x % 2) == 1) ? pos : (x * 20 + 9) - pos;
    pos += (90 - (20 * x));
    return pos;
}

for (let i = 0; i < 10; i++) {
    container_inner.innerHTML += "<div class=\"row\"></div>";
    let row = document.getElementsByClassName("row")[i];
    for (let i = 0; i < 10; i++) {
        row.innerHTML += `<div class=\"box\" data-content=${exactPosition(boxNumber++) + 1}></div>`;
    }
}

function changeDieValue(value) {
    let p = document.getElementsByClassName("left-menu-die")[0].clientWidth;
    for (let i = 0; i < 6; i++) {
        dieValue[i].style.transform = `translateX(-${(value - 1) * p}px)`;
    }
}

function clearBlock(pos, mode) {
    if (pos < 0) {
        return;
    }
    x = Math.floor(pos / 10);
    pos = ((x % 2) == 0) ? pos : (x * 20 + 9) - pos;
    pos += (90 - (20 * x));
    if (box[pos].childElementCount > 1) {
        if (mode == "PLayer") {
            box[pos].innerHTML = "<img src=\"icons/red_player.svg\" alt=\"red player\" class=\"player\">";
            return;
        }
        else if (mode == "Bot") {
            box[pos].innerHTML = "<img src=\"icons/green_player.svg\" alt=\"green player\" class=\"player\">";
            return;
        }
    }
    box[pos].innerHTML = "";
}



function move(player, pos) {
    rollValue = Math.floor(1 + Math.random()*6);
    rollValue = (rollValue>6)?(rollValue-1):rollValue;
    changeDieValue(rollValue);
    console.log(`${player} rolled ${rollValue} \t`);
    if (pos == 0 && (rollValue == 1 || rollValue == 6)) {  // start condition
        pos = 1;
        console.log(`${player} moved to ${pos} \n`);
    }
    else if (pos != 0) {
        if (pos > 94 && rollValue <= 100 - pos)     // if pos is 94 above and roll value is less than diff of pos and 100
        {
            pos += rollValue;
            pos = specialMove(pos);
        }
        else if (playerPos <= 94) {
            pos += rollValue;
            pos = specialMove(pos);
        }
        else if(100-pos < rollValue){
            console.log(`${player} cannot moved because rolled value is greater than steps left`);
        }
        if (pos >= 100) {
            console.log(`${player} moved to 100\n`);
        }
        else {
            console.log(`${player} moved to ${pos}\n`);
        }
    }
    else {
        console.log(`${player} were at start and did not roll a 1 or 6\n`);
    }
    return pos;
}


function addBlock(pos, player) {
    if (pos < 0) {
        return;
    }
    x = Math.floor(pos / 10);
    pos = ((x % 2) == 0) ? pos : (x * 20 + 9) - pos;
    pos += (90 - (20 * x));
    box[pos].innerHTML += player;
}

function reset() {
    clearBlock(playerPos - 1);
    clearBlock(botPos - 1);
    winnerMenu.style.top = "-150vh";
    botPos = 0;
    playerPos = 0;
    rollValue = 0;
    changeDieValue(1);
}
function checkWinner(pos, mode) {
    if (pos >= 100) {
        console.log(`${mode} won\n`);
        winner.innerHTML = `${mode} won`;
        winnerMenu.style.top = "calc(50vh - 15vh)";
    }
}

function main() {
    setTimeout(() => {
        clearBlock(playerPos - 1, "Player");
        playerPos = move("Player", playerPos);
        addBlock(playerPos - 1, "<img src=\"icons/green_player.svg\" alt=\"green player\" class=\"player\">");
    }, 500);
    setTimeout(() => {
        clearBlock(botPos - 1, "Bot");
        botPos = move("Bot", botPos);
        addBlock(botPos - 1, "<img src=\"icons/red_player.svg\" alt=\"red player\" class=\"player\">");
    }, 1000);
    setTimeout(() => {
        checkWinner(playerPos, "Player");
        checkWinner(botPos, "Bot");
    }, 1100);
}


var line = document.getElementsByClassName("line");
var burger = document.getElementsByClassName("burger")[0];
var right = document.getElementsByClassName("right")[0];
var c = 0;
function change() {
    if (c % 2 == 0) {
        for (let i = 0; i < line.length; i++) {
            line[i].classList.add("translate");
        }
        right.style.right = 0;
        c++;
        burger.style.right = "calc(200px + 0.5rem)";
    }
    else {
        for (let i = 0; i < line.length; i++) {
            line[i].classList.remove("translate");
        }
        right.style.right = "-150dvw";
        c++;
        burger.style.right = "1rem";
    }
}
burger.addEventListener("click", change);


