/**
 * @typedef { import("express").Request } Request
 * @typedef { import("express").Response } Response
 */

const { axiosClient } = require("../utils");

const { ACCESS_KEY } = process.env;

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
        "X-Shopify-Access-Token": ACCESS_KEY,
      },
    })
    .then((res) => res.data.products);
    
  res.render("index", { products });
}

module.exports = clientController;
