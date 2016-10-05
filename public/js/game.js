var game = (function (ctx) {

    var state = {
        ball: null,
        leftPaddle: null,
        rightPaddle: null,
        activeShapes: []
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
        this.getHitbox();
        this.checkBoardCollision();
        this.checkPaddleCollision(state.leftPaddle);
        this.checkPaddleCollision(state.rightPaddle);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    Ball.prototype.getHitbox = function () {
        this.hitbox = {
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
            bottomRight: {
                x: this.x + global.ball.radius,
                y: this.y + global.ball.radius
            }
        }
    }

    Ball.prototype.checkBoardCollision = function () {
        
        // Check board horizontal edges
        if (this.hitbox.topRight.x >= global.board.width
            || this.hitbox.topLeft.x <= 0) {
            this.velocity.x = -this.velocity.x;
        }

        // Check board vertical edges

        if (this.hitbox.bottomLeft.y >= global.board.height
            || this.hitbox.topLeft.y <= 0) {
            this.velocity.y = -this.velocity.y;
        }
    }

    Ball.prototype.checkPaddleCollision = function (paddle) {

        // Check if the ball is in the x span of the paddle
        var widthCheck = this.hitbox.topRight.x >= paddle.x && this.hitbox.topLeft.x <= paddle.x + global.paddle.width || false;

        // Check if the ball is in the y span of the paddle
        var heightCheck = this.hitbox.bottomLeft.y >= paddle.y && this.hitbox.topRight.y <= paddle.y + global.paddle.height || false;

        // Check horizontal collision
        if (heightCheck) {

            console.log('height');

            // Against right side
            if (this.hitbox.topLeft.x == paddle.x + global.paddle.width
                || this.hitbox.bottomLeft.x == paddle.x + global.paddle.width) {
                this.velocity.x = -this.velocity.x;
            }

            // Against left side
            if (this.hitbox.topRight.x == paddle.x
                || this.hitbox.bottomRight.x == paddle.x) {
                this.velocity.x = -this.velocity.x;
            }
        }

        // Check vertical collision
        if (widthCheck) {

            // Against top side
            if (this.hitbox.bottomLeft.y == paddle.y
                || this.hitbox.bottomRight.y == paddle.y) {
                this.velocity.y = -this.velocity.y;
            }

            // Against bottom side
            if (this.hitbox.topLeft.y == paddle.y + global.paddle.height
                || this.hitbox.topRight.y == paddle.y + global.paddle.height) {
                this.velocity.y = -this.velocity.y;
            }
        }
    }

    function updateCanvas() {
        ctx.clearRect(0, 0, global.board.width, global.board.height);
        state.activeShapes.forEach(function (shape) {
            shape.draw();
        });
    };

    function init() {
        state.ball = new Ball(20, 30);
        state.activeShapes.push(state.ball);

        state.leftPaddle = new Paddle(global.paddle.edgeGap
            , global.board.height / 2 - global.paddle.height / 2);
        state.activeShapes.push(state.leftPaddle);

        state.rightPaddle = new Paddle(global.board.width - global.paddle.edgeGap - global.paddle.width
            , global.board.height / 2 - global.paddle.height / 2);
        state.activeShapes.push(state.rightPaddle);
    }

    return {
        updateCanvas: updateCanvas,
        init: init,
        state: state
    }

})(ctx);