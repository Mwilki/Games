var game = new Phaser.Game(600, 400, Phaser.AUTO);

// add a state to the game
game.state.add('state', demo.state1);

// load that state
game.state.start('state1');