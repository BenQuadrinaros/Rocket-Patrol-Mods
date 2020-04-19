class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio files
        this.load.audio("sfx_select", "./assets/blip_select12.wav");
        this.load.audio("sfx_explosion", "./assets/explosion38.wav");
        this.load.audio("sfx_rocket", "./assets/rocket_shot.wav");
    }
    
    create() {
        let menuConfig = {
            fontFamily: "Courier", 
            fontSize: "36px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - (1.5*textSpacer), "ROCKET PATROL", menuConfig).setOrigin(.5);
        menuConfig.fontSize = "22px";
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        this.add.text(centerX, centerY, "Press SPACE for Time Attack Mode or", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + textSpacer, "Press (1) for One Player or (2) for Two Player", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + (2*textSpacer), "Press (←) for Easy and (→) for Hard", menuConfig).setOrigin(.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        //launches next scene
        //this.scene.start("playScene");

        this.soloPlay = true;
        this.timeAttack = false;

        menuConfig.fontSize = "30px";
        this.playType = this.add.text(centerX, centerY - (3.25*textSpacer), "One Player", menuConfig).setOrigin(.5);
        menuConfig.fontSize = "18px";
        this.playRules = this.add.text(centerX, centerY - (2.75*textSpacer), "(←) & (→) to strafe, (F) to Fire.", menuConfig).setOrigin(.5);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyTWO)) {
            //set to two players
            this.soloPlay = false;
            this.sound.play("sfx_select");
            if(!this.timeAttack) {
                this.playType.text = "Two Player";
                this.playRules.text = "P1: (←) & (→) to strafe, (↑) to Fire.\nP2: (S) & (F) to strafe, (E) to Fire.";
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyONE)) {
            //set to two players
            this.soloPlay = true;
            this.sound.play("sfx_select");
            if(!this.timeAttack) {
                this.playType.text = "One Player";
                this.playRules.text = "(←) & (→) to strafe, (F) to Fire.";
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            //set to two players
            this.timeAttack = !this.timeAttack
            this.sound.play("sfx_select");
            if(this.timeAttack) {
                this.playType.text = "Time Attack";
                this.playRules.text = "(←) & (→) to strafe, (F) to Fire.\nDestroying ships grants more time.";
            } else if(this.soloPlay) {
                this.playType.text = "One Player";
                this.playRules.text = "(←) & (→) to strafe, (F) to Fire.";
            } else {
                this.playType.text = "Two Player";
                this.playRules.text = "P1: (←) & (→) to strafe, (↑) to Fire.\nP2: (S) & (F) to strafe, (E) to Fire.";
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play("sfx_select");
            if(this.timeAttack) {
                this.scene.start("playTime");
            } else if(this.soloPlay){
                this.scene.start("playSingle");
            } else {
                this.scene.start("playDuo");
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play("sfx_select");
            if(this.timeAttack) {
                this.scene.start("playTime");
            } else if(this.soloPlay){
                this.scene.start("playSingle");
            } else {
                this.scene.start("playDuo");
            }
        }
    }
}
