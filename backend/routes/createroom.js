const Express = require("express");
const router = Express.Router();
const SManager = require("../websocket/socketmanager.js");

router.post("/", async (req, res) => {
    const roomId = req.body.id;
    if (!roomId) return res.send({ success: false, error: "please specify a room id" });
    SManager.createRoom(roomId);
    return res.send({ success: true });
});

module.exports = router;