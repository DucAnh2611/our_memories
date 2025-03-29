const cron = require("node-cron");
const { AppConfig } = require("../configs");

const resetCronJob = cron.schedule("*/14 * * * *", () => {
    fetch(AppConfig.url + "/ping").then(() => {
        console.log("[RESET_BACKEND_SERVICE]");
    });
});

module.exports = resetCronJob;
