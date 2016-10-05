game.init();

setInterval(function () {

    game.state.ball.move();
    game.updateCanvas();

}, 1000 / global.settings.fps);
