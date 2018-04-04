var demo = {};
// fields that represent middle-point of game world
var centerX = 1500 / 2;
var centerY = 1000 / 2;
var speed = 5;
var zordo;
var gooblin;
var hearts = 3;

demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.spritesheet('zordo', 'assets/Sprites/ZordoFightsheet.png', 125, 138);
        game.load.image('sky', 'assets/levels/1-1.png');
        game.load.image('gooblin', 'assets/Sprites/Gooblin.png');
        game.load.image('heart', 'assets/Sprites/Heart.png');
        game.load.image('sword', 'assets/Sprites/Sword.png');
    },
    create: function(){
        // initialize the game physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // locally scoped background variable
        var sky = game.add.sprite(0, 0, 'sky'); // possible parallax?
        
        // event listeners are local to the state they're in.
        addChangeStateEventListeners();
        
        // scaling manager
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        

        

        //zordo
        zordo = game.add.sprite(centerX - 550, centerY, 'zordo');
        zordo.animations.add('walk', [0, 1, 2, 3, 4, 5, 6]);
        // anchor x/y of the image to the center, not the top left.
        zordo.anchor.setTo(0.5, 0.5);
        // set zordo's scale
        zordo.scale.setTo(0.7, 0.7);
        game.physics.enable(zordo);
        zordo.body.collideWorldBounds = true;
        
        hearts = game.add.group();
        
        //zordo's evil hearts
//        for(var i = 0; i < 3; i++){
//            for (var j = 0; j < 3; j++){
//                var temp = game.add.sprite(zordo.x - 150 + (i * 115), zordo.y - 250 + (j * 115), 'heart');
//                temp.scale.setTo(0.4, 0.4);
//                hearts.add(temp);  
//            } 
//        }
        
        
        // initialize the game bounds
        game.world.setBounds(0, 0, 3000, 1000);

        // get the camera to follow zordo
        game.camera.follow(zordo);
        // create deadzone for the camera (600 x 1000)
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
    },
    update: function(){
        
        if (zordo.x >= 1905 && zordo.x <= 2280){
            if (zordo.y <= 395){
                game.state.start('state3');
            }
        }

        if (zordo.x >= 2900){
            game.state.start('state1');
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        zordo.animations.play('walk', 20, true);
        zordo.animations.currentAnim.speed = 5;
            zordo.scale.setTo(0.7, 0.7);
            zordo.x += speed;
            
            if (zordo.x >= 1050){
                hearts.x += speed;   
            }
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            zordo.animations.play('walk', 20, true);
            zordo.animations.currentAnim.speed = 5;
            zordo.scale.setTo(-0.7, 0.7);
            zordo.x -= speed;
            
            if (zordo.x <= 500.75){
                hearts.x -= speed;
            }
        }
        else {
            zordo.animations.stop('walk');
            zordo.frame = 0;
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