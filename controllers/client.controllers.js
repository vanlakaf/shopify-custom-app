/**
 * @typedef { import("express").Request } Request
 * @typedef { import("express").Response } Response
 */

const { computeOptions, axiosClient } = require("../utils");

const clientController = {
  home,
};

async function home(
  /** @type { Request } */ req,
  /** @type { Response } */ res
) {
  const products = await axiosClient
    .get("/products.json", {
      headers: {
        "X-Shopify-Access-Token": "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",
      },
    })
    .then((res) => res.data.products);
  res.render("index", computeOptions(req));
}

module.exports = clientController;
