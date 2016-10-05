game.init();

setInterval(function () {

    
    game.state.ball.move();
    game.updateCanvas();

}, 1000 / global.settings.fps);


$('canvas').mousemove(function(evt) {
    
    var pos = getMousePos(canvas, evt);
    game.state.leftPaddle.y = pos.y;

});

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}