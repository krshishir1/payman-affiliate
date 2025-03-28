const express = require("express");
const router = express.Router();

const {addCommission, changeCommissionStatus, getCommissionsByAffiliateId} = require("../controllers/commission.controller");
const validateApiKey = require("../middlewares/validateApiKey");

router.post("/new", validateApiKey, addCommission);
router.patch("/", validateApiKey, changeCommissionStatus);
router.get("/", validateApiKey, getCommissionsByAffiliateId);

module.exports = router;
