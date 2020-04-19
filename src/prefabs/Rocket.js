//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, leftKey, rightKey, fireKey, frame) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);   //add object to existing scene, displayList, and updateList
        this.isFiring = false;      //check Rocket's firing status

        this.sfxRocket = scene.sound.add("sfx_rocket");

        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.fireKey = fireKey;
    }

    update() {
        //left/right movement
        if(!this.isFiring) {
            if(this.leftKey.isDown && this.x >= 47) {
                this.x -= 2;
            } else if (this.rightKey.isDown && this.x <= 578) {
                this.x += 2;
            }
        }

        //fire button
        if(Phaser.Input.Keyboard.JustDown(this.fireKey) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        // if fired, move up
        if(this.isFiring && this.y >= 108) {
            this.y -= 2;
        }
        //reset on miss
        if(this.y <= 108) {
            this.isFiring = false;
            this.y = 431;
        }
    }

    //return rocket to firing position
    reset() {
        this.isFiring = false;
        this.y = 431;
    }
}