const SManager = require("../socketmanager.js");

const onClose = async () => {
    SManager.purge();
}

module.exports = onClose;