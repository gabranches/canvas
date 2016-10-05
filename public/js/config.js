var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');

var global = {
    board: {
        width: 1000,
        height: 600
    },
    paddle: {
        width: 300,
        height: 100,
        color: 'rgb(200,0,0)',
        edgeGap: 00
    },
    ball: {
        radius: 10,
        color: 'rgb(200,0,0)',
        velocity: {
            x: 3,
            y: 3
        }
    },
    settings: {
        fps: 10
    }

};

