var fire, hobgooblin, counter = 0;

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
        
        this.fire = game.add.sprite(centerX - 250, centerY + 20, 'fire');
        this.fire.animations.add('walk', [0, 1, 2, 3, 4]);
        this.fire.scale.setTo(2.5, 2.5);

        zordo = game.add.sprite(1435, 815, 'zordo');
        zordo.animations.add('walk', [0, 1, 2, 3, 4]);
        zordo.animations.add('fight', [5, 6, 7]);
        // anchor x/y of the image to the center, not the top left.
        // set zordo's scale
        zordo.scale.setTo(0.4, 0.4);
        zordo.anchor.setTo(0.5, 0.5);
        game.physics.enable(zordo);
        zordo.body.collideWorldBounds = true;
        
        this.hobgooblin = game.add.sprite(centerX, centerY, 'hobgooblin');
        game.physics.enable(this.hobgooblin);
        this.hobgooblin.animations.add('walk', [0, 1, 2]);
        this.hobgooblin.anchor.setTo(.5, .5);
        this.hobgooblin.body.collideWorldBounds = true;
//        this.hobgooblin.animations.add('walk', [0, 1, 2]);
        // initialize the game bounds
        game.world.setBounds(0, 0, 3000, 1000);

        // get the camera to follow zordo
        game.camera.follow(zordo);
        // create deadzone for the camera (600 x 1000)
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
           
    },
    update: function(){
        
        // while hobgooblin >= 375
        if (this.hobgooblin.y <= zordo.y){
            if (this.hobgooblin.y >= 375){
                this.hobgooblin.y += 1;
            }
        } else {this.hobgooblin.y -= 1;}
        
        if(this.hobgooblin.x >= zordo.x){
            this.hobgooblin.body.velocity.x -= 0.5;
            this.hobgooblin.scale.x = -1;
        } else if (this.hobgooblin.x <= zordo.x) {
            this.hobgooblin.body.velocity.x += 0.5;
            this.hobgooblin.scale.x = 1;
        } else {
            this.hobgooblin.x = 0;
        }
        
        // can create a multi function that passes in multiple monsters as 2nd parameter (basically calling this if statement X times)
        if(Phaser.Rectangle.intersects(zordo.getBounds(), this.hobgooblin.getBounds())){
        
        var attackSpeed = 25;
           // check if monster is left
            // if so, check so see if player is holding down space AND is "facing" left     
            
            if (zordo.scale.x > 0){
                // facing right
                // if enemy within X pixels on right direction
                if ((zordo.x - this.hobgooblin.x) <= 50){
                    counter += 1;
                    console.log(counter);
                    // animation play once
                    if (counter >= attackSpeed){
                        // actually attack
                        zordo.animations.play('fight', 20, false);
                        console.log("swing");
                        counter = 0;
                    }
                }
            }
            else {
                // facing left
                
            }
        if (zordo.x > this.hobgooblin.x){
            zordo.x += 5;
            this.hobgooblin.x -= 5;
        } else {
            zordo.x -= 5;
            this.hobgooblin.x += 5;  

        }
        }
        
        this.hobgooblin.animations.play('walk', 5, true);
        
        this.fire.animations.play('walk', 20, true);
        
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            // only reduce y if zordos.y >= 335~      [zordo.y in the console]
            if (zordo.y >= 375){
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
//            zordo.animations.play('fight', 7, true);
        }
        else{
            zordo.animations.stop('walk');
            zordo.frame = 0;
        }
    },
    fight: function(){
        console.log("TOUCHING U");
    }
};