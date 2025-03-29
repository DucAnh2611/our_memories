const cors = require("cors");
const bodyParser = require("body-parser");
const { AppConfig } = require("../configs");
const cookieParser = require("cookie-parser");

function AppSetups(app) {
    app.use(
        cors({
            origin: AppConfig.cors.origin,
            methods: AppConfig.cors.methods,
            credentials: AppConfig.cors.credentials,
        })
    );
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    console.log("[APP] AppSetups: App middleware initialized!");
    return app;
}

module.exports = AppSetups;
