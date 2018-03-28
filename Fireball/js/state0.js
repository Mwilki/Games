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
        game.load.image('sky', 'assets/Haydrool.png');
    },
    create: function(){
        
        // initialize the game physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // locally scoped background variable
        var sky = game.add.sprite(0, 0, 'sky');
        // event listeners are local to the state they're in.
        addChangeStateEventListeners();
        
        // scaling manager
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // initialize zordo into the world.
        zordo = game.add.sprite(centerX, centerY, 'zordo');
        // anchor x/y of the image to the center, not the top left.
        zordo.anchor.setTo(0.5, 0.5);
        // set zordo's scale
        zordo.scale.setTo(0.7, 0.7);
        game.physics.enable(zordo);
        zordo.body.collideWorldBounds = true;
        // initialize the game bounds
        game.world.setBounds(0, 0, 3000, 1000);

        // get the camera to follow zordo
        game.camera.follow(zordo);
        // create deadzone for the camera (600 x 1000)
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            zordo.scale.setTo(0.7, 0.7);
            zordo.x += speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            zordo.scale.setTo(-0.7, 0.7);
            zordo.x -= speed;
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            // only reduce y if zordos.y >= 335~      [zordo.y in the console]
            if (zordo.y >= 335){
                zordo.y -= speed;   
            }
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