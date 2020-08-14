export class GameObject {
    static objectCount = 0;
    static getCount() {
        return objectCount;
    }
    constructor(w, h, element) {
        GameObject.objectCount++;
        this.modList = new Array();
        this.w = w;
        this.h = h;
        this.element = element;
    }
}

export class Player extends GameObject {

    constructor(w, h, element) {
        super(w, h, element);
        this.modList = new Array();
        this.element.style.width = toPixels(w);
        this.element.style.height = toPixels(h);
        

        this.handleMousemove = (event) => {
            // console.log(`mouse position: ${event.x}:${event.y}`);
            this.updatePos(event.x);
        };
        document.addEventListener('mousemove', this.handleMousemove);
    }

    updatePos(posX) {
        var position = posX - this.w/2;
        this.element.style.left = position + "px";
    }

    // DEPRECATED MOD HANDLING
    // addMod(mod){
    //     if (mod instanceof Modifier) {
    //         this.modList.push(Modifier);
    //         this.modList[this.modList.length].enable();
    //     }
    // }

    // removeMod(){
    //     //NYI
    // }
}

export function toPixels(value) {
    return value + "px";
}


//Decimal multiplier to size e.g. x1.1
export function EnlargerEffect(multiplier) {
    var isEnabled = false;
    var enable = (gameObject) => {
        gameObject.w = gameObject.w * multiplier;
        gameObject.h = gameObject.h * multiplier;
        gameObject.element.style.width = toPixels(gameObject.w);
        gameObject.element.style.height = toPixels(gameObject.h);
    }
    var disable = (gameObject) => {
        gameObject.w = gameObject.w / multiplier;
        gameObject.h = gameObject.h / multiplier;
        gameObject.element.style.width = toPixels(gameObject.w);
        gameObject.element.style.height = toPixels(gameObject.h);
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
        gameObject.w = gameObject.w * multiplier;
        gameObject.element.style.width = toPixels(gameObject.w);
    }
    var disable = (gameObject) => {
        gameObject.w = gameObject.w / multiplier;
        gameObject.element.style.width = toPixels(gameObject.w);
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