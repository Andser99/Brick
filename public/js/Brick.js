import { GameObject } from './GameObject.js';
import { PowerUp } from './PowerUp.js';
import { toPixels } from './Util.js';

export class Brick extends GameObject {

    //Number of frames the brick won't register hit events after a collision (collision still works, only for counting lifes)
    static GLOBAL_FRAME_HIT_COOLDOWN = 2;

    //Max 8 sound pitches are implemented;
    static GLOBAL_COUNT_SOUND_VARIETIES = 4;

    static sound = (obj) => {
        // new Audio("../sound/dong" + Math.floor(Math.random()*8) + ".mp3").play();
        let path = "../sound/dong" + ((obj.lifes > 7 ? 8 : obj.lifes) - 1) + ".mp3";
        console.log(path);
        new Audio(path).play();
    }

    static mouseDown = 0;
    static docInit(document) {
        document.body.onmousedown = function() { 
        Brick.mouseDown = true;
        }
        document.body.onmouseup = function() {
        Brick.mouseDown = false;
    }
    }
    static colorTable = new Array(
        {
            color: "red",
            text: "black",
            hit: "darkred"
        },
        {
            color: "blue",
            text: "black",
            hit: "darkblue"
        },
        {
            color: "lawngreen",
            text: "black",
            hit: "limegreen"
        },
        {
            color: "yellow",
            text: "black",
            hit: "orange"
        },
        {
            color: "pink",
            text: "black",
            hit: "lightpink"
        },
        {
            color: "black",
            text: "white",
            hit: "dimgray"
        },
        {
            color: "white",
            text: "black",
            hit: "lavenderblush"
        }
        );

    constructor(w, h, element, posX, posY, lifes, powerUpChance) {
        super(w, h, element, posX, posY);
        this.canBeHit = 0;
        this.posX = posX;
        this.posY = posY;
        this.element = element;
        this.lifes = lifes;
        this.powerUpChance = (powerUpChance == null ? 2 : powerUpChance);
        this.setW(w);
        this.setH(h);
        if (lifes > Brick.colorTable.length - 1) {
            this.element.style.backgroundColor = Brick.colorTable[Brick.colorTable.length - 1].color;
        }
        else {
            this.element.style.backgroundColor = Brick.colorTable[this.lifes].color;
        }
        this.element.innerHTML = this.lifes;
        this.element.style.left = toPixels(posX);
        this.element.style.top = toPixels(posY);
        this.soundIsPlayed = false;
    }

    update() {
        this.decreaseHit();
    }

    setW(value) {
        this.w = value;
        if (this.element != undefined) {
            this.element.style.width = toPixels(this.w-12);
        }
        this.w = value;
    }

    setH(value) {
        this.h = value;
        if (this.element != undefined) {
            this.element.style.height = toPixels(this.h-12);
        }
        this.h = value;
    }

    decreaseHit() {
        if (this.canBeHit > 0) this.canBeHit--;
    }

    collide(collider) {
        if (this.canBeHit < 1) {
            if (collider.type == "manual") {
                if (!this.soundIsPlayed && Brick.mouseDown)
                    Brick.sound(this);
                if (Brick.mouseDown) {
                    this.soundIsPlayed = true;
                }
                else {
                    this.soundIsPlayed = false;
                }
            }
            else {
                Brick.sound(this);
            }
            this.canBeHit += Brick.GLOBAL_FRAME_HIT_COOLDOWN; //number of frames to ignore hits;
            this.lifes -= collider.type == "manual" ? 0 : 1;
            this.element.innerHTML = this.lifes;
            if (this.lifes <= 0) {
                this.element.style.display = "none";
                GameObject.removeItemFromArr(this);
                if (Math.random() >= this.powerUpChance) new PowerUp(this.posX, this.posY);
            } else {
                setTimeout(() => {
                    if (this.lifes > Brick.colorTable.length) {
                        this.element.style.backgroundColor = Brick.colorTable[Brick.colorTable.length - 1].hit;
                        this.element.style.color = Brick.colorTable[Brick.colorTable.length - 1].text;
                        setTimeout(()=> {
                            this.element.style.backgroundColor = Brick.colorTable[Brick.colorTable.length - 1].color;
                        }, 100)
                    }
                    else {
                        this.element.style.backgroundColor = Brick.colorTable[this.lifes - 1].hit;
                        this.element.style.color = Brick.colorTable[this.lifes - 1].text;
                        setTimeout(()=> {
                            this.element.style.backgroundColor = Brick.colorTable[this.lifes - 1].color;
                        }, 100)
                    }
                }, 0);
            }
            collider.owner.addScore(10);
        }
        else {
            console.log("disabled hit");
        }
    }
}
