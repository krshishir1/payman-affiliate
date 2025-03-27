const express = require('express');
const router = express.Router();

// Define routes
router.use('/merchants', require('./merchant.routes'));
router.use('/affiliates', require('./affiliate.routes'));
router.use('/commissions', require('./commission.routes'));

module.exports = router; 