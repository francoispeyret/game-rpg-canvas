
function keyReleased() {
    if (keyCode == UP_ARROW || keyCode == DOWN_ARROW || keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
        bob.marcheStatus=false;
    }

    switch (keyCode) {
        case 32: // espace
            ui.spaceKeyPressed = false;
            break;
        case 39: // droite
            ui.rightKeyPressed = false;
            break;
        case 40: // bas
            ui.downKeyPressed = false;
            break;
        case 37: // gauche
            ui.leftKeyPressed = false;
            break;
        case 38: // haut
            ui.topKeyPressed = false;
            break;
    }
}

function keyPressed() {
    switch (keyCode) {
        case 32: // espace
            bob.interact();
            ui.spaceKeyPressed = true;
            break;
        case 39: // droite
            ui.rightKeyPressed = true;
            break;
        case 40: // bas
            ui.downKeyPressed = true;
            break;
        case 37: // gauche
            ui.leftKeyPressed = true;
            break;
        case 38: // haut
            ui.topKeyPressed = true;
            break;
    }
}
