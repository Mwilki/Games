var fire;

demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.load.spritesheet('zordo', 'assets/Sprites/zordo.png', 288,288);
        game.load.spritesheet('fire', 'assets/Sprites/FireSpritesheet.png', 72, 84);
        game.load.image('sky', 'assets/levels/1-3.png');
        game.load.spritesheet('hobgooblin','assets/Sprites/Hobgooblin.png', 165, 165);
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
        
        fire = game.add.sprite(centerX - 250, centerY + 20, 'fire');
        fire.animations.add('walk', [0, 1, 2, 3, 4]);
        fire.scale.setTo(2.5, 2.5);

        zordo = game.add.sprite(1435, 815, 'zordo');
        zordo.animations.add('walk', [0, 1, 2, 3, 4]);
        zordo.animations.add('fight', [5, 6, 7]);
        // anchor x/y of the image to the center, not the top left.
        // set zordo's scale
        zordo.scale.setTo(0.4, 0.4);
        game.physics.enable(zordo);
        zordo.body.collideWorldBounds = true;
        
        var hobgooblin = game.add.sprite(centerX, centerY, 'hobgooblin');
        hobgooblin.animations.add('walk', [0, 1, 2]);
        // initialize the game bounds
        game.world.setBounds(0, 0, 3000, 1000);

        // get the camera to follow zordo
        game.camera.follow(zordo);
        // create deadzone for the camera (600 x 1000)
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
           
    },
    update: function(){
        fire.animations.play('walk', 20, true);
//        if (zordo.x <= 150){
//            game.state.start('state4'); // create state 4, where player
//            // is confronted with 4 gooblins and an ook.
//        }
        
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            // only reduce y if zordos.y >= 335~      [zordo.y in the console]
            if (zordo.y >= 335){
                zordo.y -= speed;   
            }
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            zordo.y += speed;
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        zordo.animations.play('walk', 50, true);
        zordo.animations.currentAnim.speed = 5;
            zordo.scale.setTo(0.4, 0.4);
            zordo.x += speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            zordo.animations.play('walk', 50, true);
            zordo.animations.currentAnim.speed = 5;
            zordo.scale.setTo(-0.4, 0.4);
            zordo.x -= speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            zordo.animations.play('fight', 7, true);
        }
        else{
            zordo.animations.stop('walk');
            zordo.frame = 0;
        }
    }
};