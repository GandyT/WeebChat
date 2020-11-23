const http = require("http");
const WS = require("ws");
const app = require("../index.js");

const wsServer = new WS.Server({ noServer: true, path: "/websocket" });
wsServer.getUniqueID = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wsServer.on("connection", socket => {
    var validatePayload = { op: 1, t: "SUCCESS" }
    socket.send(JSON.stringify(validatePayload));
    socket.id = wsServer.getUniqueId();

    /* SOCKET HANDLERS */
    socket.on("message", require("./handlers/onmessage.js").bind(socket));
    socket.on("close", require("./handlers/onclose.js").bind(socket));
});

const server = http.createServer(app);
server.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit("connection", socket, request);
    });
});

server.listen(process.env.WSPORT || 8080);