demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = "#b3b3b3";
        console.log('state5');
        addChangeStateEventListeners();
    },
    update: function(){}
};