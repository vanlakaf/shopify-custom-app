const { verifyAuth } = require("../utils");

/**
 * @param { express.Request } req
 * @param { express.Response } res
 * @param { express.NextFunction } next
 */
function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    res.redirect("/not-auth");
    return;
  }
  if (!verifyAuth(req.headers.authorization)) {
    res.redirect("/not-auth");
    return;
  }
  next();
}

module.exports = authMiddleware;
