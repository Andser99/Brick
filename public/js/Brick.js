import { GameObject } from './GameObject.js';
import { toPixels } from './Util.js';

export class Brick extends GameObject {
    constructor(w, h, element, posX, posY, lifes, color) {
        super(w, h, element, posX, posY);
        this.color = color;
        this.posX = posX;
        this.posY = posY;
        this.element = element;
        this.lifes = lifes;
        this.setW(w);
        this.setH(h);
        this.element.innerHTML = this.lifes;
        this.element.style.left = toPixels(posX+6);
        this.element.style.top = toPixels(posY+6);
        this.element.style.backgroundColor = color;
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
        this.color;
        setTimeout(() => {
            this.element.style.backgroundColor = "dark"+this.color;
            setTimeout(()=> {
                this.element.style.backgroundColor = this.color;
            }, 60)
        }, 0);
        collider.owner.score += 10;
        if (this.lifes <= 0) {
            this.element.style.display = "none";
            GameObject.removeItemFromArr(this);
        }
    }
}
