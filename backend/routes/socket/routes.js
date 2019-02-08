module.exports = (function () {
    const socketService = require('../../services/socketService');

    return {
        'send_message': (data, callback) => {
            console.log('send_message data');
        },
        'receive_message': (data, callback) => {
            console.log('receive_message data');
        }
    };
})();
