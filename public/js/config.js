var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');

var global = {
    board: {
        width: 1000,
        height: 600
    },
    paddle: {
        width: 20,
        height: 100,
        color: 'rgb(200,0,0)',
        edgeGap: 50,
        speed: 30
    },
    ball: {
        radius: 10,
        color: 'rgb(200,0,0)',
        velocity: {
            x: 10,
            y: 10
        }
    },
    settings: {
        fps: 30,
        collisionBuffer: 5,
        mousePosBuffer: 5
    }

};

