function SocketService() {
    this.users = [];
}

module.exports = new SocketService();

const config = require('../routes/socket/routes');

SocketService.prototype.addListener = function(event, callback) {
    if (this.socket) {
        this.socket.on(event, (data) => {
            callback(data);
        });
    }
};

SocketService.prototype.AddUser = function(socket) {
    this.users.push(socket);
};

SocketService.prototype.SendToAllUsers = function(event, data) {
    this.users.forEach(user => {
        user.emit(event, data);
    });
}

SocketService.prototype.RemoveUser = function(socket) {
    this.users.splice(this.users.indexOf(socket), 1);
};

SocketService.prototype.Emit = function(event, data) {
    if (this.socket){
        this.socket.emit(event, data);
    }
};

SocketService.prototype.EmitTo = function(socket, event, data) {
    socket.emit(event, data);
};

SocketService.prototype.Broadcast = function(event, data) {
    if (this.socket){
        this.socket.broadcast(event, data);
    }
};

SocketService.prototype.BroadcastRoom = function(event, room, data) {
    this.io.sockets.in(room).emit(event, data);
};

SocketService.prototype.SetIO = function(io) {
    this.io = io;
};

SocketService.prototype.SetSocket = function(socket) {
    this.socket = socket;
};

SocketService.prototype.InitListeners = function(socket) {
    for (let method in config) {
        if (config.hasOwnProperty(method)) {
            socket.on(method, (data) => {
                config[method](data, (err, result) => {
                    if (err) {
                        if (!result) {
                            result = {};
                        }
                        result.error = true;
                        result.err = err;
                    }
                    socket.emit(`${method}:success`, JSON.stringify(result));
                });
            });
        }
    }
};
