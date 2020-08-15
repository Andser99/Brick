import { GameObject } from './GameObject.js';

//Decimal multiplier to size e.g. x1.1
export function EnlargerEffect(multiplier) {
    var isEnabled = false;
    var enable = (gameObject) => {
        gameObject.setW(gameObject.w * multiplier);
        gameObject.setH(gameObject.h * multiplier);
    }
    var disable = (gameObject) => {
        gameObject.setW(gameObject.w / multiplier);
        gameObject.setH(gameObject.h / multiplier);
    }
    return {
        enable: (gameObject) => {
            if (!isEnabled) {
                enable(gameObject);
                isEnabled = true;
                return true;
            }
            return false;
        },
        disable: (gameObject) => {
            if (isEnabled){
                disable(gameObject);
                isEnabled = false;
                return true;
            }
            return false;
        }
    }
}


//Decimal multiplier to width e.g. 100x1.1
export function WidenerEffect(multiplier) {
    var isEnabled = false;
    var enable = (gameObject) => {
        gameObject.setW(gameObject.w * multiplier);
    }
    var disable = (gameObject) => {
        gameObject.setW(gameObject.w / multiplier);
    }
    return {
        enable: (gameObject) => {
            if (!isEnabled) {
                enable(gameObject);
                isEnabled = true;
                return true;
            }
            return false;
        },
        disable: (gameObject) => {
            if (isEnabled){
                disable(gameObject);
                isEnabled = false;
                return true;
            }
            return false;
        }
    }
}

export function BallSpeedEffect(multiplier) {
    var isEnabled = false;
    var enable = (gameObject) => {
        gameObject.speed *= multiplier;
    }
    var disable = (gameObject) => {
        gameObject.speed /= multiplier;
    }
    return {
        enable: (gameObject) => {
            if (!isEnabled) {
                enable(gameObject);
                isEnabled = true;
                return true;
            }
            return false;
        },
        disable: (gameObject) => {
            if (isEnabled){
                disable(gameObject);
                isEnabled = false;
                return true;
            }
            return false;
        }
    }
}
// NYI
// export function BounceSpeedMultiplier(multiplier) {
//     return {
//         enable: (gameObject) => {
//             if (!isEnabled) {
//                 enable(gameObject);
//                 isEnabled = true;
//                 return true;
//             }
//             return false;
//         },
//         disable: (gameObject) => {
//             if (isEnabled){
//                 disable(gameObject);
//                 isEnabled = false;
//                 return true;
//             }
//             return false;
//         }
//     }
// }

export class Modifier {
    constructor(name, effect, owner){
        this.name = name;
        this.effect = effect;
        this.owner = owner;
        this.isActive = false;
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