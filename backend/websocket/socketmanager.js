var rooms = {};

module.exports = {
    connect: (socket, roomId) => {
        if (!rooms[roomId]) return;
        rooms[roomId].connections.push(socket);
    },
    purge: async () => {
        for (let [key, value] of Object.entries(rooms)) {
            value = value.connections.filter(s => s.socket.readyState === s.socket.OPEN);
            rooms[key] = value;
        }
    },
    createRoom: (id) => {
        rooms[id] = {
            connections: [],
            chatHistory: []
        }
    },
    sendMessage: (socket, roomId, content) => {
        rooms[roomId].connections.forEach(ws => {
            if (ws.id != socket.id) {
                ws.send(JSON.stringify({ op: 3, t: "MESSAGE", d: content }));
            }
        });
    }
}