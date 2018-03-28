var demo = {};
// fields that represent middle-point of game world
var centerX = 1500 / 2;
var centerY = 1000 / 2;
var speed = 5;

// initialize player
var zordo;

demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('zordo', 'assets/Sprites/Zordo.png');
    },
    create: function(){
        // event listeners are local to the state they're in.
        addChangeStateEventListeners();
        
        // scaling manager
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // initialize zordo into the world.
        zordo = game.add.sprite(centerX, centerY, 'zordo');
        // anchor x/y of the image to the center, not the top left.
        zordo.anchor.setTo(0.5, 0.5);
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            zordo.x += speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            zordo.x -= speed;
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            zordo.y -= speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            zordo.y += speed;
        }
    }
};


function changeState(i, stateNum){
    console.log(i); // the first parameter is the gobbly gook phaser sends
    game.state.start('state' + stateNum);
}


function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args); // 49
}

// this function just calls addKeyCallback 10 times
function addChangeStateEventListeners(){
        addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
        addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
        addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
        addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
        addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
        addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
        addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
        addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
        addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
        addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}