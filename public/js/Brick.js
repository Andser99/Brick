import { GameObject } from './GameObject.js';
import { toPixels } from './Util.js';

export class Brick extends GameObject {

    static colorTable = new Array(
        {
            color: "red",
            hit: "darkred"
        },
        {
            color: "blue",
            hit: "darkblue"
        },
        {
            color: "lawngreen",
            hit: "limegreen"
        },
        {
            color: "yellow",
            hit: "orange"
        },
        {
            color: "pink",
            hit: "lightpink"
        },
        {
            color: "black",
            hit: "dimgray"
        },
        {
            color: "white",
            hit: "lavenderblush"
        }
        );

    constructor(w, h, element, posX, posY, lifes) {
        super(w, h, element, posX, posY);
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

    collide(collider) {
        this.lifes--;
        this.element.innerHTML = this.lifes;
        setTimeout(() => {
            if (this.lifes > Brick.colorTable.length - 1) {
                this.element.style.backgroundColor = Brick.colorTable[Brick.colorTable.length - 1].hit;
                setTimeout(()=> {
                    this.element.style.backgroundColor = Brick.colorTable[Brick.colorTable.length - 1].color;
                }, 100)
            }
            else {
                this.element.style.backgroundColor = Brick.colorTable[this.lifes].hit;
                setTimeout(()=> {
                    this.element.style.backgroundColor = Brick.colorTable[this.lifes].color;
                }, 100)
            }
        }, 0);
        collider.owner.addScore(10);
        if (this.lifes <= 0) {
            this.element.style.display = "none";
            GameObject.removeItemFromArr(this);
        }
    }
}
