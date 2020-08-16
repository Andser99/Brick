import { GameObject } from './GameObject.js';
import { toPixels } from './Util.js';

export class Brick extends GameObject {

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

    constructor(w, h, element, posX, posY, lifes) {
        super(w, h, element, posX, posY);
        this.canBeHit = 0;
        this.posX = posX;
        this.posY = posY;
        this.element = element;
        this.lifes = lifes;
        this.setW(w);
        this.setH(h);
        if (lifes > Brick.colorTable.length - 1) {
            this.element.style.backgroundColor = Brick.colorTable[Brick.colorTable.length - 1].color;
        }
        else {
            this.element.style.backgroundColor = Brick.colorTable[this.lifes].color;
        }
        this.element.innerHTML = this.lifes;
        this.element.style.left = toPixels(posX+6);
        this.element.style.top = toPixels(posY+6);
    }

    update() {
        this.decreaseHit();
    }

    setW(value) {
        this.w = value;
        if (this.element != undefined) {
            this.element.style.width = toPixels(this.w-12);
        }
        this.w = value + 6;
    }

    setH(value) {
        this.h = value;
        if (this.element != undefined) {
            this.element.style.height = toPixels(this.h-12);
        }
    }

    decreaseHit() {
        if (this.canBeHit > 0) this.canBeHit--;
    }

    collide(collider) {
        if (this.canBeHit < 1) {
            this.canBeHit += 3; //number of frames to ignore hits;
            this.lifes--;
            this.element.innerHTML = this.lifes;
            if (this.lifes <= 0) {
                this.element.style.display = "none";
                GameObject.removeItemFromArr(this);
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
