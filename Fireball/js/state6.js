demo.state6 = function(){};
demo.state6.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = "#a6a6a6";
        console.log('state6');
        addChangeStateEventListeners();
    },
    update: function(){}
};