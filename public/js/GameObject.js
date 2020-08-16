import { toPixels } from './Util.js';

export class GameObject {

    static objectCount = 0;
    static objectsArr = new Array();

    static removeItemFromArr(value) {
        // console.log(GameObject.objectsArr);
        var index = GameObject.objectsArr.indexOf(value);
        if (index > -1) {
            GameObject.objectsArr.splice(index, 1);
        }
        // console.log("after reomval:");
        // console.log(GameObject.objectsArr);
      }

    constructor(w, h, element, posX, posY) {
        GameObject.objectCount++;
        GameObject.objectsArr.push(this);
        this.element = element;
        this.setW(w);
        this.setH(h);
        this.posX = posX;
        this.posY = posY;
    }

    collide(collider) {}

    update() {}

    setW(value) {
        this.w = value;
        if (this.element != undefined) {
            this.element.style.width = toPixels(this.w);
        }
    }

    setH(value) {
        this.h = value;
        if (this.element != undefined) {
            this.element.style.height = toPixels(this.h);
        }
    }

    /*setPosScaled(x, y) {
        this.element.style.top = toPixels(y * GameObject.scaleCoeff.h);
        this.element.style.left = toPixels(x * GameObject.scaleCoeff.w);
    }*/
}