const { Router } = require("express");
const apiController = require("../controllers/api.controllers");
const authMiddleware = require("../middleware/auth.middleware");

const apiRoutes = Router();

apiRoutes
  .post("/auth/login", apiController.login)
  .get("/auth/verify", apiController.verify)
  .post("/auth/logout", authMiddleware, apiController.logout)
  .post("/shopify/products", authMiddleware, apiController.saveProduct)
  .delete(
    "/shopify/products/:productId",
    authMiddleware,
    apiController.destroyProduct
  );

module.exports = apiRoutes;
