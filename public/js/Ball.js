import { GameObject } from './GameObject.js';
import { toPixels } from './Util.js';
import { Player } from './Player.js';

export class Ball extends GameObject {
    constructor(name, speed, vectorX, vectorY, posX, posY, w, h, container, owner) {
        super(w, h, undefined, posX, posY);
        this.name = name;
        this.speed = speed;
        this.vectorX = vectorX;
        this.vectorY = vectorY;
        this.container = container;
        this.owner = owner;
        this.color = "";
        this.element = document.createElement("div");
        this.element.className = "ball";
        this.element.style.width = toPixels(w);
        this.element.style.height = toPixels(h);
        this.container.appendChild(this.element);
        this.setColor("red");
        this.update();
    }

    setColor(value) {
        this.color = value;
        this.element.style.backgroundColor = this.color;
    }



    update() {
        var unit = Math.sqrt(this.vectorX*this.vectorX + this.vectorY*this.vectorY);
        // console.log(this.container.left);
        var moveX = this.vectorX/unit * this.speed;
        var moveY = this.vectorY/unit * this.speed;
        this.setPos(this.posX + moveX, this.posY + moveY);
        this.checkBoundary(moveX, moveY);
        this.checkCollision();
        // console.log("new ball pos" + moveX + " " + moveY);
    }

    checkBoundary(toX, toY) {
        if (this.posX + this.w + toX > this.container.right) {
            this.vectorX = -this.vectorX;
            this.setPos(this.container.right - this.w, this.posY);
        }
        if (this.posX + toX < this.container.left) {
            this.vectorX = -this.vectorX;
            this.setPos(this.container.left, this.posY);
        }
        if (this.posY + this.h/2 + toY > this.container.bottom) {
            this.vectorY = -this.vectorY;
            this.setPos(this.owner.posX + this.owner.w/2 - this.w/2, this.owner.posY - this.h - 5);
            this.owner.addScore(-10);
            this.flashOnDeath();
        }
        if (this.posY + toY < this.container.top) {
            this.vectorY = -this.vectorY;
            this.setPos(this.posX, this.container.top);
        }
    }

    flashOnDeath() {
        setTimeout(() => {
            this.element.classList.add("blinking");
            setTimeout(() => {
                this.element.classList.remove("blinking");
            }, 1200);
        }, 0);
    }

    checkCollision() {
        
        var unit = Math.sqrt(this.vectorX*this.vectorX + this.vectorY*this.vectorY);
        var prevX = this.posX;
        var prevY = this.posY;
        this.posX += this.vectorX/unit * this.speed;
        this.posY += this.vectorY/unit * this.speed;
        for (var i = 0; i < GameObject.objectsArr.length; i++) {
            var obj = GameObject.objectsArr[i];
            if (!(obj instanceof Ball)) {
                var largestOverlap = 0;
                var diffX = 1;
                var diffY = 1;
                var offsetX = 0;
                var offsetY = 0;
                // console.log(obj.posY + " " + this.posY + " " + this.h);
                if (this.posX + this.w > obj.posX && this.posX < obj.posX + obj.w && this.posY + this.h > obj.posY && this.posY < obj.posY + obj.h) {
                    //collision side check with intersection depth
                    var dx=(this.posX+this.w/2)-(obj.posX+obj.w/2);
                    var dy=(this.posY+this.h/2)-(obj.posY+obj.h/2);
                    var width=(this.w+obj.w)/2;
                    var height=(this.h+obj.h)/2;
                    var crossWidth=width*dy;
                    var crossHeight=height*dx;
                    var collision='none';
                    if(Math.abs(dx)<=width && Math.abs(dy)<=height){
                        if(crossWidth>crossHeight){
                            collision=(crossWidth>(-crossHeight))?'b':'l';
                        }else{
                            collision=(crossWidth>-(crossHeight))?'r':'t';
                        }
                    }

                    switch(collision) {
                        case('b'):
                            diffX = 1;
                            diffY = -1;
                            // offsetY = -this.vectorY/unit * this.speed * 1.05;
                        break;
                        case('t'):
                            diffX = 1;
                            diffY = -1;
                            // offsetY = -this.vectorY/unit * this.speed * 1.05;
                        break;
                        case('l'):
                            diffX = -1;
                            diffY = 1;
                            // offsetX = this.vectorX/unit * this.speed * 1.05;
                        break;
                        case('r'):
                            diffX = -1;
                            diffY = 1;
                            // offsetX = -this.vectorX/unit * this.speed * 1.05;
                        break;
                        default:
                            diffX = -1;
                            diffY = -1;
                    }

                    obj.collide(this);
                    if (obj instanceof Player) {
                        this.vectorX += 2*((this.posX + this.w/2) - (obj.posX + obj.w/2))/obj.w;
                        this.vectorY *= -1;
                        this.setPos(this.posX, obj.posY - this.h);
                    }
                    else {
                        this.vectorX *= diffX;
                        this.vectorY *= diffY;
                        // this.setPos(this.posX + (prevX - this.posX), this.posY + (prevY - this.posY));
                        this.setPos(prevX + 2*(prevX - this.posX), prevY + 2*(prevY - this.posY));
                    }
                }
            }
        }
    }

    setPos(x, y) {
        this.posX = x;
        this.posY = y;
        this.element.style.top = toPixels(y);
        this.element.style.left = toPixels(x);
    }
}