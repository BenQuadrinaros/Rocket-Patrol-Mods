// Benjamin Rowland
// Simultaneous 2-Player Mode:   50
// New timing/scoring mechanic:  25
// Display time remaining:       15
// 30 secind speed increase:     10
// _________________________________
//  Total:                      100

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, PlaySingle, PlayDuo, PlayTime],
};

let game = new Phaser.Game(config);

game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
};

//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT, keyONE, keyTWO, keySPACE, keyUP, keyS, keyE;