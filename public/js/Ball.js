import { GameObject } from './GameObject.js';
import { toPixels } from './Util.js';
import { Player } from './Player.js';
import { Brick } from './Brick.js';

export class Ball extends GameObject {

    //Total trail duration is TRAIL_DURATION * TRAIL_PERIOD in [ms]
    //Number of iterations of trail ball creation
    static TRAIL_ITERATIONS = 20;
    //Period in [ms] for balls to change alpha
    static TRAIL_PERIOD = 16.667;

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

    trailingFadeFunction(i) {
        // let res = Math.sqrt(0.25 - i/Ball.TRAIL_ITERATIONS / 4);
        // if (i < 5) return 0.3;
        let res = Math.sqrt((1 - i/Ball.TRAIL_ITERATIONS) / 8);
        // let res = (1 - i/Ball.TRAIL_ITERATIONS) / 2;
        return res;
    }

    createTrailingImage() {
        let trailBall = document.createElement("div");
        trailBall.className = "ball";
        trailBall.style.width = toPixels(this.w);
        trailBall.style.height = toPixels(this.h);
        trailBall.style.left = toPixels(this.posX);
        trailBall.style.top = toPixels(this.posY);
        trailBall.style.backgroundColor = this.color;
        trailBall.style.opacity = 0.5;
        this.container.appendChild(trailBall);
        for (let i = 1; i < Ball.TRAIL_ITERATIONS; i++) {
            setTimeout(() => {
                trailBall.style.opacity = `${this.trailingFadeFunction(i)}`;
                //Recenter ball and shrink, recentering is necessary since elements are anchored
                //to the top left corner
                let currentX = parseInt(trailBall.style.left.split("px"));
                let currentY = parseInt(trailBall.style.top.split("px"));
                let prevWidth = parseInt(trailBall.style.width.split("px"));
                let prevHeight = parseInt(trailBall.style.height.split("px"));
                // let newWidth = prevWidth * 0.8;
                // let newHeight = prevHeight * 0.8;
                let newWidth = prevWidth - this.w / Ball.TRAIL_ITERATIONS;
                let newHeight = prevHeight - this.h / Ball.TRAIL_ITERATIONS;
                let deltaX = Math.abs((prevWidth - newWidth) / 2);
                let deltaY = Math.abs((prevHeight - newHeight) / 2);

                //magic +0.5 which makes every other ball snap to the next pixel
                //when rounding (since pixels picked to draw are probably floored) creating a smoother trajectory
                trailBall.style.left = toPixels(currentX + deltaX + 0.5);
                trailBall.style.top = toPixels(currentY + deltaY);

                trailBall.style.width = toPixels(newWidth);
                trailBall.style.height = toPixels(newHeight);
            }, i*Ball.TRAIL_PERIOD);
        }
        setTimeout(() => {this.container.removeChild(trailBall)}, Ball.TRAIL_ITERATIONS * Ball.TRAIL_PERIOD + Ball.TRAIL_PERIOD);
    }

    updateMouse(e) {
        this.posX += e.movementX;
        this.posY += e.movementY;
        this.setPos(this.posX, this.posY);
    }

    update() {
        if (GameObject.gameIteration % Math.floor(this.h / 10) == 0)
            this.createTrailingImage();
        if (this.type == "manual"){
            this.setPos(this.posX, this.posY);
            this.checkCollision();
            return;
        }
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
        if (this.type != "manual"){
            this.posX += this.vectorX/unit * this.speed;
            this.posY += this.vectorY/unit * this.speed;
        }
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
                    var dx = (this.posX+this.w/2)-(obj.posX+obj.w/2); //position difference   along the x axis
                    var dy = (this.posY+this.h/2)-(obj.posY+obj.h/2); //                      along the y axis
                    var width = (this.w+obj.w)/2;
                    var height = (this.h+obj.h)/2;

                    //Multiply crossheight by the distance vector square which increases
                    //the crosswidth "weight" in the corresponding distance, creating
                    //more natural bounces in that direction
                    var crossWidth = width*dy * Math.pow(this.vectorY, 2);
                    var crossHeight = height*dx * Math.pow(this.vectorX, 2);
                    var collision = 'none';
                    //Letters indicate the side of the object that was hit, not the ball
                    if(Math.abs(dx) <= width && Math.abs(dy) <= height){
                        if (this.vectorX > 0 && this.vectorY > 0) {
                            collision = crossWidth > crossHeight ? 'l' : 't';
                            console.log(`left top ${collision}`);
                        }
                        if (this.vectorX < 0 && this.vectorY > 0) {
                            collision = crossWidth>-(crossHeight) ? 'r' : 't';
                            console.log(`right top ${collision}`);
                        }
                        if (this.vectorX < 0 && this.vectorY < 0) {
                            collision = crossWidth > crossHeight ? 'b' : 'r';
                            console.log(`bottom right ${collision}`);
                        }
                        if (this.vectorX > 0 && this.vectorY < 0) {
                            collision = (crossWidth>-(crossHeight)) ? 'b' : 'l';
                            console.log(`bottom left ${collision}`);
                        }
                        //Old bounce check, doesn't account for the direction of the ball
                        //e.g. a ball moving down and right could bounce from the right wall
                        //the right wall could never be hit from that direction of movement
                        // if(crossWidth > crossHeight) {
                        //     collision = (crossWidth>-(crossHeight))?'b':'l';
                        // } else {
                        //     collision = (crossWidth>-(crossHeight))?'r':'t';
                        // }
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
                    if (obj instanceof Player) {
                        this.vectorX += 2*((this.posX + this.w/2) - (obj.posX + obj.w/2))/obj.w;
                        this.vectorY *= -1;
                        this.setPos(this.posX, obj.posY - this.h);
                    }
                    else {
                        this.vectorX *= diffX;
                        this.vectorY *= diffY;
                        switch(collision) {
                            case('t'):
                                this.setPos(prevX + 2*(prevX - this.posX), obj.posY - this.h);
                                break;
                            case('b'):
                                this.setPos(prevX + 2*(prevX - this.posX), obj.posY + obj.h);
                                break;
                            case('l'):
                                this.setPos(obj.posX - this.w, prevY + 2*(prevY - this.posY));
                                break;
                            case('r'):
                                this.setPos(obj.posX + obj.w, prevY + 2*(prevY - this.posY));
                                break;
                            // default:
                            //     this.setPos(this.posX + (prevX - this.posX), this.posY + (prevY - this.posY));
                        }
                    }
                    obj.collide(this);
                //return here if only the first collision found should count
                break;
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