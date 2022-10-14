const axios = require("axios");

function customRequire(/** @type { string } */ mod) {
  delete require.cache[require.resolve(mod)];
  return require(mod);
};

function verifyAuth(/** @type { string } */ authorization) {
  const sessions = customRequire("../js-db/sessions.json");
  const findSession = sessions.values.filter(
    (s) => s.token === authorization && s.isValid
  )[0];
  return !!findSession;
}

function generateToken(/** @type { number } */ length) {
  var result = "";
  const dictionary =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  }
  return result;
};

function computeOptions(/** @type { import("express").Request } */ req) {
  const headers = req.headers;
  const p = req.path;
  const params = req?.params;
  const queries = req?.query;
  const body = req?.body;

  return {
    headers,
    path: p,
    body,
    params,
    query: queries,
  };
};

/** @type { import("axios").AxiosInstance } */
const axiosClient = axios.create({ baseURL: "https://vaneck-store.myshopify.com/admin/api/2022-10" });

exports.customRequire = customRequire;
exports.generateToken = generateToken;
exports.verifyAuth = verifyAuth;
exports.computeOptions = computeOptions;
exports.axiosClient = axiosClient;
