demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = "#d9d9d9";
        console.log('state2');
        addChangeStateEventListeners();
    },
    update: function(){}
};