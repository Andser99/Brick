import { GameObject } from './GameObject.js';
import { toPixels } from './Util.js';

export class Player extends GameObject {

    constructor(w, h, element, posX = 0, posY = 0, scoreElement) {
        super(w, h, element, posX, posY);
        this.score = 0;
        this.name = "Player";
        this.modList = new Array();
        this.element.style.width = toPixels(w-12);
        this.element.style.height = toPixels(h-12);
        this.element.style.top = toPixels(posY);
        this.posX = posX;
        this.scoreElement = scoreElement;
        

        this.handleMousemove = (event) => {
            // console.log(`mouse position: ${event.x}:${event.y}`);
            this.updatePos(event.x);
        };
        document.addEventListener('mousemove', this.handleMousemove);
    }

    updatePos(posX) {
        this.posX = posX;
        // var position = posX - this.w/2; //center to mouse
        this.element.style.left = toPixels(posX+6);
        this.element.style.top = toPixels(this.posY);
    }

    addScore(value) {
        if (value > 0) {
            setTimeout(() => {
                this.score += value;
                this.scoreElement.style.color = "lime";
                this.scoreElement.style.fontSize = "5.5em";
                setTimeout(()=> {
                    this.scoreElement.style.color = "mediumpurple";
                    this.scoreElement.style.fontSize = "5em";
                }, 200)
            }, 0);
        }
        else {
            setTimeout(() => {
                this.score += value;
                this.scoreElement.style.color = "red";
                this.scoreElement.style.fontSize = "4.5em";
                setTimeout(()=> {
                    this.scoreElement.style.color = "mediumpurple";
                    this.scoreElement.style.fontSize = "5em";
                }, 200)
            }, 0);
        }
    }
}

