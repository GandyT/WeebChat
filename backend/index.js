/* So we can use process.env to access stuff instead of importing module */
const DotEnv = require("dotenv");
DotEnv.config();

const Express = require("express");
const app = Express();
app.disable("x-powered-by");

const Cors = require("cors");
const BodyParser = require("body-parser");
const Path = require("path");
const WS = require("ws");


/* MIDDLEWARE */
app.use(Cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(Express.static(Path.join(__dirname, '../Frontend/build')));

/* ROUTES */
app.use("/api/createroom", require("./routes/createroom.js"));

/* CATCH-ALL FRONTEND */
app.get('/*', (req, res) => {
    res.sendFile(Path.join(__dirname + '/../frontend/build/index.html'));
});

app.listen(process.env.PORT || 80, () => {
    console.log(`Listening on port ${process.env.PORT || 80}!`);
});

/* 
=========================================================================================
    WEBSOCKET SERVER STUFF. IM KIND OF DUMB AND PUT THIS IN A DIFFERENT FILE
=========================================================================================
*/

const wsServer = new WS.Server({ port: process.env.WSPORT || 8080, path: "/websocket" });
wsServer.getUniqueID = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wsServer.on("connection", socket => {
    var validatePayload = { op: 1, t: "SUCCESS" }
    socket.send(JSON.stringify(validatePayload));
    socket.id = wsServer.getUniqueID();

    /* SOCKET HANDLERS */
    socket.on("message", require("./websocket/handlers/onmessage.js").bind(socket));
    socket.on("close", require("./websocket/handlers/onclose.js").bind(socket));
});



