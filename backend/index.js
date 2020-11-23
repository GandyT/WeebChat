/* So we can use process.env to access stuff instead of importing module */
const DotEnv = require("dotenv");
DotEnv.config();

const Express = require("express");
const app = Express();
app.disable("x-powered-by");

const Cors = require("cors");
const BodyParser = require("body-parser");

/* MIDDLEWARE */
app.use(Cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

/* ROUTES */
app.use("/api/createroom", require("./routes/createroom.js"));

app.listen(process.env.PORT || 80, () => {
    console.log(`Listening on port ${process.env.PORT || 80}!`);
});

module.exports = app; // Exporting it for use to create a websocket server.