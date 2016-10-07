var game = (function (ctx) {

    var state = {
        ball: null,
        leftPaddle: null,
        rightPaddle: null,
        activeShapes: [],
        mousePos: null
    }

    function Paddle(x, y) {
        this.x = x;
        this.y = y;
        this.width = global.paddle.width;
        this.height = global.paddle.height;
    }

    Paddle.prototype.draw = function () {
        ctx.fillStyle = global.paddle.color;
        ctx.fillRect(this.x
            , this.y
            , global.paddle.width
            , global.paddle.height);
    }

    Paddle.prototype.move = function () {
        if (state.mousePos.y  < this.y) {
            this.y = this.y - this.speed;
        } else if (state.mousePos.y > this.y + this.height) {
            this.y = this.y + this.speed;
        }
    }

    function Ball(x, y) {
        this.x = x;
        this.y = y;
        this.radius = global.ball.radius;
        this.velocity = {
            x: global.ball.velocity.x,
            y: global.ball.velocity.y
        }
        this.collisionBuffer = 10;
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
        this.checkCollision(state.leftPaddle);
        this.checkCollision(state.rightPaddle);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.collisionBuffer -= 1;
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

    Ball.prototype.getRectHitbox = function () {
        return {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: global.ball.radius * 2,
            height: global.ball.radius * 2
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

    Ball.prototype.checkCollision = function (rect1) {
        if (checkCollision(this.getRectHitbox(), rect1) && this.collisionBuffer <= 0) {
            // Determine position of ball relative to rect1
            if (((this.x  >= rect1.x) && (this.x <= rect1.x + rect1.width)
                && (this.y <= rect1.y || this.y >= rect1.y + rect1.height))) {
                this.velocity.y = -this.velocity.y;
            } else {
                this.velocity.x = -this.velocity.x;
            }
            this.collisionBuffer = global.settings.collisionBuffer;
        }
    }

    function checkCollision(rect1, rect2) {
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            console.log('collision detected');
            return true
        }
        return false
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