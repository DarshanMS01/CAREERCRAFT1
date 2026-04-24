const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const auth = require('../middleware/auth');

// Chat endpoint — accepts optional `provider` field in body
router.post('/chat', auth, agentController.chat);

// Generate company-specific career roadmap
router.post('/roadmap', auth, agentController.roadmap);

// Returns which API providers are currently configured
router.get('/providers', auth, agentController.getProviders);

module.exports = router;
