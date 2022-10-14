const { verifyAuth } = require("../utils");

/**
 * @param { express.Request } req
 * @param { express.Response } res
 * @param { express.NextFunction } next
 */
function sessionMiddleware(req, res, next) {
  if (!req.session.authorization) {
    res.redirect("/not-auth");
    return;
  }
  if (!verifyAuth(req.session.authorization)) {
    res.redirect("/not-auth");
    return;
  }
  next();
}

module.exports = sessionMiddleware;
