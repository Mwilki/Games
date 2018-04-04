//var centerX = 1500 / 2;
//var centerY = 1000 / 2;
//var speed = 5;
//var zordo;
var rocks, grass;

// cursors for player input.  velocity for speed.
var cursors, vel = 500;
demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.spritesheet('zordo', 'assets/Sprites/ZordoSpritesheet.png', 126, 162);
        game.load.tilemap('field', 'assets/tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass', 'assets/tilemaps/grass.png');
        game.load.image('rocks', 'assets/tilemaps/rocks.png');
    },
    create: function(){
        // redundant but important for different states?
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        addChangeStateEventListeners();
        
        // add json map
        var map = game.add.tilemap('field');
        map.addTilesetImage('grass');
        map.addTilesetImage('rocks');
        
        
    
        // add the layers to tile map
        grass = map.createLayer('grass');
        rocks = map.createLayer('rocks');
        
        // add collision
        map.setCollisionBetween(1, 11, true, 'rocks')
        map.setCollisionBetween(1, true, 'grass')
        
        // add zordo to state 2
        zordo = game.add.sprite(200, 200, 'zordo');
        zordo.scale.setTo(0.2, 0.2);
        game.physics.enable(zordo);
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function(){
        
        // add collision
        game.physics.arcade.collide(zordo, grass, function(){
            zordo.x = centerX - 500;
            zordo.y = centerY - 300;
        });

        game.physics.arcade.collide(zordo, rocks, function(){
            console.log('hejjo');
        }); // third argument is an anonymous callback function
        
        
        if(cursors.up.isDown){
            zordo.body.velocity.y = -vel;
        } 
        else if(cursors.down.isDown)
        {
            zordo.body.velocity.y = vel;  
        }
        else {
            zordo.body.velocity.y = 0; 
        }
        if(cursors.left.isDown){
            zordo.body.velocity.x = -vel;
        } else if(cursors.right.isDown)
        {
            zordo.body.velocity.x = vel;       
        }
        else {
            zordo.body.velocity.x = 0; 
        }
    }
}