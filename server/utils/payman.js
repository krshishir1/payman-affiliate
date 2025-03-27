const Payman = require("paymanai");
require("dotenv").config();

const payman = new Payman({
  xPaymanAPISecret: process.env.PAYMAN_API_KEY,
});

module.exports = payman;


