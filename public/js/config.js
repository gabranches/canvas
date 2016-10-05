var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');

var global = {
    board: {
        width: 1000,
        height: 600
    },
    paddle: {
        width: 50,
        height: 300,
        color: 'rgb(200,0,0)',
        edgeGap: 100
    },
    ball: {
        radius: 10,
        color: 'rgb(200,0,0)',
        velocity: {
            x: 2,
            y: 2
        }
    },
    settings: {
        fps: 60
    }

};

