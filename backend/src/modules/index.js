const ApiRouter = require("express").Router();

function AppRoutes(app) {
    app.use("/api", ApiRouter);

    ApiRouter.use("/user", require("./user/user.route"));
    ApiRouter.use("/group", require("./group/group.route"));
    ApiRouter.use("/schedule", require("./schedule/schedule.route"));
}

module.exports = AppRoutes;
