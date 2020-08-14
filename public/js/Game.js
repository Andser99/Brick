import { Player, Modifier, EnlargerEffect, WidenerEffect } from './Entities.js';



function startGame() {
    document.documentElement.style.cursor = 'none';
    //Initialize player
    const playerElement = document.getElementById("player");
    const player = new Player(100, 10, playerElement);

    //Test mod
    var modA = new Modifier("UniversalScale++", new EnlargerEffect(1.5), player);
    var modB = new Modifier("Width++", new WidenerEffect(2), player);
    var modC = new Modifier("Width++", new WidenerEffect(1.75), player);


    
    document.addEventListener("keydown", (e) => {
        let char = String.fromCharCode(e.keyCode).toLowerCase();
        switch(char) {
            case 'q':
                console.log(`${modA.name} ${modA.activate() ? "on" : "is already active"}`);
            break;
            case 'w':
                console.log(`${modA.name} ${modA.deactivate() ? "off" : "is already disabled"}`);
            break;
            case 'a':
                console.log(`${modB.name} ${modB.activate() ? "on" : "is already active"}`);
            break;
            case 's':
                console.log(`${modB.name} ${modB.deactivate() ? "off" : "is already disabled"}`);
            break;
            case 'z':
                console.log(`${modC.name} ${modC.activate() ? "on" : "is already active"}`);
            break;
            case 'x':
                console.log(`${modC.name} ${modC.deactivate() ? "off" : "is already disabled"}`);
            break;
            default:
                console.log(char);
        }
    });
}

window.startGame = startGame();