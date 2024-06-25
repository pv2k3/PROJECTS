var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0]
var winner;
var count = 0;
var Box = document.getElementsByClassName("box");
var ExitMenu = document.getElementsByClassName("exitMenu");
var victor = document.getElementById("victor");

function botMove() {
    let i = 0;
    while (true) {
        let a = Math.floor(Math.random() * 9);
        console.log(`i:${i++}  a:${a}`);
        if (count == 9) {
            break;
        }
        else {
            if (place(a, 2, "pvb")) {
                break;
            } else {
                console.log("Fail");
            }
        }
    }
}

// This function will place the cross or circle according to the turn
function place(i, value, mode = "pvp") {
    if (grid[i] == 0) {
        grid[i] = value;
        ++count;
        if (value == 1) {
            Box[i].innerHTML = "<img src=\"img/xmark.svg\" class=\"Cross\">";
        }
        else if (value == 2) {
            Box[i].innerHTML = "<img src=\"img/circle.svg\" class=\"Cross\">";
        }
        showMenu();
        return true;
    }
    else if (grid[i] != 0 && mode == "pvb" && value == 2) {
        // alert("Bot placement failed wait");
    }
    else {
        alert("Select a different value");
        return false;
    }
}
// This function keeps constantly checking if someone won
function check() {
    for (let i = 0; i < 9; i += 3) {
        if (grid[i] == grid[i + 1] && grid[i + 1] == grid[i + 2] && grid[i] != 0) {
            winner = grid[i];
            return true;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (grid[i] == grid[i + 3] && grid[i + 3] == grid[i + 6] && grid[i] != 0) {
            winner = grid[i];
            return true;
        }
    }
    if (grid[0] == grid[4] && grid[4] == grid[8] && grid[0] != 0) {
        winner = grid[0];
        return true;
    }
    else if (grid[2] == grid[4] && grid[4] == grid[6] && grid[2] != 0) {
        winner = grid[2];
        return true;
    }
    else {
        return false;
    }
}
// This function will bring the exit menu upon completion
function showMenu() {
    if (count >= 5) {
        console.log(`Started checking turn${count}`); // to check the if this runs after 5 turns
        if (check()) {
            if (winner == 1) {
                victor.innerText = "Player 1\nWon";
                ExitMenu[0].style.top = "0px";
            }
            else {
                victor.innerText = "Player 2\nWon";
                ExitMenu[0].style.top = "0px";
            }
            return true;
            count = 0;
        }
        else if (check() == false && count == 9) {
            victor.innerText = "It is a\ntie";
            ExitMenu[0].style.top = "0px";
            return false;
        }
    }
    // return;
}
// This will reset the board for playing again
function remove() {
    for (let i = 0; i < 9; i++) {
        grid[i] = 0;
        Box[i].innerHTML = "";
    }
    ExitMenu[0].style.top = "-300vh";
    victor.innerText = "";
    count = 0;
}
// starts the game

function game(i) {
    if (count % 2 == 0) {
        place(i, 1);
    }
    else {
        place(i, 2);
    }
}

function gameBot(i = -1) {
    if (i != -1 && count % 2 == 0) {
        place(i, 1);
        if (count % 2 == 1) {
            botMove();
        }
    }
}