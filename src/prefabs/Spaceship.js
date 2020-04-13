//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);   //add object to existing scene, displayList, and updateList
        this.points = pointValue;
    }

    update() {
        //move spaceship left
        this.x -= game.settings.spaceshipSpeed;
        //wrap on screen bounds
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    //return spaceship to right side of screen
    reset() {
        this.x = game.config.width;
    }
}