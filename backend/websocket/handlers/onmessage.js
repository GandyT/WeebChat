const SManager = require("../socketmanager.js");

const onmessage = async (payload) => {
    const socket = this;
    var data = JSON.parse(payload);
    var op = data.op;

    if (op == 2) {
        // Join Room
        let roomId = data.roomId;
        SManager.connect(socket, roomId);
    } else if (op == 3) {
        // Send Message
        let roomId = data.roomId;
        let content = data.content;
        SManager.sendMessage(socket, roomId, content);
    } else {
        // Error
        socket.send(JSON.stringify({ op: 4, t: "ERROR" }))
    }
}

module.exports = onmessage;