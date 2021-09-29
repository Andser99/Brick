import { GameObject } from './GameObject.js';
import { Effects, Modifier } from './Effects.js';
import { toPixels } from './Util.js';

export class PowerUp extends GameObject {

    constructor(x, y){
        var newPowerUp = document.createElement("div");
        super(20, 20, newPowerUp, x, y);
        this.power = 
    }
}