
var fairy, wands, velocity = 500, counter = 0;

demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('zordo', 'assets/Sprites/ZordoFightsheet.png', 125, 138);
        
        game.load.spritesheet('fairy', 'assets/Sprites/FairySpritesheet.png', 96, 96);
        
        game.load.image('wand', 'assets/Sprites/Weapons/Wand.png');
        
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
        
        zordo = game.add.sprite(centerX - 550, centerY, 'zordo');
        zordo.animations.add('walk', [0, 1, 2, 3, 4, 5, 6]);
        // anchor x/y of the image to the center, not the top left.
        zordo.anchor.setTo(0.5, 0.5);
        // set zordo's scale
        zordo.scale.setTo(0.7, 0.7);
        game.physics.enable(zordo);
        zordo.body.collideWorldBounds = true;
        
        
        fairy = game.add.sprite(centerX + 3500, centerY - 300, 'fairy');
        fairy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
        fairy.animations.play('walk', 20, true);
        
        // initialize the game bounds
        game.world.setBounds(0, 0, 3000, 1000);

        // get the camera to follow zordo
        game.camera.follow(zordo);
        // create deadzone for the camera (600 x 1000)
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
        
        // add group of bullets
        wands = game.add.group();
        wands.enableBody = true;
        wands.physicsBodyType = Phaser.Physics.ARCADE;
        wands.createMultiple(50, 'wand');
        wands.setAll('checkWorldBounds', true);
        wands.setAll('outOfBoundsKill', true);
        
        
    },
    update: function(){
        
        if (zordo.x <= 150){
            game.state.start('state4'); // create state 4, where player
            // is confronted with 4 gooblins and an ook.
        }
        
        if (fairy.x > 0){
            fairy.x -= speed + 1.5;
            this.fire();
        }
        if (fairy.x == 0){
            while(fairy.x <= 2500){
                fairy.x += speed;
            }
        }
        
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
    },
    fire: function(){
        counter++;
        if (counter >= 10){
        console.log('firing');
        var wand = wands.getFirstDead();
        wand.reset(fairy.x, fairy.y);
        wand.scale.setTo(-0.7, -0.7);
        wand.body.velocity.y = 500;
        counter = 0;
        }
    }
};