import { GameObject } from './GameObject.js';
import { Modifier, EnlargerEffect, WidenerEffect, BallSpeedEffect} from './Effects.js';
import { Player } from './Player.js';
import { Brick } from './Brick.js';
import { Ball } from './Ball.js';


function startGame() {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
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
    const player = new Player(100, 10, playerElement, 0, container.bottom - 70, document.getElementById("player_score"));

    //Test mod
    var modA = new Modifier("UniversalScale++", new EnlargerEffect(3), player);
    var modB = new Modifier("Width1++", new WidenerEffect(2), player);
    var modC = new Modifier("Width2++", new WidenerEffect(1.75), player);
    
    var ballA = new Ball("BallA", 3, 0.33, 1, 785, 50, 25, 25, container, player);
    var modD = new Modifier("WidthBall++", new EnlargerEffect(2), ballA);
    var ballB = new Ball("BallB", 4, 0.4, 1, 400, 700, 30, 30, container, player);
    var ballC = new Ball("BallC", 3, 0.9, 1, 200, 900, 40, 40, container, player);
    var modE = new Modifier("SpeedBall++", new BallSpeedEffect(2), ballB);

    var brick1 = new Brick(300, 100, document.getElementById("brick1"), 400, 400, 15);
    var brick2 = new Brick(100, 50, document.getElementById("brick2"), 200, 100, 4);
    var brick3 = new Brick(100, 50, document.getElementById("brick3"), 300, 100, 4);
    var brick4 = new Brick(100, 50, document.getElementById("brick4"), 400, 100, 4);
    var brick5 = new Brick(100, 50, document.getElementById("brick5"), 500, 100, 4);
    var brick6 = new Brick(100, 50, document.getElementById("brick6"), 600, 100, 8);
    var brick7 = new Brick(100, 50, document.getElementById("brick7"), 700, 100, 8);
    var brick8 = new Brick(100, 50, document.getElementById("brick8"), 800, 100, 8);
    var brick9 = new Brick(100, 50, document.getElementById("brick9"), 900, 100, 4);
    var brick10 = new Brick(100, 50, document.getElementById("brick10"), 1000, 100, 4);
    var brick11 = new Brick(100, 50, document.getElementById("brick11"), 1100, 100, 4);
    var brick12 = new Brick(100, 50, document.getElementById("brick12"), 1200, 100, 4);
    var brick13 = new Brick(100, 50, document.getElementById("brick13"), 1300, 100, 4);
    var brick14 = new Brick(100, 50, document.getElementById("brick14"), 1400, 100, 4);
    var brick15 = new Brick(100, 50, document.getElementById("brick15"), 1500, 100, 4);
    var brick16 = new Brick(100, 50, document.getElementById("brick16"), 200, 200, 4);
    var brick17 = new Brick(100, 50, document.getElementById("brick17"), 300, 200, 4);
    var brick18 = new Brick(100, 50, document.getElementById("brick18"), 400, 200, 4);
    var brick19 = new Brick(100, 50, document.getElementById("brick19"), 500, 200, 4);
    var brick20 = new Brick(100, 50, document.getElementById("brick20"), 600, 200, 8);
    var brick21 = new Brick(100, 50, document.getElementById("brick21"), 700, 200, 8);
    var brick22 = new Brick(100, 50, document.getElementById("brick22"), 800, 200, 8);
    var brick23 = new Brick(100, 50, document.getElementById("brick23"), 900, 200, 4);
    var brick24 = new Brick(100, 50, document.getElementById("brick24"), 1000, 200, 4);
    var brick25 = new Brick(100, 50, document.getElementById("brick25"), 1100, 200, 4);
    var brick26 = new Brick(100, 50, document.getElementById("brick26"), 1200, 200, 4);
    var brick27 = new Brick(100, 50, document.getElementById("brick27"), 1300, 200, 4);
    var brick28 = new Brick(100, 50, document.getElementById("brick28"), 1400, 200, 4);
    var brick29 = new Brick(100, 50, document.getElementById("brick29"), 1500, 200, 4);
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
            break;
            case 'p':
                console.log(`${modE.name} ${modE.activate() ? "on" : "is already active"}`);
            break;
            case 'o':
                console.log(`${modE.name} ${modE.deactivate() ? "off" : "is already disabled"}`);
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