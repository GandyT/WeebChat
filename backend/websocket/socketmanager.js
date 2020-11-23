var rooms = {};

module.exports = {
    connect: (socket, roomId) => {
        if (!rooms[roomId]) return;
        rooms[roomId].connections.push(socket);
        socket.send(JSON.stringify({ op: 2, t: "CHAT_HISTORY", chatHistory: rooms[roomId].chatHistory }));
        console.log(`socket ${socket.id} has connected to room ${roomId}`)
    },
    purge: async () => {
        for (let [key, value] of Object.entries(rooms)) {
            value = value.connections.filter(socket => socket.readyState === socket.OPEN);
            if (value.length == 0) {
                delete rooms[key]
            } else {
                rooms[key].connections = value;
            }
        }
        console.log("Purging sockets.")
    },
    createRoom: (id) => {
        rooms[id] = {
            connections: [],
            chatHistory: ["*this is the beginning of the conversation*"]
        }
        console.log(`Room ${id} has been made!`);
    },
    sendMessage: (socket, roomId, content) => {
        rooms[roomId].connections.forEach(ws => {
            if (ws.id != socket.id) {
                ws.send(JSON.stringify({ op: 3, t: "MESSAGE", content: content }));
            }
        });
        rooms[roomId].chatHistory.push(content);
        console.log("message sent: " + content);
    }
}