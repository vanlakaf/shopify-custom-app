const { Router } = require("express");
const clientController = require("../controllers/client.controllers");

const clientRoutes = Router();

clientRoutes.get("/*", clientController.home);

module.exports = clientRoutes;
