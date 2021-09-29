import { GameObject } from './GameObject.js';
import { Modifier, EnlargerEffect, WidenerEffect, BallSpeedEffect} from './Effects.js';
import { Player } from './Player.js';
import { Brick } from './Brick.js';
import { Ball } from './Ball.js';


var cursorX = 50;
var cursorY = 50;
var mouseControllableList = new Array();

function updatePosition(e) {
    for (let x of mouseControllableList) {
        x.updateMouse(e);
    }
    cursorX += e.movementX;
    cursorY += e.movementY;
}

function initPointerLock() {
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    function lockChangeAlert() {
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
            console.log('Pointer locked');
            document.addEventListener("mousemove", updatePosition, false);
        } else {
            console.log('Pointer unlocked');
            document.removeEventListener("mousemove", updatePosition, false);
        }
    }

    var canvas = document.getElementById("canvas");
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

    canvas.onclick = function() {
        canvas.requestPointerLock();
    };
}

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
    Brick.docInit(document);
    initPointerLock();
        



    //Initialize player
    const playerElement = document.getElementById("player");
    const player = new Player(100, 10, playerElement, 0, container.bottom - 70, document.getElementById("player_score"), cursorX);
    mouseControllableList.push(player);

    //Test mod
    var modA = new Modifier("UniversalScale++", new EnlargerEffect(3), player);
    var modB = new Modifier("Width1++", new WidenerEffect(2), player);
    var modC = new Modifier("Width2++", new WidenerEffect(1.75), player);
    
    var ballA = new Ball("BallA", 15, 0.1, -1, 1300, 900, 10, 10, container, player);
    var modD = new Modifier("WidthBall++", new EnlargerEffect(2), ballA);
    
    // var ballB = new Ball("BallB", 4, 0.3, -1, 100, 700, 25, 25, container, player);
    // var modE = new Modifier("SpeedBall++", new BallSpeedEffect(2), ballB);
    
    // var ballC = new Ball("BallC", 3, 0.5, -1, 200, 900, 40, 40, container, player);


    // var ballManual = new Ball("BallManual", 0, 0, 0, 300, 900, 25, 25, container, player);
    // ballManual.type = "manual";
    // mouseControllableList.push(ballManual);

    var brick0 = new Brick(400, 50, document.getElementById("brick0"), 1050, 400, 32, 0.2);
    var brick1 = new Brick(400, 50, document.getElementById("brick1"), 350, 400, 32, 0.5);
    var brick2 = new Brick(100, 50, document.getElementById("brick2"), 200, 100, 4);
    var brick3 = new Brick(100, 50, document.getElementById("brick3"), 300, 100, 4);
    var brick4 = new Brick(100, 50, document.getElementById("brick4"), 400, 100, 4);
    var brick5 = new Brick(100, 50, document.getElementById("brick5"), 500, 100, 4);
    var brick6 = new Brick(100, 50, document.getElementById("brick6"), 600, 100, 8);
    var brick7 = new Brick(100, 50, document.getElementById("brick7"), 700, 100, 8);
    var brick8 = new Brick(100, 50, document.getElementById("brick8"), 800, 100, 8);
    var brick9 = new Brick(100, 50, document.getElementById("brick9"), 900, 100, 8);
    var brick10 = new Brick(100, 50, document.getElementById("brick10"), 1000, 100, 8);
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
    var brick23 = new Brick(100, 50, document.getElementById("brick23"), 900, 200, 8);
    var brick24 = new Brick(100, 50, document.getElementById("brick24"), 1000, 200, 8);
    var brick25 = new Brick(100, 50, document.getElementById("brick25"), 1100, 200, 4);
    var brick26 = new Brick(100, 50, document.getElementById("brick26"), 1200, 200, 4);
    var brick27 = new Brick(100, 50, document.getElementById("brick27"), 1300, 200, 4);
    var brick28 = new Brick(100, 50, document.getElementById("brick28"), 1400, 200, 4);
    var brick29 = new Brick(100, 50, document.getElementById("brick29"), 1500, 200, 4);

    var brick43 = new Brick(50, 50, document.getElementById("brick30"), 150, 325, 4);
    var brick30 = new Brick(50, 50, document.getElementById("brick31"), 200, 325, 4);
    var brick31 = new Brick(50, 50, document.getElementById("brick32"), 250, 325, 4);
    var brick32 = new Brick(50, 50, document.getElementById("brick33"), 300, 325, 4);
    var brick33 = new Brick(50, 50, document.getElementById("brick34"), 350, 325, 4);
    var brick34 = new Brick(50, 50, document.getElementById("brick35"), 400, 325, 4);
    var brick35 = new Brick(50, 50, document.getElementById("brick36"), 450, 325, 4);

    var brick36 = new Brick(50, 50, document.getElementById("brick37"), 1300, 325, 4);
    var brick37 = new Brick(50, 50, document.getElementById("brick38"), 1350, 325, 4);
    var brick38 = new Brick(50, 50, document.getElementById("brick39"), 1400, 325, 4);
    var brick39 = new Brick(50, 50, document.getElementById("brick40"), 1450, 325, 4);
    var brick40 = new Brick(50, 50, document.getElementById("brick41"), 1500, 325, 4);
    var brick41 = new Brick(50, 50, document.getElementById("brick42"), 1550, 325, 4);
    var brick42 = new Brick(50, 50, document.getElementById("brick43"), 1600, 325, 4);
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
        GameObject.gameIteration = (GameObject.gameIteration + 1) % Number.MAX_SAFE_INTEGER;
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