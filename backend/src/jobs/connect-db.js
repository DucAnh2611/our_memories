const cron = require("node-cron");

const tryReloadConnectDatabaseJob = (initDb) =>
    cron.schedule("* * * * *", () => {
        initDb();
    });

module.exports = tryReloadConnectDatabaseJob;
