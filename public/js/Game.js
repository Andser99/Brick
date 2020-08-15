import { GameObject } from './GameObject.js';
import { Modifier, EnlargerEffect, WidenerEffect} from './Effects.js';
import { Player } from './Player.js';
import { Brick } from './Brick.js';
import { Ball } from './Ball.js';


function startGame() {
    document.documentElement.style.cursor = 'none';
    var container = document.getElementById("game_container");
    container.left = 0;
    container.right = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    container.bottom = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    container.top = 0;



    //Initialize player
    const playerElement = document.getElementById("player");
    const player = new Player(100, 10, playerElement, 0, container.bottom - 70);

    //Test mod
    var modA = new Modifier("UniversalScale++", new EnlargerEffect(3), player);
    var modB = new Modifier("Width1++", new WidenerEffect(2), player);
    var modC = new Modifier("Width2++", new WidenerEffect(1.75), player);
    
    var ball = new Ball("Ball1", 1, 0, 1, 785, 50, 25, 25, container, player);
    var modD = new Modifier("WidthBall++", new EnlargerEffect(2), ball);
    var ball = new Ball("Ball2", 1, 0.4, 1, 400, 700, 30, 30, container, player);
    var ball = new Ball("Ball3", 1, 0.9, 1, 200, 900, 40, 40, container, player);

    var brick1 = new Brick(300, 100, document.getElementById("brick1"), 400, 400, 4);
    var brick1 = new Brick(100, 50, document.getElementById("brick2"), 200, 100, 4);
    var brick1 = new Brick(100, 100, document.getElementById("brick3"), 300, 100, 4);
    var brick1 = new Brick(100, 100, document.getElementById("brick4"), 400, 100, 4);
    var brick1 = new Brick(100, 100, document.getElementById("brick5"), 500, 100, 4);
    var brick1 = new Brick(100, 100, document.getElementById("brick6"), 600, 100, 8);
    var brick1 = new Brick(100, 100, document.getElementById("brick7"), 700, 100, 8);
    var brick1 = new Brick(100, 100, document.getElementById("brick8"), 800, 100, 8);
    var brick1 = new Brick(100, 100, document.getElementById("brick9"), 900, 100, 4);
    // setInterval(() => {ball.vectorX = Math.random(2)-1;}, 1000);
    var paused = false;
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
                console.log(`${modD.name} ${modD.activate() ? "on" : "is already active"}`);
            break;
            case 'x':
                console.log(`${modD.name} ${modD.deactivate() ? "off" : "is already disabled"}`);
            break;
            case 'f':
                paused = true;
            break;
            case 'r':
                paused = false;
                updateGameState();
            break;
            case 't':
                paused = true;
                updateGameState();
            break;

            default:
                console.log(char);
        }
    });

    function updateGameState() {
        for (var i = 0; i < GameObject.objectsArr.length; i++) {
            GameObject.objectsArr[i].update();
        }
        document.getElementById("player_score").innerHTML = player.score;
        if(!paused) {
            requestAnimationFrame(updateGameState);
        }
    }

    requestAnimationFrame(updateGameState);
}

window.startGame = startGame();