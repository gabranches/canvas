module.exports = function(io) {

    io.on('connection', function(socket) {
        console.log('User ' + socket.client.conn.id + ' connected');
    });


}