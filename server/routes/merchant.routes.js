const express = require("express");
const router = express.Router();
const {
  registerNewMerchant,
  getMerchantByEmail,
  getMerchantDetails,
  createAffiliateProgram,
  getAffiliateProgramsOfMerchant,
} = require("../controllers/merchant.controller");
const validateApiKey = require("../middlewares/validateApiKey");

router.post("/new", registerNewMerchant);
router.get("/search", getMerchantByEmail);

router.get("/details", validateApiKey, getMerchantDetails);
router.post("/program/new", validateApiKey, createAffiliateProgram);
router.get("/program/list", validateApiKey, getAffiliateProgramsOfMerchant);

module.exports = router;
