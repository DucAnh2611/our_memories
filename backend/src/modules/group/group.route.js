const {
    CookieMiddleware,
    AccessPayloadMiddleware,
} = require("../../middlewares");
const GroupController = require("./controller/group.controller");

const GroupRoute = require("express").Router();

GroupRoute.use(CookieMiddleware, AccessPayloadMiddleware);

GroupRoute.get("/", GroupController.list);
GroupRoute.get("/:id", GroupController.detail);

GroupRoute.post("/", GroupController.create);

GroupRoute.put("/:id", GroupController.update);

GroupRoute.delete("/:id", GroupController.delete);

module.exports = GroupRoute;
