/**
 * @typedef { import("express").Request } Request
 * @typedef { import("express").Response } Response
 */

const path = require("path");
const fs = require("fs");
const { customRequire, generateToken } = require("../utils");

const apiController = {
  login,
  verify,
  logout,
  saveProduct,
  destroyProduct,
};

function login(/** @type { Request } */ req, /** @type { Response } */ res) {
  const { username, password } = req.body;

  const users = customRequire("../js-db/users.json");
  const findUser = users.values.filter(
    (user) => user.username === username && user.password === password
  )[0];

  if (!findUser) {
    res.json({
      error: { code: 404, message: "Invalid username or password." },
    });
    return;
  }

  const token = generateToken(24);

  req.session.authorization = token;

  const sessions = customRequire("../js-db/sessions.json");
  sessions.values.push({ userId: findUser.id, token, isValid: true });
  fs.writeFileSync(
    path.join(__dirname, "../js-db/sessions.json"),
    JSON.stringify(sessions)
  );

  res.json({
    result: {
      username,
      avatar: findUser.avatar,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      token,
    },
  });
}

function verify(/** @type { Request } */ req, /** @type { Response } */ res) {
  const authorization = req.headers.authorization;
  const sessions = customRequire("../js-db/sessions.json");
  const sessionIndex = sessions.values.findIndex(
    (s) => s.token === authorization && s.isValid
  );

  if (sessionIndex === -1) {
    res.json({
      error: { code: 500, message: "Session expired." },
    });
    return;
  }

  const users = customRequire("../js-db/users.json");
  const findUser = users.values.filter(
    (user) => user.id === sessions.values[sessionIndex].userId
  )[0];

  req.session.authorization = authorization;

  res.json({
    result: {
      username: findUser.username,
      avatar: findUser.avatar,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      token: authorization,
    },
  });
}

function logout(/** @type { Request } */ req, /** @type { Response } */ res) {
  const sessions = customRequire("../js-db/sessions.json");
  const sessionIndex = sessions.values.findIndex(
    (s) => s.token === req.session.authorization && s.isValid
  );

  if (sessionIndex === -1) {
    res.json({
      error: { code: 404, message: "Something is wrong." },
    });
    return;
  }

  sessions.values[sessionIndex].isValid = false;
  req.session.authorization = null;

  fs.writeFileSync(
    path.join(__dirname, "../js-db/sessions.json"),
    JSON.stringify(sessions)
  );

  res.json({
    result: {
      success: true,
    },
  });
}

function saveProduct(
  /** @type { Request } */ req,
  /** @type { Response } */ res
) {}

function destroyProduct(
  /** @type { Request } */ req,
  /** @type { Response } */ res
) {}

module.exports = apiController;
