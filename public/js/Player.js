import { GameObject } from './GameObject.js';
import { toPixels } from './Util.js';

export class Player extends GameObject {

    constructor(w, h, element, posX = 0, posY = 800) {
        super(w, h, element, posX, posY);
        this.score = 0;
        this.name = "Player";
        this.modList = new Array();
        this.element.style.width = toPixels(w);
        this.element.style.height = toPixels(h);
        this.element.style.top = toPixels(posY);
        this.posX = posX;
        

        this.handleMousemove = (event) => {
            // console.log(`mouse position: ${event.x}:${event.y}`);
            this.updatePos(event.x);
        };
        document.addEventListener('mousemove', this.handleMousemove);
    }

    updatePos(posX) {
        this.posX = posX;
        // var position = posX - this.w/2; //center to mouse
        this.element.style.left = toPixels(posX);
        this.element.style.top = toPixels(this.posY);
    }
}

