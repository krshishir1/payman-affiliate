const express = require("express");
const router = express.Router();

const {addAffiliate, getAffiliatesByProgramId} = require("../controllers/affiliate.controller");
const validateApiKey = require("../middlewares/validateApiKey");

router.post("/new", validateApiKey, addAffiliate);
router.get("/", validateApiKey, getAffiliatesByProgramId);

module.exports = router;
