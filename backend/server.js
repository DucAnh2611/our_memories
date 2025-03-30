const express = require("express");
const { AppConfig } = require("./src/configs");
const { AppSetupMiddleware } = require("./src/middlewares");
const { initDB, connFailed } = require("./src/db");
const AppRoutes = require("./src/modules");
const { resetCronJob } = require("./src/jobs");

function run() {
    const app = express();

    AppSetupMiddleware(app);
    AppRoutes(app);

    app.get("/ping", (req, res) => {
        res.json({ status: "ok" });
    });

    app.listen(AppConfig.port, async () => {
        console.log(`Server running on port ${AppConfig.port}`);
    });
}

initDB().then(() => run());
resetCronJob.start();
