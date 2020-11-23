const DotEnv = require("dotenv");
DotEnv.config();

const Express = require("express");
const app = Express();

app.listen(process.env.PORT || 80, () => {
    console.log(`Listening on port ${process.env.PORT || 80}!`);
});

module.exports = app;