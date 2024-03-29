var debug = false;

window.originalSetInterval = window.setInterval;
window.originalClearInterval = window.clearInterval;
window.activeIntervals = 0;
var runningIntervals = [];
window.setInterval = function (func, delay)
{
    var newInterval;
    if(func && delay){
        newInterval = window.originalSetInterval(func,delay);
        runningIntervals.push(newInterval);
    }
    if (debug) console.log(runningIntervals);
    return newInterval;
};
window.clearInterval = function (intervalId)
{
    // JQuery sometimes hands in true which doesn't count
    var oldInterval;
    if(intervalId !== true){
        oldInterval = window.originalClearInterval(intervalId);
        var toRemove = undefined;
        for (let i = 0; i < runningIntervals.length; i++) {
            if (runningIntervals[i] == intervalId) {
                toRemove = i;
                break;
            }
        }
        runningIntervals.splice(toRemove, 1);
    }
    if (debug) console.log(runningIntervals);
    return oldInterval;
};

const GRID_WIDTH = 11;
const GRID_HEIGHT = 11;
const IMAGE_SIZE = 48;
const SCORE_PER_KILL = 10;

// Load images made by me, hosted on imgur

const ENEMY_IMAGE = document.createElement("img");
// ENEMY_IMAGE.src = "enemy.png";
ENEMY_IMAGE.src = "https://i.imgur.com/JOMp4gH.png";
// if (debug) ENEMY_IMAGE.src = "enemy_TEST.png";

const SHIP_IMAGE = document.createElement("img");
// SHIP_IMAGE.src = "ship.png";
SHIP_IMAGE.src = "https://i.imgur.com/K6n1F6y.png";
// if (debug) SHIP_IMAGE.src = "ship_TEST.png";

const MISSILE_IMAGE = document.createElement("img");
// MISSILE_IMAGE.src = "missile.png";
MISSILE_IMAGE.src = "https://i.imgur.com/ip6xnos.png";
// if (debug) MISSILE_IMAGE.src = "missile_TEST.png";

var score = 0;

// Initialize canvas
let canvas = document.createElement("canvas");
canvas.style.background = "black";
document.getElementById("space").appendChild(canvas);
canvas.width = GRID_WIDTH * IMAGE_SIZE;
canvas.height = GRID_HEIGHT * IMAGE_SIZE;
let ctx = canvas.getContext("2d");
const table = document.getElementById("space").children[0];
table.style.position = "fixed";
table.style.top = "-462px";

// Resets the game
const RESET_BUTTON = document.createElement("button");
RESET_BUTTON.innerText = "Reset";
document.body.appendChild(RESET_BUTTON);
RESET_BUTTON.addEventListener("click", (e) => {
    while(runningIntervals.length > 0) {
        clearInterval(runningIntervals[0]);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    level = 1;
    speed = 512;
    running = false;
    document.removeEventListener('keydown', checkKey);
    missiles = [];
    ship = [104,114,115,116];
    aliens = [1,3,5,7,9,23,25,27,29,31];
});

// Toggle music
var soundPlaying = false;

const MUSIC_BUTTON = document.createElement("button");
MUSIC_BUTTON.innerText = "Music: off";
document.body.appendChild(MUSIC_BUTTON);

// Music source https://freemusicarchive.org/music/Nobara_Hayakawa/Trail_EP/Nobara_Hayakawa_-_Trail_EP_-_Trail
// Licensed under Creative Commons
const music = new Audio("https://freemusicarchive.org/track/Nobara_Hayakawa_-_Trail_EP_-_Trail/download");
MUSIC_BUTTON.addEventListener("click", (e) => {
    if (soundPlaying) music.pause();
    else music.play();
    soundPlaying = !soundPlaying;
    MUSIC_BUTTON.innerHTML = `Music: ${soundPlaying? "on" : "off"}`;
});


// for (var x of document.querySelectorAll("td")) {
//     var coords = indexToCoords(parseInt(x.innerHTML));
//     x.innerHTML += `x${coords.x} y${coords.y}`
// }

// Converts object indexes to the corresponding canvas x and y coords
function indexToCoords(index) {
    return {"x": (index % (GRID_WIDTH)) * IMAGE_SIZE, "y": Math.floor(index / (GRID_HEIGHT)) * IMAGE_SIZE};
}

// Main animation frame loop
function mainLoop() {
    if (debug) {

    }
    if (running) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw objects - aliens/missiles/ship
        for (var x of aliens) {
            let coords = indexToCoords(x);
            if (debug) console.log(`drawing enemy at ${coords.x}:${coords.y}`);
            ctx.drawImage(ENEMY_IMAGE, coords.x, coords.y, IMAGE_SIZE, IMAGE_SIZE);
        }
        for (var x of missiles) {
            let coords = indexToCoords(x);
            if (debug) console.log(`drawing rocket at ${coords.x}:${coords.y}`);
            ctx.drawImage(MISSILE_IMAGE, coords.x, coords.y, IMAGE_SIZE, IMAGE_SIZE);
        }
        for (var x of ship) {
            let coords = indexToCoords(x);
            if (debug) console.log(`drawing ship at ${coords.x}:${coords.y}`);
            ctx.drawImage(SHIP_IMAGE, coords.x, coords.y, IMAGE_SIZE, IMAGE_SIZE);
        }
        // Draw score and level
        ctx.fillStyle = "green";
        ctx.font = "20px Monospace";
        ctx.fillText(`LEVEL:${level} SCORE:${score}`, 5, 20);

        if (debug) console.log("animation frame");
    }
    requestAnimationFrame(mainLoop);
}

// Bind J and L to arrows
document.addEventListener('keydown', mapIJKL);
function mapIJKL(e) {
    e = e || window.event;
    if (e.keyCode == '74') {
        checkKey(new KeyboardEvent('keypress',{'keyCode':'37'}));
        if (debug) console.log(`dispatching ArrowLeft`);
    }
    else if (e.keyCode == '76') {
        checkKey(new KeyboardEvent('keypress',{'keyCode':'39'}));
        if (debug) console.log(`dispatching ArrowRight`);
    }
}

// Override loose function
loose = () => {
    running = false;
    ctx.fillStyle = "red";
    ctx.font = "40px Monospace";
    ctx.fillText("GAME OVER", IMAGE_SIZE * GRID_WIDTH / 4, IMAGE_SIZE * GRID_HEIGHT / 2);
    ctx.fillText(` SCORE ${score}`, IMAGE_SIZE * GRID_WIDTH / 4, IMAGE_SIZE * GRID_HEIGHT / 1.5);
}

// Override win function
win = () => {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.font = "40px Monospace";
    ctx.fillText(`LEVEL ${level} DONE`, IMAGE_SIZE * GRID_WIDTH / 4, IMAGE_SIZE * GRID_HEIGHT / 2);
    ctx.fillText(` SCORE ${score}`, IMAGE_SIZE * GRID_WIDTH / 4, IMAGE_SIZE * GRID_HEIGHT / 1.5);
}

// Override collision function for score counting
function checkCollisionsMA() {
    for(var i=0;i<missiles.length;i++) {
        if(aliens.includes(missiles[i])) {
            var alienIndex = aliens.indexOf(missiles[i]);
            aliens.splice(alienIndex, 1);
            missiles.splice(i, 1);
            score += SCORE_PER_KILL;
        }
    }
}

requestAnimationFrame(mainLoop);