import { GameObject } from './GameObject.js';
import { toPixels } from './Util.js';

export class Brick extends GameObject {
    constructor(w, h, element, posX, posY, lifes) {
        super(w, h, element, posX, posY);
        this.posX = posX;
        this.posY = posY;
        this.element = element;
        this.lifes = lifes;
        this.setW(w);
        this.setH(h);
        this.element.innerHTML = this.lifes;
        this.element.style.left = toPixels(posX);
        this.element.style.top = toPixels(posY);
    }

    setW(value) {
        this.w = value;
        if (this.element != undefined) {
            this.element.style.width = toPixels(this.w);
        }
        this.w = value + 6;
    }

    setH(value) {
        this.h = value;
        if (this.element != undefined) {
            this.element.style.height = toPixels(this.h);
        }
        this.h = value + 6;
    }

    collide(collider) {
        this.lifes--;
        this.element.innerHTML = this.lifes;
        if (this.lifes <= 0) {
            collider.owner.score += 100;
            this.element.style.display = "none";
            GameObject.removeItemFromArr(this);
        }
    }
}
