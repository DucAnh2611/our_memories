const {
    CookieMiddleware,
    AccessPayloadMiddleware,
} = require("../../middlewares");
const ScheduleController = require("./controller/schedule.controller");

const ScheduleRoute = require("express").Router();

ScheduleRoute.use(CookieMiddleware, AccessPayloadMiddleware);

ScheduleRoute.get("/:groupId/list", ScheduleController.list);
ScheduleRoute.get("/detail/:id", ScheduleController.detail);

ScheduleRoute.post("/:groupId/add", ScheduleController.add);

ScheduleRoute.put("/update/:id", ScheduleController.update);

ScheduleRoute.delete("update/:id", ScheduleController.delete);

module.exports = ScheduleRoute;
