
function specialMove(check_value) {   // Used to move the position if player reaches a ladder
    if (check_value == 4) {
        return 14;
    }
    else if (check_value == 8) {
        return 30;
    }
    else if (check_value == 28) {
        return 76;
    }
    else if (check_value == 21) {
        return 42;
    }
    else if (check_value == 50) {
        return 67;
    }
    else if (check_value == 71) {
        return 92;
    }
    else if (check_value == 80) {
        return 99;
    }
    // Used to move the position if player reaches a snake
    else if (check_value == 32) {
        return 10;
    }
    else if (check_value == 36) {
        return 6;
    }
    else if (check_value == 48) {
        return 26;
    }
    else if (check_value == 62) {
        return 18;
    }
    else if (check_value == 88) {
        return 24;
    }
    else if (check_value == 95) {
        return 56;
    }
    else if (check_value == 97) {
        return 78;
    }
    else {
        return check_value;
    }
}
