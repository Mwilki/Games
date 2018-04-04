demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        // load .json file exported from Tiled program.
        game.load.tilemap('field', 'assets/tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
        // load grass image
        game.load.image('grassTiles', 'assets/tilemaps/grassTile.png');
        game.load.image('rockTiles', 'assets/tilemaps/rockTile.png');
    },
    create: function(){
//        game.stage.backgroundColor = "#e6e6e6";
        addChangeStateEventListeners(); 
        // add tile map to the game with the key
        var map = game.add.tilemap('field');
        
        // add tileset image(s)
        map.addTilesetImage('grassTiles');
        map.addTilesetImage('rockTiles');  
        
        var grass = map.createLayer('grass');     
        var rocks = map.createLayer('rocks');
    },
    update: function(){}
};