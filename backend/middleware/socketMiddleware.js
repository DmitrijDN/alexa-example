module.exports = function (io) {
    const socketService = require("../services/socketService");
    socketService.SetIO(io);
    io.on('connection', (socket) => {
        socketService.SetSocket(socket);
        socketService.AddUser(socket);
        socketService.InitListeners(socket);

        socket.on('disconnecting', (reason) => {

        });

        socket.on('disconnect', (data) => {
            socketService.RemoveUser(socket);
        });

        socket.on('message', (message) => {

        });
    });
};
