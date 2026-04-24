const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const auth = require('../middleware/auth');

// Allow enhancing text (open endpoint or authenticated depending on needs, sticking to open for easy use for now)
router.post('/enhance', resumeController.enhanceText);
router.post('/parse', resumeController.parseText);

module.exports = router;
