import { GameObject } from './GameObject.js';
import { Modifier } from './Effects.js';
import { toPixels } from './Util.js';

export class PowerUp extends GameObject {

    constructor(x, y){
        var newPowerUp = document.createElement("div");
        super(20, 20, newPowerUp, x, y);
        this.power = new Modifier("UniversalScale++", new EnlargerEffect(3), player);
    }

    activate() {
        if (this.owner instanceof GameObject) {
            this.isActive = true;
            return this.effect.enable(this.owner);
        }
        else {
            console.log(`Error: Invalid owner for ${this}, owner(${this.owner})`);
        }
    }

    deactivate() {
        if (this.owner instanceof GameObject) {
            this.isActive = false;
            return this.effect.disable(this.owner);
        }
        else {
            console.log(`Error: Invalid owner for ${this}, owner(${this.owner})`);
        }
    }
}