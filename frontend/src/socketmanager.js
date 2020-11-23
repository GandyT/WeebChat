var socket = undefined;
var currentRoom = undefined;

var utils = {
    addSocket(newSocket) {
        socket = newSocket;
    },
    sendMessage(content) {
        if (!currentRoom) return;
        if (!socket) return;
        socket.send(JSON.stringify({ op: 3, t: "MESSAGE", roomId: currentRoom, content: content }));
    },
    joinRoom(ws) {
        if (!currentRoom) return false;
        ws.send(JSON.stringify({ op: 2, t: "JOIN_ROOM", roomId: currentRoom }));
    },
    setRoomId(roomId) {
        currentRoom = roomId;
    },
    getRoomId() {
        return currentRoom;
    }
}

export default utils;