var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');

var global = {
    board: {
        width: 1000,
        height: 600
    },
    paddle: {
        width: 300,
        height: 300,
        color: 'rgb(200,0,0)',
        edgeGap: 100
    },
    ball: {
        radius: 10,
        color: 'rgb(200,0,0)',
        velocity: {
            x: 10,
            y: 10
        }
    }

};


var game = (function (ctx) {

    var gameState = {
        ball: null,
        leftPaddle: null,
        rightPaddle: null,
        activeShapes: []
    }

    function createPaddle(x, y) {
        ctx.fillStyle = global.paddle.color;
        ctx.fillRect(x
            , y
            , global.paddle.width
            , global.paddle.height);
    }


    function Paddle(x, y) {
        this.x = x;
        this.y = y;
        this.w = global.paddle.width;
        this.h = global.paddle.height;
    }

    Paddle.prototype.draw = function () {
        ctx.fillStyle = global.paddle.color;
        ctx.fillRect(this.x
            , this.y
            , global.paddle.width
            , global.paddle.height);
    }

    function Ball(x, y) {
        this.x = x;
        this.y = y;
        this.r = global.ball.radius;
        this.velocity = {
            x: global.ball.velocity.x,
            y: global.ball.velocity.y
        }
    }

    Ball.prototype.draw = function () {
        ctx.fillStyle = global.ball.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, global.ball.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = global.ball.color;
        ctx.fill();
    }

    Ball.prototype.move = function () {
        this.checkBoardCollision();
        this.checkPaddleCollision(gameState.leftPaddle);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    Ball.prototype.getHitbox = function () {
        return {
            topLeft: {
                x: this.x - global.ball.radius,
                y: this.y - global.ball.radius
            },
            topRight: {
                x: this.x + global.ball.radius,
                y: this.y - global.ball.radius
            },
            bottomLeft: {
                x: this.x - global.ball.radius,
                y: this.y + global.ball.radius
            },
            bottom: {
                x: this.x + global.ball.radius,
                y: this.y + global.ball.radius
            }
        }
    }

    Ball.prototype.leftEdge = function () {
        return this.x - global.ball.radius;
    }

    Ball.prototype.rightEdge = function () {
        return this.x + global.ball.radius;
    }

    Ball.prototype.topEdge = function () {
        return this.y - global.ball.radius;
    }

    Ball.prototype.bottomEdge = function () {
        return this.y + global.ball.radius;
    }

    Ball.prototype.checkBoardCollision = function () {
        // Check board edges
        if (this.rightEdge() >= global.board.width
            || this.leftEdge() <= 0) {
            this.velocity.x = -this.velocity.x;

        }
        if (this.bottomEdge() >= global.board.height
            || this.topEdge() <= 0) {
            this.velocity.y = -this.velocity.y;
        }
    }

    Ball.prototype.checkPaddleCollision = function (paddle) {

        var hitbox = this.getHitbox();

        // Check if the ball is in the x span of the paddle
        var widthCheck = this.x >= paddle.x && this.x <= paddle.x + global.paddle.width || false;

        // Check if the ball is in the y span of the paddle
        var heightCheck = this.y >= paddle.y && this.y <= paddle.y + global.paddle.height || false;

        // Check top left
        if (this.rightEdge() == paddle.x && heightCheck) {
            this.velocity.x = -this.velocity.x;
        }

        // Right edge collision
        if (this.leftEdge() == paddle.x + global.paddle.width
            && heightCheck) {
            this.velocity.x = -this.velocity.x;
        }

        // Top edge collision
        if (this.bottomEdge() == paddle.y && widthCheck) {
            this.velocity.y = -this.velocity.y;
        }

        // Bottom edge collision
        if (this.topEdge() == paddle.y + global.paddle.height && widthCheck) {
            this.velocity.y = -this.velocity.y;
        }


    }

    function updateCanvas() {

        ctx.clearRect(0, 0, global.board.width, global.board.height);

        gameState.activeShapes.forEach(function (shape) {
            shape.draw();
        });

    };

    function init() {
        gameState.ball = new Ball(20, 30);
        gameState.activeShapes.push(gameState.ball);

        gameState.leftPaddle = new Paddle(global.paddle.edgeGap
            , global.board.height / 2 - global.paddle.height / 2);
        gameState.activeShapes.push(gameState.leftPaddle);
    }

    return {
        updateCanvas: updateCanvas,
        init: init,
        gameState: gameState
    }

})(ctx);


game.init();

setInterval(function () {

    game.gameState.ball.move();
    game.updateCanvas();

}, 30);
