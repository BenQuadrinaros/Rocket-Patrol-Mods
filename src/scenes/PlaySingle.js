class PlaySingle extends Phaser.Scene {
    constructor() {
        super("playSingle");
    }

    preload() {
        //load images/tile sprite
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        //load audio files
        this.load.audio("sfx_select", "./assets/blip_select12.wav");
        this.load.audio("sfx_explosion", "./assets/explosion38.wav");
        this.load.audio("sfx_rocket", "./assets/rocket_shot.wav");
    }
    
    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480,"starfield").setOrigin(0,0);

        //white rectangle borders
        this.add.rectangle(5,5,630,32,0xFACADE).setOrigin(0,0);
        this.add.rectangle(5,443,630,32,0xFACADE).setOrigin(0,0);
        this.add.rectangle(5,5,32,455,0xFACADE).setOrigin(0,0);
        this.add.rectangle(603,5,32,455,0xFACADE).setOrigin(0,0);

        //green UI background
        this.add.rectangle(37,42,566,64,0x00FF00).setOrigin(0,0);
        
        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, "rocket", keyLEFT, keyRIGHT, keyF).setScale(.5,.5).setOrigin(0,0);

        //add spaceships x3
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, "spaceship", 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, "spaceship", 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width + 0, 260, "spaceship", 0, 10).setOrigin(0,0);

        //create animation for explosion
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        //score display configs
        let scoreConfig = {
            fontFamily: "Courier", 
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        };
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        this.gameOver = false;
        //second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, "(F)ire to Restart or (←) for Menu", scoreConfig).setOrigin(.5);
            this.gameOver = true;
        }, null, this);
        this.timeRight = this.add.text(536, 54, Math.floor((game.settings.gameTimer - this.clock.elapsed) / 1000), scoreConfig);

        this.increase30 = false;
    }

    update() {
        //restart the game
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //update time display
        this.timeRight.text = Math.floor((game.settings.gameTimer - this.clock.elapsed) / 1000);
        if(!this.increase30 && (this.clock.elapsed / 1000) >= 30) {
            game.settings.spaceshipSpeed += 3;
            this.increase30 = true;
        }

        //scroll starfield
        this.starfield.tilePositionX -= 4;

        //update all entities
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        
        //check collisions on each ship
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
    }

    checkCollision(rocket, ship) {
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height && rocket.y + rocket.height > ship.y) {
                return true;
            } else {
                return false;
            }
    }
    
    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0,0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //increment score and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play("sfx_explosion");
    }
}
