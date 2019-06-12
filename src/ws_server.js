var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8001, function() {
    console.log((new Date()) + ' Server is listening on port 8001');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});


wsServer.on('request', function(request) {

    var connection = request.accept(null, request.origin);
    OnCarConnected(connection);
});


var OnCarConnected = function(connection){
    console.log('-------------------- OnCarConnected --------------------------');
    connection.on("message", function(msg) {
        if (msg.type === 'utf8') {
            var obj = JSON.parse( JSON.stringify(msg.utf8Data));
            console.log('Received message : ' + obj.toString());
        }
    });

    connection.on("close", function() {
        console.log('------------------------  websocket close ---------------------------');
    });
};

