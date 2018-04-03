var centerX = 1500 / 2;
var centerY = 1000 / 2;
var speed = 5;
var zordo;

demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('zordo', 'assets/Sprites/ZordoSpritesheet.png', 126, 162);
        game.load.image('sky', 'assets/levels/1-2.png');
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
        
        zordo = game.add.sprite(centerX, centerY, 'zordo');
        zordo.animations.add('walk', [1, 2]);
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
        zordo.animations.play('walk', 20, true);
        zordo.animations.currentAnim.speed = 5;
            zordo.scale.setTo(0.7, 0.7);
            zordo.x += speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            zordo.animations.play('walk', 20, true);
            zordo.animations.currentAnim.speed = 5;
            zordo.scale.setTo(-0.7, 0.7);
            zordo.x -= speed;
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