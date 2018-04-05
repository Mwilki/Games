var gWidth = 800; //Using Golden Ration is important.
var gHeight = 500; //Using Golden Ration is important.
var window.GAMEAPP = this.game = new Phaser.Game(
gWidth, gHeight,
Phaser.AUTO,
document.body,
window.GAMEAPP.state.boot);

//var config = {
//    type: Phaser.AUTO,
//    width: 800,
//    height: 600,
//    scene: {
//        preload: preload,
//        create: create,
//        update: update
//    }
//};

var game = new Phaser.Game(config);

function preload ()
{
}

function create ()
{
    console.log("hello");
}

function update ()
{
}