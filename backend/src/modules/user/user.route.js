const UserRoute = require("express").Router();
const { AdminKeyMiddleware, CookieMiddleware } = require("../../middlewares");
const UserController = require("./controller/user-controller");

UserRoute.get("/find", CookieMiddleware, UserController.find);
UserRoute.get("/detail/:id", CookieMiddleware, UserController.detail);

UserRoute.put("/update/:id", CookieMiddleware, UserController.update);
UserRoute.delete("/delete", CookieMiddleware, UserController.delete);

UserRoute.post("/logout", CookieMiddleware, UserController.logout);
UserRoute.post("/login", UserController.login);
UserRoute.post("/create", AdminKeyMiddleware, UserController.create);

module.exports = UserRoute;
